/* ATLAS NEW TAB — app logic
   All user-editable content lives in config.js                */

(() => {
  "use strict";

  /* ---------- storage (chrome.storage.local with localStorage fallback) --- */
  const hasChrome = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;
  const store = {
    get(keys) {
      if (hasChrome) return new Promise((r) => chrome.storage.local.get(keys, r));
      const out = {};
      keys.forEach((k) => {
        const v = localStorage.getItem("atlas:" + k);
        if (v !== null) out[k] = v;
      });
      return Promise.resolve(out);
    },
    set(obj) {
      if (hasChrome) return new Promise((r) => chrome.storage.local.set(obj, r));
      Object.entries(obj).forEach(([k, v]) => localStorage.setItem("atlas:" + k, v));
      return Promise.resolve();
    },
  };

  const $ = (id) => document.getElementById(id);

  /* ================= CLOCK (12-hour) ===================================== */
  const timeEl = $("time");
  const meridiemEl = $("meridiem");
  const dateEl = $("date");
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  function renderClock(animate = false) {
    const d = new Date();
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const next = `${h}:${m}`;
    if (animate && timeEl.textContent !== next) {
      timeEl.classList.remove("is-tick");
      void timeEl.offsetWidth; // restart the animation
      timeEl.classList.add("is-tick");
    }
    timeEl.textContent = next;
    meridiemEl.textContent = ap;
    dateEl.textContent = `${DAYS[d.getDay()]} · ${d.getDate()} ${MONTHS[d.getMonth()]}`;
  }
  renderClock();
  // tick exactly on the next minute, then every minute
  setTimeout(function tick() {
    renderClock(true);
    setInterval(() => renderClock(true), 60000);
  }, (60 - new Date().getSeconds()) * 1000);

  /* the docks sit below the clock block; its height depends on the clamped
     font sizes, so measure the real thing instead of guessing an offset */
  const clockEl = document.querySelector(".clock");
  function syncClockHeight() {
    if (!clockEl) return;
    const h = Math.ceil(clockEl.getBoundingClientRect().height);
    if (h) document.documentElement.style.setProperty("--clock-h", h + "px");
  }
  syncClockHeight();
  addEventListener("resize", syncClockHeight);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncClockHeight);

  /* ================= WALLPAPER =========================================== */
  const layers = [$("videoA"), $("videoB")];
  let front = 0;
  let currentWp = null;

  function playSafe(v) {
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }

  function setWallpaper(id, instant = false) {
    const wp = WALLPAPERS.find((w) => w.id === id) || WALLPAPERS[0];
    if (currentWp === wp.id) return;
    currentWp = wp.id;

    const showing = layers[front];
    const next = layers[1 - front];

    if (instant || !showing.src) {
      showing.src = wp.file;
      showing.classList.add("is-active");
      next.classList.remove("is-active");
      playSafe(showing);
    } else {
      next.src = wp.file;
      playSafe(next);
      next.classList.add("is-active");
      showing.classList.remove("is-active");
      setTimeout(() => {
        if (!showing.classList.contains("is-active")) {
          showing.pause();
          showing.removeAttribute("src");
          showing.load();
        }
      }, 1000);
      front = 1 - front;
    }
    renderWpMenu();
    store.set({ wallpaper: wp.id });
  }

  const wpMenu = $("wpMenu");
  function renderWpMenu() {
    wpMenu.innerHTML = "";
    WALLPAPERS.forEach((w) => {
      const b = document.createElement("button");
      b.textContent = w.label;
      if (w.id === currentWp) b.classList.add("is-on");
      b.addEventListener("click", () => {
        setWallpaper(w.id);
        wpMenu.hidden = true;
      });
      wpMenu.appendChild(b);
    });
  }
  $("wpToggle").addEventListener("click", (e) => {
    e.stopPropagation();
    wpMenu.hidden = !wpMenu.hidden;
    if (!wpMenu.hidden) {
      // the list scrolls past 3 entries — bring the current one into view
      const on = wpMenu.querySelector("button.is-on");
      if (on) on.scrollIntoView({ block: "nearest" });
    }
  });
  document.addEventListener("click", (e) => {
    if (!$("wpControl").contains(e.target)) wpMenu.hidden = true;
  });

  // save power when the tab isn't visible
  document.addEventListener("visibilitychange", () => {
    layers.forEach((v) => {
      if (!v.src) return;
      if (document.hidden) v.pause();
      else if (v.classList.contains("is-active")) playSafe(v);
    });
  });

  /* ================= ICONS =============================================== */
  function iconSrc(key) {
    if (!key) return "";
    if (key.includes("/") || key.includes(".")) return key; // direct path
    const file = (typeof ICONS !== "undefined" && ICONS[key]) || "";
    return file ? (typeof ICON_DIR !== "undefined" ? ICON_DIR : "assets/icons/") + file : "";
  }
  function makeIcon(item, cls) {
    const src = iconSrc(item.icon);
    if (src) {
      const img = document.createElement("img");
      img.className = cls;
      img.src = src;
      img.alt = "";
      img.loading = "eager";
      img.addEventListener("error", () => {
        const fb = document.createElement("span");
        fb.className = "tile-fallback";
        fb.textContent = item.name[0];
        img.replaceWith(fb);
      });
      return img;
    }
    const fb = document.createElement("span");
    fb.className = "tile-fallback";
    fb.textContent = item.name[0];
    return fb;
  }

  /* ================= WORKSPACES + CARDS ================================== */
  const docks = [$("dockLeft"), $("dockRight")];
  const strip = $("strip");
  let activeWs = WORKSPACES[0].id;

  function renderCards() {
    const ws = WORKSPACES.find((w) => w.id === activeWs) || WORKSPACES[0];
    docks.forEach((d) => (d.innerHTML = ""));
    ws.cards.slice(0, 4).forEach((card, i) => {
      const el = document.createElement("article");
      el.className = "card";

      const head = document.createElement("div");
      head.className = "card-head";
      head.innerHTML = `<span class="card-title"></span><span class="card-hint"></span>`;
      head.querySelector(".card-title").textContent = card.title;
      head.querySelector(".card-hint").textContent = card.hint || "";
      el.appendChild(head);

      const tiles = document.createElement("div");
      tiles.className = "tiles";
      card.items.forEach((it) => {
        const a = document.createElement("a");
        a.className = "tile";
        a.href = it.url;
        a.title = it.name;
        const nm = document.createElement("span");
        nm.className = "tile-name";
        nm.textContent = it.name;
        a.append(makeIcon(it, "tile-icon"), nm);
        a.addEventListener("click", () => bumpUsage(it));
        tiles.appendChild(a);
      });
      el.appendChild(tiles);
      docks[i < 2 ? 0 : 1].appendChild(el);
    });
  }

  function renderStrip() {
    strip.innerHTML = "";
    WORKSPACES.forEach((w) => {
      const b = document.createElement("button");
      b.textContent = w.name;
      if (w.id === activeWs) b.classList.add("is-on");
      b.addEventListener("click", () => {
        activeWs = w.id;
        store.set({ workspace: w.id });
        renderStrip();
        renderCards();
      });
      strip.appendChild(b);
    });
  }

  /* ================= QUICK PEEK (most-used shortcuts) ==================== */
  let usage = {};
  function bumpUsage(item) {
    const k = item.url;
    usage[k] = usage[k] || { name: item.name, icon: item.icon, url: item.url, n: 0 };
    usage[k].n += 1;
    store.set({ usage: JSON.stringify(usage) });
  }
  function renderPeek() {
    const panel = $("peekPanel");
    const top = Object.values(usage).sort((a, b) => b.n - a.n).slice(0, 5);
    panel.innerHTML = "";
    if (!top.length) {
      const p = document.createElement("div");
      p.style.cssText = "padding:8px 9px;font-size:12px;color:rgba(247,246,243,.48)";
      p.textContent = "Open a few shortcuts and they'll show up here.";
      panel.appendChild(p);
      return;
    }
    top.forEach((t) => {
      const a = document.createElement("a");
      a.href = t.url;
      const n = document.createElement("span");
      n.className = "n";
      n.textContent = t.name;
      a.append(makeIcon(t, "g"), n);
      panel.appendChild(a);
    });
  }
  $("peekToggle").addEventListener("click", () => {
    const panel = $("peekPanel");
    if (panel.hidden) renderPeek();
    panel.hidden = !panel.hidden;
  });

  /* ================= SEARCH ============================================== */
  $("search").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("q").value.trim();
    if (!q) return;
    window.location.href = SEARCH_URL + encodeURIComponent(q);
  });

  /* ================= AI CHAT ============================================= */
  const aiPanel = $("aiPanel");
  const aiLog = $("aiLog");
  let aiSeeded = false;
  const history = [];

  function addMsg(text, who) {
    const d = document.createElement("div");
    d.className = "msg " + who;
    d.textContent = text;
    aiLog.appendChild(d);
    aiLog.scrollTop = aiLog.scrollHeight;
  }

  function openAi() {
    aiPanel.hidden = false;
    if (!aiSeeded) {
      aiSeeded = true;
      addMsg(AI_CONFIG.endpoint ? AI_CONFIG.greeting : AI_CONFIG.notConfigured, "bot");
    }
    $("aiInput").focus();
  }
  $("aiToggle").addEventListener("click", () => (aiPanel.hidden ? openAi() : (aiPanel.hidden = true)));
  $("aiClose").addEventListener("click", () => (aiPanel.hidden = true));

  $("aiForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = $("aiInput");
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, "me");
    history.push({ role: "user", content: text });
    input.value = "";

    if (!AI_CONFIG.endpoint) {
      addMsg(AI_CONFIG.notConfigured, "bot");
      return;
    }
    try {
      const res = await fetch(AI_CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const reply = data.reply || "No reply returned by the configured endpoint.";
      history.push({ role: "assistant", content: reply });
      addMsg(reply, "bot");
    } catch (err) {
      addMsg("Couldn't reach the assistant endpoint.", "bot");
    }
  });

  /* ================= BOOT ================================================ */
  store.get(["wallpaper", "workspace", "usage"]).then((s) => {
    if (s.workspace && WORKSPACES.some((w) => w.id === s.workspace)) activeWs = s.workspace;
    try { usage = s.usage ? JSON.parse(s.usage) : {}; } catch { usage = {}; }
    renderStrip();
    renderCards();
    syncClockHeight(); // the strip is part of the clock block
    setWallpaper(s.wallpaper || WALLPAPERS[0].id, true);
    $("q").focus();
  });
})();
