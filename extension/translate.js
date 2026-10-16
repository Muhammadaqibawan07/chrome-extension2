/* ATLAS NEW TAB — new tab translator
   Puts the new tab page itself into the language picked in Customize >
   Language. Loaded by index.html only; Atlas never translates other
   websites. It swaps the text of the page in place, keeps the original
   next to each piece so it can be put back, and follows content that
   arrives later (panels, the assistant).

   Settings come from the same "appearance" record as the rest of
   Customize. The words themselves are translated by background.js
   ("translate:batch").                                                    */

(() => {
  "use strict";
  if (window.__atlasTranslate || typeof chrome === "undefined" || !chrome.runtime || !chrome.runtime.id) return;
  window.__atlasTranslate = true;

  if (location.protocol !== "chrome-extension:") return;

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE", "KBD", "SAMP", "VAR", "SVG", "MATH", "CANVAS", "IFRAME", "TEMPLATE", "HEAD"]);
  const SKIP_SEL = '[translate="no"], .notranslate, [contenteditable=""], [contenteditable="true"], #atlas-tr-host';
  const ATTRS = ["placeholder", "title", "aria-label", "alt"];
  const HAS_LETTER = /\p{L}/u;
  const BATCH_ITEMS = 100;
  const BATCH_CHARS = 5000;
  const PARALLEL = 4;

  let target = "";       // language the page is in now ("" = original)
  let wanted = "";       // language the settings ask for

  const textInfo = new WeakMap(); // Text -> { orig, out }
  const attrInfo = new WeakMap(); // Element -> { attr: { orig, out } }
  const queue = new Set();        // Text nodes and Elements waiting
  let flushTimer = 0;

  /* ---------- what gets translated ---------- */
  function skipped(el) {
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      if (e.tagName === "TITLE") return false; // the tab title, inside <head>
      if (SKIP_TAGS.has(e.tagName)) return true;
    }
    return !!(el && el.closest && el.closest(SKIP_SEL));
  }
  const worth = (s) => s && s.trim().length > 0 && HAS_LETTER.test(s);

  /* the source text of a node: its original if we changed it before */
  function sourceOf(node) {
    const info = textInfo.get(node);
    if (info && node.data === info.out) return info.orig;
    if (info) textInfo.delete(node); // the page rewrote it: a new original
    return node.data;
  }

  function collect(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      if (!skipped(root.parentElement) && worth(root.data)) queue.add(root);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1 && skipped(root)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(n) {
        if (n.nodeType === 1) {
          if (SKIP_TAGS.has(n.tagName) || n.matches(SKIP_SEL)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
        return worth(n.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    const visit = (n) => {
      if (n.nodeType === 3) queue.add(n);
      else if (ATTRS.some((a) => n.hasAttribute(a))) queue.add(n);
    };
    if (root.nodeType === 1) visit(root);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) visit(n);
  }

  /* ---------- turning queued nodes into requests ---------- */
  /* each job: one string to translate + how to write the answer back */
  function jobs() {
    const out = [];
    queue.forEach((n) => {
      if (!n.isConnected) return;
      if (n.nodeType === 3) {
        const src = sourceOf(n);
        const m = src.match(/^(\s*)([\s\S]*?)(\s*)$/);
        if (!worth(m[2])) return;
        out.push({ text: m[2], put: (t) => write(n, src, m[1] + t + m[3]) });
        return;
      }
      const map = attrInfo.get(n) || {};
      ATTRS.filter((a) => n.hasAttribute(a)).forEach((a) => {
        const cur = n.getAttribute(a);
        const prev = map[a];
        const src = prev && cur === prev.out ? prev.orig : cur;
        if (!worth(src)) return;
        out.push({
          text: src.trim(),
          put: (t) => {
            map[a] = { orig: src, out: t };
            attrInfo.set(n, map);
            n.setAttribute(a, t);
          },
        });
      });
    });
    queue.clear();
    return out;
  }

  function write(node, orig, out) {
    if (!node.isConnected) return;
    /* the page may have changed it while the request was out */
    const info = textInfo.get(node);
    const now = info && node.data === info.out ? info.orig : node.data;
    if (now !== orig) return;
    textInfo.set(node, { orig, out });
    if (node.data !== out) node.data = out;
  }

  function send(texts, to) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ type: "translate:batch", texts, to }, (res) => {
          if (chrome.runtime.lastError || !res || !res.ok) resolve(null);
          else resolve(res.out);
        });
      } catch { resolve(null); } // the extension was reloaded under the page
    });
  }

  async function flush() {
    flushTimer = 0;
    const to = target;
    if (!to) { queue.clear(); return; }
    const list = jobs();
    if (!list.length) return;
    /* the same label repeated all over a page is asked once */
    const byText = new Map();
    list.forEach((j) => {
      if (!byText.has(j.text)) byText.set(j.text, []);
      byText.get(j.text).push(j);
    });
    const texts = [...byText.keys()];
    const batches = [];
    let cur = [], chars = 0;
    texts.forEach((t) => {
      if (cur.length && (cur.length >= BATCH_ITEMS || chars + t.length > BATCH_CHARS)) {
        batches.push(cur);
        cur = []; chars = 0;
      }
      cur.push(t);
      chars += t.length;
    });
    if (cur.length) batches.push(cur);

    let i = 0;
    const worker = async () => {
      while (i < batches.length && target === to) {
        const b = batches[i++];
        const out = await send(b, to);
        if (target !== to) return;
        if (!out) return;
        /* our own writes aren't news; the page's, still waiting, are */
        handle(observer.takeRecords());
        observer.disconnect();
        b.forEach((t, k) => byText.get(t).forEach((j) => j.put(out[k] || t)));
        observe();
      }
    };
    await Promise.all(Array.from({ length: Math.min(PARALLEL, batches.length) }, worker));
  }

  const schedule = (ms) => { if (!flushTimer) flushTimer = setTimeout(flush, ms); };

  /* ---------- following the page ---------- */
  function handle(records) {
    if (!target) return;
    records.forEach((r) => {
      if (r.type === "characterData") {
        const info = textInfo.get(r.target);
        if (info && r.target.data === info.out) return;
        collect(r.target);
      } else r.addedNodes.forEach(collect);
    });
    if (queue.size) schedule(350);
  }
  const observer = new MutationObserver(handle);
  function observe() {
    const root = document.documentElement;
    if (root) observer.observe(root, { childList: true, characterData: true, subtree: true });
  }

  /* ---------- switching language ---------- */
  function restore() {
    observer.disconnect();
    queue.clear();
    clearTimeout(flushTimer);
    flushTimer = 0;
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let n = walker.currentNode; n; n = walker.nextNode()) {
      if (n.nodeType === 3) {
        const info = textInfo.get(n);
        if (info && n.data === info.out) n.data = info.orig;
        textInfo.delete(n);
      } else {
        const map = attrInfo.get(n);
        if (!map) continue;
        Object.entries(map).forEach(([a, v]) => {
          if (n.getAttribute(a) === v.out) n.setAttribute(a, v.orig);
        });
        attrInfo.delete(n);
      }
    }
  }

  function apply() {
    const to = wanted;
    if (to === target) return;
    if (target) restore();
    target = to;
    if (target) {
      collect(document.body);
      const t = document.querySelector("title");
      if (t && t.firstChild) queue.add(t.firstChild);
      observe();
      schedule(0);
    }
  }

  function readSettings(raw) {
    let s = null;
    try { s = JSON.parse(raw || "null"); } catch {}
    const lang = (s && s.settings && s.settings.language) || {};
    wanted = typeof lang.lang === "string" ? lang.lang : "";
  }

  /* ---------- boot + live settings ---------- */
  let rawSettings = null;
  const refresh = () => { readSettings(rawSettings); apply(); };
  chrome.storage.local.get(["appearance"], (o) => {
    rawSettings = o.appearance;
    if (document.body) refresh();
    else document.addEventListener("DOMContentLoaded", refresh, { once: true });
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes.appearance) return;
    rawSettings = changes.appearance.newValue;
    if (document.body) refresh();
  });
})();
