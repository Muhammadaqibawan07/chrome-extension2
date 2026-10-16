/* ATLAS NEW TAB — background worker
   Everything here serves the new tab page: reminders and the focus timer
   ring on time with no new tab open, the new tab's own text is
   translated, and stats and sync keep their records. */
"use strict";

/* ================= REMINDERS ============================================
   Reminders (reminders.js) live in storage.local. Each enabled one has a
   chrome.alarms alarm at its next occurrence, so it rings anywhere in
   Chrome — no new tab needs to be open. Ringing = a system notification
   that stays until answered (Snooze / Dismiss) plus a looping alarm sound,
   played from an offscreen page because a worker can't play audio.
   A reminder that came due while Chrome was closed rings late, if it is
   less than LATE_LIMIT overdue. */
importScripts("schedule.js");

const REM_KEY = "reminders";
const PREF_KEY = "alarmPrefs";
const PREF_DEFAULTS = { sound: "chime", volume: 80, ringFor: 60, snooze: 10 };
const LATE_LIMIT = 12 * 60 * 60 * 1000;

async function getReminders() {
  const o = await chrome.storage.local.get([REM_KEY]);
  return Array.isArray(o[REM_KEY]) ? o[REM_KEY] : [];
}
async function getPrefs() {
  const o = await chrome.storage.local.get([PREF_KEY]);
  return Object.assign({}, PREF_DEFAULTS, o[PREF_KEY]);
}

/* alarms, the storage listener and startup can all ask at once; one at a time */
let remChain = Promise.resolve();
const serial = (fn) => (remChain = remChain.then(fn).catch((err) => console.error("Atlas reminders:", err)));

