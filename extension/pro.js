/* ATLAS NEW TAB — Atlas Pro on the page
   What a free account may use, and what it sees when it reaches a limit:
     - need(text): false for Pro; otherwise opens the upgrade box and
       answers true (the caller stops there);
     - wallpaper(key): online wallpapers — PRO_CONFIG.freeWallpapers of
       them for free (stills and live together, kept in "wp:used"; one
       already used can always be set again);
     - FREE_THEMES / FREE_CURSORS: the theme presets and cursor packs a
       free account can choose; the rest are Pro.
   Every new account gets Pro free for its first days (TRIAL_DAYS on the
   server). When the server says the account isn't Pro (AtlasAccount.verify),
   any Pro look still on is put back (AtlasSettings.dropPro), and the first
   time a trial is seen to have ended the upgrade box says so.
   Also the welcome card, once each time the browser opens.              */

(() => {
  "use strict";
  const A = window.AtlasAccount;
  const AS = window.AtlasSettings;
  const CFG = typeof PRO_CONFIG !== "undefined" ? PRO_CONFIG : {};
  const FREE_WALLPAPERS = Number.isFinite(CFG.freeWallpapers) ? CFG.freeWallpapers : 5;
  const FREE_THEMES = ["sand"];
  const FREE_CURSORS = ["default"];

  const hasChrome = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
  const get = (k) => new Promise((r) => (hasChrome ? chrome.storage.local.get([k], (o) => r(o[k])) : r(null)));
  const put = (obj) => new Promise((r) => (hasChrome ? chrome.storage.local.set(obj, r) : r()));
  /* cleared when Chrome closes */
  const session = hasChrome && chrome.storage.session;

  const isPro = () => !!(A && A.isPro());
  const signedIn = () => !!(A && A.signedIn());
  const trialDays = () => (A && A.trialDays) || 7;

  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v == null || v === false) return;
      if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    kids.flat().forEach((c) => c != null && el.append(c));
    return el;
  }

  /* a button that shows it is working; an error lands in `msg` */
  function busy(btn, text, msg, work) {
    const was = btn.textContent;
    btn.disabled = true;
    btn.textContent = text;
    msg.hidden = true;
    return Promise.resolve().then(work).catch((err) => {
      msg.textContent = (err && err.message) || String(err);
      msg.hidden = false;
    }).finally(() => { btn.disabled = false; btn.textContent = was; });
  }

  /* the buttons that lead to Pro: upgrade when signed in, otherwise sign
     in (which starts the free trial on a new account) */
  function upgradeButtons(msg, after) {
    if (!A || A.allFree) return [];
    if (!signedIn()) {
      return [h("button", {
        type: "button", class: "pro-btn is-primary", text: "Sign in — " + trialDays() + " days free",
        onclick: () => { after(); if (AS) AS.open("account"); },
      })];
    }
    const m = h("button", { type: "button", class: "pro-btn is-primary", text: "Upgrade — $5/month",
      onclick: () => busy(m, "Opening…", msg, () => A.upgrade("month")) });
    const y = h("button", { type: "button", class: "pro-btn", text: "Yearly",
      onclick: () => busy(y, "Opening…", msg, () => A.upgrade("year")) });
    return [m, y];
  }

  /* ---------- the upgrade box ---------- */
  const PERKS = [
    "Every theme and cursor pack, and your own cursors",
    "Unlimited online and live 4K wallpapers",
    "The private space",
    "Backup — export, import and save to your account",
    "Automatic sync, AI day planner, calendar and 30-day stats",
  ];
  let box = null;
  function closeBox() {
    if (!box) return;
    box.remove();
    box = null;
    document.removeEventListener("keydown", onKey, true);
  }
  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeBox(); }
  }
  function openBox(title, text) {
    closeBox();
    const msg = h("p", { class: "pro-err", role: "alert", hidden: true });
    const t = A && A.trial();
    const sub = t && t.active
      ? "Your free trial has " + t.daysLeft + (t.daysLeft === 1 ? " day" : " days") + " left."
      : !signedIn() ? "New accounts get " + trialDays() + " days of Pro free." : "";
    box = h("div", { class: "pro-modal" },
      h("div", { class: "pro-backdrop", onclick: closeBox }),
      h("div", { class: "pro-panel", role: "dialog", "aria-modal": "true", "aria-labelledby": "proTitle" },
        h("div", { class: "pro-head" },
          h("span", { class: "pro-tag", text: "PRO" }),
          h("h2", { class: "pro-title", id: "proTitle", text: title }),
          h("button", { type: "button", class: "pro-x", "aria-label": "Close", text: "✕", onclick: closeBox })),
        text ? h("p", { class: "pro-text", text }) : null,
        h("ul", { class: "pro-perks" }, PERKS.map((p) => h("li", { text: p }))),
        sub ? h("p", { class: "pro-sub", text: sub }) : null,
        h("div", { class: "pro-btns" }, upgradeButtons(msg, closeBox),
          h("button", { type: "button", class: "pro-btn is-quiet", text: "Not now", onclick: closeBox })),
        msg));
    document.body.append(box);
    document.addEventListener("keydown", onKey, true);
    const first = box.querySelector(".pro-btn");
    if (first) first.focus();
  }

  function need(text) {
    if (isPro()) return false;
    openBox("Atlas Pro", text);
    return true;
  }

  /* ---------- online wallpapers: a few for free ---------- */
  const USED_KEY = "wp:used";
  let used = [];
  const usedReady = get(USED_KEY).then((v) => { if (Array.isArray(v)) used = v.filter((k) => typeof k === "string").slice(0, 200); });
  if (hasChrome) chrome.storage.onChanged.addListener((ch, area) => {
    if (area === "local" && ch[USED_KEY] && Array.isArray(ch[USED_KEY].newValue)) used = ch[USED_KEY].newValue;
  });
  const wallpapersLeft = () => Math.max(0, FREE_WALLPAPERS - used.length);
  const canUse = (key) => isPro() || used.includes(key) || used.length < FREE_WALLPAPERS;
  /* true = go ahead (and count it); false = the upgrade box is open */
  function wallpaper(key) {
    if (isPro() || used.includes(key)) return true;
    if (used.length >= FREE_WALLPAPERS) {
      openBox("Atlas Pro", "You've used your " + FREE_WALLPAPERS + " free online wallpapers. Atlas Pro sets as many 4K and live wallpapers as you like.");
      return false;
    }
    used = used.concat(key);
    put({ [USED_KEY]: used });
    return true;
  }

  /* ---------- after the server has answered ---------- */
  /* only when this computer already thinks the account isn't Pro (a paid
     plan or a trial ends on the date it knows), and on a new tab at most
     every few minutes; a sign-in or plan change checks straight away */
  const TRIAL_SEEN = "pro:trialEndedSeen";
  const CHECKED_KEY = "pro:checkedAt";
  async function check(force) {
    if (!A || isPro()) return;
    if (!force && session) {
      const o = await session.get([CHECKED_KEY]).catch(() => ({}));
      if (Date.now() - (o[CHECKED_KEY] || 0) < 10 * 60_000) return;
    }
    if (session) session.set({ [CHECKED_KEY]: Date.now() }).catch(() => {});
    const pro = await A.verify();
    if (pro !== false) return; // Pro, or offline: change nothing
    if (AS && AS.dropPro) AS.dropPro();
    /* the trial has just run out: say so once per account */
    const t = A.trial();
    const u = A.user();
    if (t && !t.active && u && (await get(TRIAL_SEEN)) !== u.id) {
      await put({ [TRIAL_SEEN]: u.id });
      if (!document.querySelector(".pro-welcome.is-ended")) {
        openBox("Your free trial has ended", "Thanks for trying Atlas Pro. Subscribe to keep every theme, cursor and wallpaper, the private space and backup.");
      }
    }
  }

  /* ---------- welcome, once each time the browser opens ----------
     chrome.storage.session is cleared when Chrome closes, so the first new
     tab of every browser session shows it. */
  const WELCOME_KEY = "atlas:welcomed";
  async function firstTabOfSession() {
    try {
      if (session) {
        const o = await session.get([WELCOME_KEY]);
        if (o[WELCOME_KEY]) return false;
        await session.set({ [WELCOME_KEY]: Date.now() });
        return true;
      }
      if (sessionStorage.getItem(WELCOME_KEY)) return false;
      sessionStorage.setItem(WELCOME_KEY, "1");
      return true;
    } catch { return false; }
  }

  function greeting() {
    const hr = new Date().getHours();
    return hr < 5 ? "Good night" : hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : hr < 22 ? "Good evening" : "Good night";
  }

  function welcome() {
    const u = A && A.user();
    const first = u && u.name ? String(u.name).trim().split(/\s+/)[0] : "";
    const t = A && A.trial();
    const ended = !!(t && !t.active && !isPro());
    const msg = h("p", { class: "pro-err", role: "alert", hidden: true });
    let line = "";
    let buttons = [];
    let card = null;
    const close = () => {
      if (!card) return;
      card.classList.add("is-leaving");
      const c = card;
      card = null;
      setTimeout(() => c.remove(), 260);
    };
    if (A && !A.allFree) {
      if (!signedIn()) {
        line = "Sign in with Google to start your " + trialDays() + "-day free trial of Atlas Pro.";
        buttons = upgradeButtons(msg, close);
      } else if (t && t.active) {
        line = "Your Atlas Pro trial: " + t.daysLeft + (t.daysLeft === 1 ? " day" : " days") + " left.";
        buttons = upgradeButtons(msg, close);
      } else if (ended) {
        line = "Your free trial has ended. Subscribe to keep every theme, cursor and wallpaper, the private space and backup.";
        buttons = upgradeButtons(msg, close);
      } else if (isPro()) {
        line = "Atlas Pro — thank you for your support.";
      }
    }
    const date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    card = h("div", { class: "pro-welcome" + (ended ? " is-ended" : ""), role: "status" },
      h("button", { type: "button", class: "pro-x", "aria-label": "Close", text: "✕", onclick: close }),
      h("p", { class: "pro-welcome-date", text: date }),
      h("h2", { class: "pro-welcome-title", text: greeting() + (first ? ", " + first : "") + "! Welcome back to Atlas." }),
      line ? h("p", { class: "pro-text", text: line }) : null,
      buttons.length ? h("div", { class: "pro-btns" }, buttons) : null,
      msg);
    document.body.append(card);
    /* a plain hello goes on its own; one that asks for something stays
       until it's closed or the pointer leaves it */
    let timer = 0;
    const later = () => { clearTimeout(timer); timer = setTimeout(close, 9000); };
    if (!ended) later();
    card.addEventListener("mouseenter", () => clearTimeout(timer));
    card.addEventListener("mouseleave", () => { if (!ended) later(); });
  }

  const accountReady = A ? Promise.resolve(A.ready).catch(() => {}) : Promise.resolve();
  accountReady.then(async () => {
    if (await firstTabOfSession()) welcome();
    check().catch(() => {});
  });
  /* signed in or out, or the plan changed in another tab */
  let was = null;
  if (A) A.on(() => {
    const now = signedIn() + ":" + isPro();
    if (was !== null && now !== was) check(true).catch(() => {});
    was = now;
  });
  accountReady.then(() => { was = signedIn() + ":" + isPro(); });

  window.AtlasPro = {
    isPro,
    need,
    open: openBox,
    wallpaper,
    canUse,
    wallpapersLeft,
    freeWallpapers: FREE_WALLPAPERS,
    usedReady,
    freeTheme: (id) => FREE_THEMES.includes(id),
    freeCursor: (style) => FREE_CURSORS.includes(style),
    FREE_THEMES,
    FREE_CURSORS,
  };
})();
