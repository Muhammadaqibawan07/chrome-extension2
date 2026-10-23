/* The Atlas logo intro that plays over the home page: "Atlas" is hand-written,
   a blueprint of the tile is drafted beside it, then it inks in and fades out.
   Ported from atlas-intro-project; tweak SPEED / PLAY_ONCE and the TIMELINE below.
   Click or press a key to skip. Reduced motion gets a short fade instead. */
import { useLayoutEffect, useRef, useState } from "react";

const SPEED = 1.2; // 1 = as authored, 1.5 = faster, 0.8 = slower
const PLAY_ONCE = true; // only once per browser session
const SEEN_KEY = "atlas-intro";
/* if the page takes longer than this to hydrate, the CSS fallback in site.css has already
   faded the overlay out, so don't bring it back (keep in sync with intro-bail's delay) */
const LATE_MS = 2500;

/* runs before hydration so a visitor who already saw it never gets a flash of the overlay */
const HIDE_IF_SEEN = PLAY_ONCE
  ? `try{if(sessionStorage.getItem("${SEEN_KEY}")==="1")document.getElementById("atlas-intro").classList.add("leaving","done")}catch(e){}`
  : "";

const lin = (t: number) => t;
const sine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eo = (t: number) => 1 - Math.pow(1 - t, 3);
const back = (t: number) => {
  const c1 = 1.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

type Track = { s: number; d: number; fn: (p: number) => void };
type Pen = { el: SVGGeometryElement; at: number; color: string };

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const intro = ref.current;
    if (!intro) return;
    const $ = <T extends Element = SVGGraphicsElement>(id: string) =>
      intro.querySelector("#ai-" + id) as T;
    const all = (sel: string) => Array.from(intro.querySelectorAll<SVGGeometryElement>(sel));
    const svg = $<SVGSVGElement>("svg");
    const pen = $("pen");
    const html = document.documentElement;

    let seen = false;
    try {
      seen = PLAY_ONCE && sessionStorage.getItem(SEEN_KEY) === "1";
      if (PLAY_ONCE) sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage blocked: just play it */
    }
    if (seen || performance.now() > LATE_MS) {
      intro.classList.add("leaving", "done");
      setGone(true);
      return;
    }

    const tracks: Track[] = [];
    let activePen: Pen | null = null;
    const track = (s: number, d: number, fn: (p: number) => void) => tracks.push({ s, d, fn });
    const prep = (el: SVGGeometryElement) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len + " " + (len + 4);
      el.style.strokeDashoffset = String(len);
      return len;
    };
    /* draw a stroke from start to end; penColor = colour of the pen tip that follows it */
    const draw = (el: SVGGeometryElement, s: number, d: number, ease = sine, penColor?: string) => {
      const len = prep(el);
      track(s, d, (p) => {
        const e = ease(p);
        el.style.strokeDashoffset = String(len * (1 - e));
        if (penColor && p > 0 && p < 1) activePen = { el, at: len * e, color: penColor };
      });
    };
    const fade = (el: Element, s: number, d: number, from: number, to: number, ease = lin) =>
      track(
        s,
        d,
        (p) => ((el as HTMLElement).style.opacity = String(from + (to - from) * ease(p))),
      );

    /* ------------------------------------------------------------------
       TIMELINE (ms, before SPEED is applied)
    ------------------------------------------------------------------ */
    const PEN_W = "#e8d9bd";
    const PEN_B = "#9cc2ff";
    const PEN_S = "#b8924f";

    /* 1. "Atlas" is written, letter by letter */
    const wt: [number, number][] = [
      [300, 400],
      [700, 140],
      [880, 300],
      [1180, 130],
      [1350, 240],
      [1630, 340],
      [1970, 300],
      [2310, 380],
    ];
    all("#ai-word .w").forEach((el, i) => draw(el, wt[i]![0], wt[i]![1], sine, PEN_W));

    /* 2. the word slides right to make room */
    const word = $("word");
    track(2750, 800, (p) =>
      word.setAttribute("transform", "translate(" + (95 + 96 * eio(p)) + " 30) scale(.86)"),
    );

    /* 3. blueprint: grid, guide lines, outline drawn by hand */
    fade($("grid"), 2700, 900, 0, 1, eo);
    const g = all("#ai-gGuides .d");
    g.slice(0, 4).forEach((el, i) => draw(el, 2800 + i * 70, 500, eo)); // box edges
    draw(g[4]!, 3050, 450, eo); // centre lines
    draw(g[5]!, 3100, 450, eo);
    draw($<SVGGeometryElement>("outline"), 3000, 1000, sine, PEN_B); // the box itself
    draw(g[6]!, 3750, 350, eo); // corner marks
    draw(g[7]!, 3950, 500, eo); // dimension line
    const dim = $<SVGTextElement>("dim");
    track(4300, 300, (p) => (dim.style.opacity = String(0.9 * p)));
    draw($<SVGGeometryElement>("cRing"), 3950, 550, sine, PEN_B);
    draw($<SVGGeometryElement>("cOrbit"), 4350, 500, sine, PEN_B);
    draw($<SVGGeometryElement>("cRadius"), 4650, 250, eo);
    draw($<SVGGeometryElement>("cTarget"), 4800, 220, eo);

    /* 4. blueprint becomes the real tile */
    fade($("tile"), 5000, 550, 0, 1, eo);
    fade($("gOutline"), 5000, 550, 1, 0);
    fade($("gGuides"), 5050, 600, 0.4, 0);
    track(5050, 400, (p) => {
      if (p > 0) dim.style.opacity = String(0.9 * (1 - p));
    });
    fade($("glow"), 5100, 1000, 0, 1, eo);

    /* 5. the ring is inked in, then the dot orbits into place */
    draw($<SVGGeometryElement>("ringThick"), 5300, 800, sine, PEN_S);
    const dot = $<SVGCircleElement>("dot");
    const END = Math.atan2(-35, 37);
    const R = 50.9;
    track(6050, 950, (p) => {
      const a = END - 3.49 * (1 - eo(p));
      dot.setAttribute("cx", String(68 + R * Math.cos(a)));
      dot.setAttribute("cy", String(71 + R * Math.sin(a)));
      dot.setAttribute("r", String(8.5 * Math.max(0, back(Math.min(1, p * 2.2)))));
      dot.style.opacity = p > 0 ? "1" : "0";
    });
    fade($("gCons"), 6800, 500, 0.7, 0);

    const EXIT = 7500;
    const END_T = 8300;

    /* ------------------------------------------------------------------ */
    let raf = 0;
    let leaving = false;
    let penA = 0;
    const timers: number[] = [];
    const pt = svg.createSVGPoint();
    const t0 = performance.now();

    const frame = (now: number) => {
      const t = (now - t0) * SPEED;
      activePen = null;
      for (const k of tracks) {
        const p = (t - k.s) / k.d;
        k.fn(p < 0 ? 0 : p > 1 ? 1 : p);
      }
      const ap = activePen as Pen | null;
      if (ap) {
        const q = ap.el.getPointAtLength(ap.at);
        const m = svg.getScreenCTM()!.inverse().multiply(ap.el.getScreenCTM()!);
        pt.x = q.x;
        pt.y = q.y;
        const r = pt.matrixTransform(m);
        pen.setAttribute("transform", "translate(" + r.x + " " + r.y + ")");
        pen.style.color = ap.color;
      }
      penA += ((ap ? 1 : 0) - penA) * 0.3;
      pen.style.opacity = String(penA);

      if (!leaving && t >= EXIT) {
        leaving = true;
        intro.classList.add("leaving");
        html.classList.remove("intro-on");
      }
      if (t >= END_T) return finish();
      raf = requestAnimationFrame(frame);
    };

    const finish = () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      intro.classList.add("leaving");
      html.classList.remove("intro-on");
      timers.push(window.setTimeout(() => setGone(true), 700));
    };

    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    intro.addEventListener("click", finish);
    window.addEventListener("keydown", skip);
    html.classList.add("intro-on");

    tracks.forEach((k) => k.fn(0));
    /* every stroke is now reset to undrawn, so the stage can be revealed without a flash */
    intro.classList.add("ready");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* reduced motion: show the finished logo, then fade */
      tracks.forEach((k) => k.fn(1));
      pen.style.opacity = "0";
      timers.push(window.setTimeout(finish, 700));
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      intro.removeEventListener("click", finish);
      window.removeEventListener("keydown", skip);
      html.classList.remove("intro-on");
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <div className="intro" id="atlas-intro" ref={ref} aria-hidden="true" suppressHydrationWarning>
        <div className="intro-grid" id="ai-grid" />
        <div className="intro-glow" id="ai-glow" />

        <div className="intro-stage">
          <svg id="ai-svg" viewBox="-24 -38 434 216" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ai-halo">
                <stop offset="0" stopColor="currentColor" stopOpacity=".55" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ICON (final tile) */}
            <rect
              id="ai-tile"
              x="0"
              y="0"
              width="140"
              height="140"
              rx="38"
              fill="#e9e7e3"
              opacity="0"
            />
            <path
              id="ai-ringThick"
              fill="none"
              stroke="#dcc7a1"
              strokeWidth="9"
              d="M68 37 a34 34 0 1 1 0 68 a34 34 0 1 1 0 -68"
            />
            <circle id="ai-dot" r="8.5" fill="#17171a" cx="105" cy="36" opacity="0" />

            {/* BLUEPRINT layers */}
            <g
              id="ai-gGuides"
              fill="none"
              stroke="#8fb8ff"
              strokeWidth="1"
              strokeLinecap="round"
              opacity=".4"
            >
              <path className="d" d="M-18 0 H158" />
              <path className="d" d="M-18 140 H158" />
              <path className="d" d="M0 -18 V158" />
              <path className="d" d="M140 -18 V158" />
              <path className="d" d="M-18 71 H158" />
              <path className="d" d="M68 -18 V150" />
              <path
                className="d"
                d="M32 38 h12 M38 32 v12 M96 38 h12 M102 32 v12 M32 102 h12 M38 96 v12 M96 102 h12 M102 96 v12"
              />
              <path
                className="d"
                d="M0 148 V166 M140 148 V166 M0 157 H140 M0 157 l6 -3 M0 157 l6 3 M140 157 l-6 -3 M140 157 l-6 3"
              />
            </g>
            <text
              id="ai-dim"
              x="70"
              y="177"
              textAnchor="middle"
              fontSize="9"
              fill="#8fb8ff"
              opacity="0"
            >
              140
            </text>

            <g
              id="ai-gOutline"
              fill="none"
              stroke="#a9c8ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                id="ai-outline"
                d="M38 0 H102 A38 38 0 0 1 140 38 V102 A38 38 0 0 1 102 140 H38 A38 38 0 0 1 0 102 V38 A38 38 0 0 1 38 0 Z"
              />
            </g>

            <g
              id="ai-gCons"
              fill="none"
              stroke="#8fb8ff"
              strokeWidth="1.2"
              opacity=".7"
              strokeLinecap="round"
            >
              <circle id="ai-cRing" cx="68" cy="71" r="34" />
              <circle id="ai-cOrbit" cx="68" cy="71" r="50.9" />
              <path id="ai-cRadius" d="M68 71 L105 36" />
              <circle id="ai-cTarget" cx="105" cy="36" r="8.5" />
            </g>

            {/* WORDMARK, hand-written with strokes */}
            <g
              id="ai-word"
              transform="translate(95 30) scale(.86)"
              fill="none"
              stroke="#f3f1ec"
              strokeWidth="10.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path className="w" d="M6 80 L34 14 L62 80" />
              <path className="w" d="M17 60 H51" />
              <path className="w" d="M86 16 V60 C86 72 92 77 103 77" />
              <path className="w" d="M74 33 H102" />
              <path className="w" d="M124 8 V80" />
              <path className="w" d="M145 39 C149 31 156 28 164 28 C174 28 179 35 179 46 V80" />
              <path
                className="w"
                d="M179 58 C166 50 147 55 147 67 C147 77 157 81 167 79 C174 78 179 73 179 68"
              />
              <path
                className="w"
                d="M222 40 C218 32 210 29 203 29 C195 29 191 33 191 39 C191 46 198 48 206 50 C214 52 222 55 222 63 C222 73 214 79 204 79 C195 79 190 75 187 69"
              />
            </g>

            {/* the pen */}
            <g id="ai-pen" opacity="0" style={{ color: "#e8d9bd" }}>
              <circle r="13" fill="url(#ai-halo)" />
              <circle r="2.6" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
      {HIDE_IF_SEEN && <script dangerouslySetInnerHTML={{ __html: HIDE_IF_SEEN }} />}
      <noscript>
        <style>{".intro{display:none}"}</style>
      </noscript>
    </>
  );
}