/* bring the alarms in line with the stored reminders */
function syncReminders() {
  return serial(async () => {
    const list = await getReminders();
    const now = Date.now();
    const late = [];
    const want = new Map();
    let changed = false;
    for (const r of list) {
      if (!r || !r.id || !r.enabled) continue;
      let t = AtlasSchedule.next(r, Math.max(r.lastFired || 0, r.updatedAt || 0));
      if (t != null && t <= now) {
        /* came due while nothing was listening */
        const missed = AtlasSchedule.last(r, now);
        if (now - missed <= LATE_LIMIT) late.push(r);
        r.lastFired = missed;
        changed = true;
        t = AtlasSchedule.next(r, now);
      }
      if (t != null) want.set("rem:" + r.id, t);
    }
    const existing = await chrome.alarms.getAll();
    for (const a of existing) {
      if (!a.name.startsWith("rem:")) continue;
      const w = want.get(a.name);
      if (w == null || Math.abs(a.scheduledTime - w) > 1000) await chrome.alarms.clear(a.name);
    }
    for (const [name, when] of want) {
      const a = existing.find((x) => x.name === name);
      if (!a || Math.abs(a.scheduledTime - when) > 1000) chrome.alarms.create(name, { when });
    }
    if (changed) await chrome.storage.local.set({ [REM_KEY]: list });
    for (const r of late) await ring(r, true);
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  const [kind, id] = alarm.name.split(":");
  if (kind !== "rem" && kind !== "snooze") return;
  serial(async () => {
    const list = await getReminders();
    const r = list.find((x) => x && x.id === id);
    if (!r) return;
    if (kind === "snooze") return ring(r, false, true);
    /* a sync may already have rung this one late */
    if ((r.lastFired || 0) >= alarm.scheduledTime - 1000) return;
    r.lastFired = alarm.scheduledTime;
    if (r.repeat === "once") r.enabled = false; // done; stays in the list
    await chrome.storage.local.set({ [REM_KEY]: list });
    await ring(r, false);
  });
});

/* ---------- ringing ---------- */
async function ring(r, late, snoozed) {
  const prefs = await getPrefs();
  const sound = !r.sound || r.sound === "default" ? prefs.sound : r.sound;
  const nid = "rem:" + r.id + ":" + Date.now();
  const lines = [];
  if (r.note) lines.push(r.note);
  lines.push(AtlasSchedule.describe(r));
  await chrome.notifications.create(nid, {
    type: "basic",
    iconUrl: "assets/icons/icon-128.png",
    title: "⏰ " + (r.title || "Reminder"),
    message: lines.join("\n"),
    contextMessage: late ? "Missed while Chrome was closed" : snoozed ? "Snoozed reminder" : "Atlas reminder",
    requireInteraction: true,
    priority: 2,
    silent: sound !== "none", // our own alarm plays instead of the system ding
    buttons: [{ title: "Snooze " + prefs.snooze + " min" }, { title: "Dismiss" }],
  });
  if (sound !== "none") await playAlarm(sound, prefs);
  /* open new tabs show the alarm too, with the same two buttons */
  chrome.runtime.sendMessage({
    type: "reminder:ring", nid, id: r.id, title: r.title || "Reminder", note: r.note || "", late: !!late, snooze: prefs.snooze,
  }).catch(() => {});
}

async function ensureOffscreen() {
  if (chrome.offscreen.hasDocument && (await chrome.offscreen.hasDocument())) return;
  try {
    await chrome.offscreen.createDocument({
      url: "alarm.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Ring the alarm sound for a reminder",
    });
  } catch (err) {
    if (!/single offscreen/i.test(String(err && err.message))) throw err;
  }
}
async function playAlarm(sound, prefs, once) {
  try {
    await ensureOffscreen();
    chrome.runtime.sendMessage({
      target: "alarm", type: "alarm:play", sound, volume: prefs.volume,
      loop: !once, maxMs: once ? 8000 : prefs.ringFor * 1000,
    }).catch(() => {});
  } catch (err) {
    console.error("Atlas alarm sound:", err);
  }
}
async function stopAlarm() {
  chrome.runtime.sendMessage({ target: "alarm", type: "alarm:stop" }).catch(() => {});
  setTimeout(() => chrome.offscreen.closeDocument().catch(() => {}), 400);
}

/* answering from the notification, or from a new tab's alarm card */
async function answer(nid, snooze) {
  stopAlarm();
  chrome.notifications.clear(nid).catch(() => {});
  chrome.runtime.sendMessage({ type: "reminder:done", nid }).catch(() => {});
  if (snooze) {
    const id = nid.split(":")[1];
    const prefs = await getPrefs();
    chrome.alarms.create("snooze:" + id, { when: Date.now() + prefs.snooze * 60000 });
  }
}
chrome.notifications.onButtonClicked.addListener((nid, i) => {
  if (nid.startsWith("rem:")) answer(nid, i === 0);
});
chrome.notifications.onClicked.addListener((nid) => {
  if (nid.startsWith("rem:")) answer(nid, false);
});
chrome.notifications.onClosed.addListener((nid) => {
  if (nid.startsWith("rem:")) answer(nid, false);
});

chrome.runtime.onMessage.addListener((msg) => {
  if (!msg || typeof msg.type !== "string") return;
  if (msg.type === "reminder:dismiss" && msg.nid) answer(msg.nid, false);
  else if (msg.type === "reminder:snooze" && msg.nid) answer(msg.nid, true);
  else if (msg.type === "reminder:test") {
    ring({ id: "test", title: msg.title || "Test alarm", note: "This is how your reminders will ring.", repeat: "once", time: "00:00", sound: msg.sound || "default" }, false);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[REM_KEY]) syncReminders();
});
chrome.runtime.onStartup.addListener(syncReminders);
chrome.runtime.onInstalled.addListener(syncReminders);
/* the worker wakes for many reasons; each time, catch up on anything due */
syncReminders();

/* ================= NEW TAB TRANSLATION ===================================
   translate.js (on the new tab only) sends its text in batches; this worker asks
   Google Translate (the endpoint the Translate website itself uses, so no
   key) and remembers answers while it is awake, so a page that re-renders
   the same labels doesn't ask twice.                                      */
const TR_URL = "https://translate.googleapis.com/translate_a/t?client=gtx&sl=auto&tl=";
const TR_CACHE_MAX = 5000;
const trCache = new Map(); // "to\u0001text" -> translation

async function translateBatch(texts, to) {
  const out = new Array(texts.length);
  const need = [];
  texts.forEach((t, i) => {
    const hit = trCache.get(to + "\u0001" + t);
    if (hit !== undefined) out[i] = hit;
    else need.push(i);
  });
  if (need.length) {
    const body = new URLSearchParams();
    need.forEach((i) => body.append("q", texts[i]));
    const r = await fetch(TR_URL + encodeURIComponent(to), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
    });
    if (!r.ok) throw new Error("translate " + r.status);
    const data = await r.json();
    /* one string per input: [text, sourceLang] with sl=auto, or a bare string */
    const list = Array.isArray(data) ? data : [data];
    need.forEach((i, k) => {
      const item = list[k];
      const text = Array.isArray(item) ? item[0] : item;
      out[i] = typeof text === "string" ? text : texts[i];
      if (trCache.size >= TR_CACHE_MAX) trCache.delete(trCache.keys().next().value);
      trCache.set(to + "\u0001" + texts[i], out[i]);
    });
  }
  return out;
}

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (!msg || msg.type !== "translate:batch") return;
  const texts = Array.isArray(msg.texts) ? msg.texts.map(String).slice(0, 200) : [];
  if (!texts.length || typeof msg.to !== "string") return reply({ ok: false });
  translateBatch(texts, msg.to).then(
    (out) => reply({ ok: true, out }),
    (err) => reply({ ok: false, error: String(err && err.message || err) }),
  );
  return true;
});

