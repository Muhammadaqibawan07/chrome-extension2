/* ATLAS NEW TAB — the built-in live wallpapers
   The videos aren't packed into the extension (they made it 400+ MB): the
   backend lists them (GET /wallpapers/builtin) and they stream from where
   it hosts them, kept on disk by app.js like any online video. The list
   fills WALLPAPERS (config.js) in place, so every file that reads it sees
   the same array. The last list is kept in chrome.storage.local, so a new
   tab starts on it at once; the server's is fetched behind it, and on(fn)
   hears when it changes. */

(() => {
  "use strict";
  if (typeof WALLPAPERS === "undefined") return;

  const API = String((typeof ACCOUNT_CONFIG !== "undefined" && ACCOUNT_CONFIG.api) || "").replace(/\/+$/, "");
  const KEY = "wp:builtin";
  const hasChrome = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
  const https = (u) => typeof u === "string" && /^https:\/\//.test(u);
  const listeners = [];

  const clean = (list) => (Array.isArray(list) ? list : [])
    .filter((w) => w && typeof w.id === "string" && w.id && https(w.file))
    .slice(0, 100)
    .map((w) => ({ id: w.id.slice(0, 40), label: String(w.label || w.id).slice(0, 60), file: w.file }));

  /* puts `list` in WALLPAPERS; an empty one (offline, server down) keeps
     what's there */
  function use(list) {
    if (!list.length || JSON.stringify(list) === JSON.stringify(WALLPAPERS)) return;
    WALLPAPERS.splice(0, WALLPAPERS.length, ...list);
    listeners.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
  }

  async function fetchList() {
    if (!API) return [];
    try {
      const r = await fetch(API + "/wallpapers/builtin", { signal: AbortSignal.timeout(10000) });
      if (!r.ok) return [];
      const list = clean((await r.json()).items);
      if (list.length && hasChrome) chrome.storage.local.set({ [KEY]: list });
      return list;
    } catch {
      return [];
    }
  }

  const ready = (hasChrome ? new Promise((r) => chrome.storage.local.get([KEY], (o) => r(clean(o[KEY])))) : Promise.resolve([]))
    .then(use);
  ready.then(fetchList).then(use);

  window.AtlasBuiltIns = {
    ready,
    on: (fn) => listeners.push(fn),
  };
})();