/* ================= FOCUS TIMER ===========================================
   Quick tools > Focus (focus.js draws it; settings.focus in "appearance").
   The worker owns the clock so a session ends — sound, notification, the
   next phase — with no new tab open. State lives in "focus:state":
     { phase: "idle" | "focus" | "short" | "long", endsAt, left (ms, while
       paused), paused, round (focus sessions done this cycle), startedAt,
       next (the phase the Start button begins) }
   Finished and stopped focus sessions go into "focus:history" (newest
   last): { id, start, end, min, done }.                                  */
const FOCUS_KEY = "focus:state";
const FOCUS_HIST = "focus:history";
const FOCUS_ALARM = "focus:end";
const FOCUS_HIST_MAX = 1000;
const FOCUS_DEFAULTS = { work: 25, short: 5, long: 15, every: 4, dim: true, sound: "chime", autoBreak: true, autoNext: false, notify: true };
const FOCUS_IDLE = { phase: "idle", endsAt: 0, left: 0, paused: false, round: 0, startedAt: 0, next: "focus" };

function readFocus(raw) {
  try {
    const s = JSON.parse(raw || "null");
    return Object.assign({}, FOCUS_DEFAULTS, s && s.settings && s.settings.focus);
  } catch { return Object.assign({}, FOCUS_DEFAULTS); }
}
const phaseMinutes = (phase, prefs) => Math.max(1, Math.min(180, Number(prefs[phase === "focus" ? "work" : phase]) || FOCUS_DEFAULTS[phase === "focus" ? "work" : phase]));

async function focusGet() {
  const o = await chrome.storage.local.get([FOCUS_KEY, "appearance"]);
  return { state: Object.assign({}, FOCUS_IDLE, o[FOCUS_KEY]), prefs: readFocus(o.appearance) };
}

/* every change goes through here, one at a time */
let focusChain = Promise.resolve();
function focusDo(fn) {
  focusChain = focusChain.then(async () => {
    const { state, prefs } = await focusGet();
    const next = await fn(state, prefs);
    if (!next) return;
    await chrome.storage.local.set({ [FOCUS_KEY]: next });
    await chrome.alarms.clear(FOCUS_ALARM);
    if (next.phase !== "idle" && !next.paused) chrome.alarms.create(FOCUS_ALARM, { when: next.endsAt });
  }).catch((e) => console.error("Atlas focus:", e));
  return focusChain;
}

const startPhase = (state, prefs, phase) => Object.assign({}, state, {
  phase, paused: false, left: 0, startedAt: Date.now(),
  endsAt: Date.now() + phaseMinutes(phase, prefs) * 60000,
});

async function logFocus(start, end, planned, done) {
  const min = Math.round((end - start) / 60000);
  if (min < 1) return;
  const o = await chrome.storage.local.get([FOCUS_HIST]);
  const list = Array.isArray(o[FOCUS_HIST]) ? o[FOCUS_HIST] : [];
  list.push({ id: "f" + start.toString(36), start, end, min: Math.min(min, planned), done });
  await chrome.storage.local.set({ [FOCUS_HIST]: list.slice(-FOCUS_HIST_MAX) });
}

/* a phase ran out: log it, ring, and move on */
function focusFinish() {
  return focusDo(async (s, prefs) => {
    if (s.phase === "idle" || s.paused || s.endsAt > Date.now() + 1000) return null;
    let next;
    let title;
    let body;
    if (s.phase === "focus") {
      await logFocus(s.startedAt, s.endsAt, phaseMinutes("focus", prefs), true);
      const round = s.round + 1;
      const brk = round % Math.max(1, prefs.every) === 0 ? "long" : "short";
      next = prefs.autoBreak
        ? startPhase(Object.assign({}, s, { round }), prefs, brk)
        : Object.assign({}, FOCUS_IDLE, { round, next: brk });
      title = "Focus session done";
      body = "Time for a " + phaseMinutes(brk, prefs) + "-minute break." + (prefs.autoBreak ? "" : " Start it from the new tab.");
    } else {
      const round = s.phase === "long" ? 0 : s.round;
      next = prefs.autoNext
        ? startPhase(Object.assign({}, s, { round }), prefs, "focus")
        : Object.assign({}, FOCUS_IDLE, { round, next: "focus" });
      title = "Break's over";
      body = prefs.autoNext ? "Next focus session started." : "Ready for the next focus session?";
    }
    if (prefs.notify) {
      chrome.notifications.create("focus:" + Date.now(), {
        type: "basic", iconUrl: "assets/icons/icon-128.png", title, message: body, priority: 1, silent: prefs.sound !== "none",
      }).catch(() => {});
    }
    if (prefs.sound !== "none") playAlarm(prefs.sound, await getPrefs(), true);
    return next;
  });
}

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (!msg || typeof msg.type !== "string" || !msg.type.startsWith("focus:")) return;
  const act = msg.type.slice(6);
  focusDo(async (s, prefs) => {
    const now = Date.now();
    if (act === "start") {
      const phase = ["focus", "short", "long"].includes(msg.phase) ? msg.phase : s.next || "focus";
      if (s.phase === "focus") await logFocus(s.startedAt, s.paused ? s.endsAt : now, phaseMinutes("focus", prefs), false);
      return startPhase(s, prefs, phase);
    }
    if (s.phase === "idle") return null;
    if (act === "pause" && !s.paused) return Object.assign({}, s, { paused: true, left: Math.max(0, s.endsAt - now), endsAt: now });
    if (act === "resume" && s.paused) {
      /* the paused time doesn't count: move the start forward by it */
      const pausedFor = now - s.endsAt;
      return Object.assign({}, s, { paused: false, startedAt: s.startedAt + pausedFor, endsAt: now + s.left, left: 0 });
    }
    if (act === "stop" || act === "skip") {
      const end = s.paused ? s.endsAt : now;
      if (s.phase === "focus") await logFocus(s.startedAt, end, phaseMinutes("focus", prefs), false);
      if (act === "stop") return Object.assign({}, FOCUS_IDLE, { round: s.round, next: "focus" });
      /* skip: straight on to what comes next, without ringing */
      if (s.phase === "focus") {
        const round = s.round + 1;
        return startPhase(Object.assign({}, s, { round }), prefs, round % Math.max(1, prefs.every) === 0 ? "long" : "short");
      }
      return startPhase(Object.assign({}, s, { round: s.phase === "long" ? 0 : s.round }), prefs, "focus");
    }
    return null;
  }).then(() => reply({ ok: true }));
  return true;
});

chrome.alarms.onAlarm.addListener((a) => { if (a.name === FOCUS_ALARM) focusFinish(); });
/* a phase that ran out while Chrome was closed ends on the next start */
chrome.runtime.onStartup.addListener(focusFinish);
focusFinish();

/* ================= SYNC STAMPS ===========================================
   Automatic sync (sync.js, Atlas Pro) needs to know when each synced value
   last changed on this computer. Every page would see the same change, so
   the stamping happens here, once: "sync:meta" = { key: time }.
   sync.js writes values it brings from the account together with
   "sync:meta" in one set — such a change isn't stamped again.            */
const SYNC_KEYS = ["appearance", "layout", "qt:tasks", "qt:habits", "reminders", "alarmPrefs", "focus:history", "vault", "wp:favs"];
const SYNC_META = "sync:meta";

let syncMetaChain = Promise.resolve();
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || changes[SYNC_META]) return;
  const keys = SYNC_KEYS.filter((k) => changes[k] && JSON.stringify(changes[k].oldValue) !== JSON.stringify(changes[k].newValue));
  if (!keys.length) return;
  const now = Date.now();
  syncMetaChain = syncMetaChain.then(async () => {
    const o = await chrome.storage.local.get([SYNC_META]);
    const meta = Object.assign({}, o[SYNC_META]);
    keys.forEach((k) => { meta[k] = Math.max(now, (meta[k] || 0) + 1); });
    await chrome.storage.local.set({ [SYNC_META]: meta });
  }).catch(() => {});
});
