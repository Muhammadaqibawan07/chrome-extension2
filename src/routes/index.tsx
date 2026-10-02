import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Footer, InstallButton, Nav, Reveal, useTheme } from "@/components/site/layout";
import { FALLBACK_PRICES, THEMES, fetchPlans, money } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas — a new tab worth opening" },
      {
        name: "description",
        content:
          "Atlas replaces Chrome's new tab with live 4K wallpapers, glass shortcut cards, workspaces, quick tools and a quiet assistant. Free, with an optional Pro plan.",
      },
      { property: "og:title", content: "Atlas — a new tab worth opening" },
      {
        property: "og:description",
        content: "Live wallpapers, shortcuts in glass cards, workspaces and quick tools for Chrome's new tab.",
      },
      { property: "og:image", content: "/media/shot-2.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="site">
      <Nav />
      <Hero />
      <Shortcuts />
      <Features />
      <Themes />
      <Pricing />
      <Faq />
      <Closing />
      <Footer />
    </div>
  );
}

/* a muted looping video that only plays while on screen */
function Loop({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" />;
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="hero">
      <Loop src="/media/hero.mp4" poster="/media/hero.jpg" className="hero-video" />
      <div className="hero-shade" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow rise" style={{ animationDelay: "60ms" }}>
            For Chrome · Free to use
          </p>
          <h1 className="display rise" style={{ animationDelay: "120ms" }}>
            Your new tab,
            <br />
            <em>finally</em> worth
            <br />
            opening.
          </h1>
          <p className="lede rise" style={{ animationDelay: "200ms" }}>
            Atlas swaps Chrome's blank page for a live wallpaper, your sites in tidy glass cards, a proper search bar
            and a handful of small tools you'll actually use. Set up in under a minute.
          </p>
          <div className="hero-ctas rise" style={{ animationDelay: "280ms" }}>
            <InstallButton />
            <a href="#features" className="btn btn-ghost">
              Take a look inside
            </a>
          </div>
          <ul className="hero-facts rise" style={{ animationDelay: "360ms" }}>
            <li>Chrome, Edge &amp; Brave</li>
            <li>No ads, no analytics</li>
            <li>7 days of Pro free</li>
          </ul>
        </div>
        <figure className="hero-shot rise" style={{ animationDelay: "240ms" }}>
          <BrowserFrame>
            <img src="/media/shot-2.jpg" alt="Atlas new tab with shortcut cards over a live wallpaper" width={1280} height={800} />
          </BrowserFrame>
        </figure>
      </div>
    </section>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="frame">
      <div className="frame-bar">
        <i />
        <i />
        <i />
        <span className="frame-url">New Tab</span>
      </div>
      <div className="frame-body">{children}</div>
    </div>
  );
}

/* ---------- keyboard strip ---------- */
function Shortcuts() {
  const keys = [
    { k: ["Ctrl", "Space"], t: "Command Center — every setting and tool, by name" },
    { k: ["Z"], t: "Zen clock — just the time over your wallpaper" },
    { k: ["M"], t: "Minimal — hide everything but search" },
    { k: ["Right-click"], t: "Edit, move or remove any shortcut" },
  ];
  return (
    <section className="keys" aria-label="Keyboard shortcuts">
      <div className="wrap keys-row">
        {keys.map((x) => (
          <div className="key-item" key={x.t}>
            <span className="kbds">
              {x.k.map((k) => (
                <kbd key={k}>{k}</kbd>
              ))}
            </span>
            <span>{x.t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- features (bento) ---------- */
function Features() {
  return (
    <section id="features" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">What's inside</p>
          <h2 className="h2">
            Everything a new tab should do,
            <br />
            <em>and nothing it shouldn't.</em>
          </h2>
        </Reveal>

        <div className="bento">
          <Reveal className="tile t-wall">
            <Loop src="/media/live-1.mp4" className="tile-media" />
            <div className="tile-copy on-media">
              <span className="tag">Wallpapers</span>
              <h3>Live 4K wallpapers</h3>
              <p>
                Stills and slow-moving video from an online library, or your own .mp4. Schedule a different one for
                mornings and evenings.
              </p>
            </div>
          </Reveal>

          <Reveal className="tile t-cards" delay={80}>
            <div className="tile-copy">
              <span className="tag">Shortcuts</span>
              <h3>Your sites, in glass cards</h3>
              <p>Group them into sections, drag to reorder, right-click to edit. Keep Personal and Work apart with workspaces.</p>
            </div>
            <div className="crop crop-cards">
              <img src="/media/shot-2.jpg" alt="" loading="lazy" />
            </div>
          </Reveal>

          <Reveal className="tile t-tools">
            <div className="tile-copy">
              <span className="tag">Quick tools</span>
              <h3>The small stuff, one click away</h3>
            </div>
            <ul className="toolgrid">
              {[
                ["Notes", "M5 4h10l4 4v12H5z M14 4v5h5"],
                ["Habits", "M5 12.5l4.5 4.5L19 7.5"],
                ["Reminders", "M12 21a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zM18 16V11a6 6 0 0 0-12 0v5l-2 2h16z"],
                ["Focus timer", "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"],
                ["Tab manager", "M3 7h18v13H3zM3 7l3-3h6l2 3"],
                ["Day planner", "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4"],
                ["Translate", "M4 5h9M8.5 3v2M6 5c1 4 4 7 7 8M11 5c-1 4-4 7-7 8M13 20l4-9 4 9M14.5 17h5"],
                ["Stats", "M4 20V10M10 20V4M16 20v-7M22 20H2"],
              ].map(([name, d]) => (
                <li key={name}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={d} />
                  </svg>
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="tile t-ai" delay={80}>
            <div className="tile-copy">
              <span className="tag">Assistant</span>
              <h3>Ask without leaving the tab</h3>
              <p>A small panel in the corner. Talk or type; it can plan your day around your calendar.</p>
            </div>
            <div className="chat" aria-hidden="true">
              <p className="me">Plan my afternoon — I have a call at 3.</p>
              <p className="bot">
                1:00 deep work on the report · 2:30 prep notes for the call · 3:00 call · 4:00 inbox and wrap-up.
              </p>
            </div>
          </Reveal>

          <Reveal className="tile t-zen">
            <Loop src="/media/live-2.mp4" className="tile-media" />
            <div className="zen-clock" aria-hidden="true">
              <ZenTime />
            </div>
            <div className="tile-copy on-media">
              <span className="tag">Zen</span>
              <h3>Press Z for quiet</h3>
            </div>
          </Reveal>

          <Reveal className="tile t-custom" delay={80}>
            <div className="crop crop-custom">
              <img src="/media/shot-4.jpg" alt="" loading="lazy" />
            </div>
            <div className="tile-copy">
              <span className="tag">Customize</span>
              <h3>Tune every pixel</h3>
              <p>Accent colour, glass opacity and blur, roundness, fonts, cursors and lighting. Save it to your account and it follows you.</p>
            </div>
          </Reveal>

          <Reveal className="tile t-small">
            <span className="tag">Private space</span>
            <h3>A locked folder for the links you'd rather not leave lying around.</h3>
          </Reveal>
          <Reveal className="tile t-small" delay={60}>
            <span className="tag">Now playing</span>
            <h3>Pause YouTube or Spotify from the new tab, without hunting for the tab.</h3>
          </Reveal>
          <Reveal className="tile t-small" delay={120}>
            <span className="tag">Sync</span>
            <h3>Sign in with Google and your setup is the same on every computer.</h3>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ZenTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span>&nbsp;</span>;
  return <span>{now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "")}</span>;
}

/* ---------- themes: the whole page recolours ---------- */
function Themes() {
  const [theme, pick] = useTheme();
  return (
    <section id="themes" className="section themes">
      <div className="wrap themes-grid">
        <Reveal className="themes-copy">
          <p className="eyebrow">Eight presets, endless tweaks</p>
          <h2 className="h2">
            Pick a mood.
            <br />
            <em>Go on, click one.</em>
          </h2>
          <p className="lede">
            These are the same presets you'll find in Atlas. Choosing one recolours this whole page, which is roughly
            what it feels like in the extension.
          </p>
          <div className="swatches" role="radiogroup" aria-label="Theme preset">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={theme.id === t.id}
                className={"swatch" + (theme.id === t.id ? " is-on" : "")}
                onClick={() => pick(t)}
              >
                <span className="dot" style={{ background: `linear-gradient(135deg, ${t.accent} 50%, ${t.glass} 50%)` }} />
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal className="mini" delay={100}>
          <Loop key={theme.tone} src={theme.tone} className="mini-bg" />
          <div className="mini-top">
            <div className="mini-clock">
              <ZenTime />
              <small>{new Date().toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}</small>
            </div>
            <span className="mini-chip">Quick peek</span>
          </div>
          <div className="mini-card">
            <div className="mini-tabs">
              <span className="on">All</span>
              <span>Apps</span>
              <span>Work</span>
            </div>
            <div className="mini-icons">
              {["Mail", "Docs", "Music", "Maps", "Code", "News", "Chat", "Cal"].map((n) => (
                <span key={n}>
                  <i />
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="mini-search">Search Google…</div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */
const FREE = ["Live and still wallpapers (5 from the online library)", "Shortcut cards and workspaces", "Search, weather, now playing", "Notes, 3 habits, focus timer", "Assistant, 20 messages a day"];
const PRO = [
  "Every theme preset and cursor pack",
  "Unlimited 4K and live wallpapers",
  "Private space",
  "Automatic sync and backup",
  "AI day planner and calendar",
  "30-day stats and a weekly email",
  "Unlimited habits and saved tab sessions",
  "Assistant, 500 messages a day",
];

function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [prices, setPrices] = useState(FALLBACK_PRICES);
  useEffect(() => {
    fetchPlans().then(setPrices);
  }, []);
  const save = Math.round((1 - prices.yearly.amount / (prices.monthly.amount * 12)) * 100);
  return (
    <section id="pricing" className="section">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="eyebrow">Pricing</p>
          <h2 className="h2">
            Free for good. <em>Pro if you want the lot.</em>
          </h2>
          <div className="toggle" role="radiogroup" aria-label="Billing period">
            <button type="button" role="radio" aria-checked={!yearly} className={!yearly ? "on" : ""} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" role="radio" aria-checked={yearly} className={yearly ? "on" : ""} onClick={() => setYearly(true)}>
              Yearly {save > 0 && <span className="save">−{save}%</span>}
            </button>
          </div>
        </Reveal>

        <div className="plans">
          <Reveal className="plan">
            <h3>Free</h3>
            <p className="plan-price">
              <b>$0</b>
              <span>forever</span>
            </p>
            <p className="plan-note">Everything you need for a better new tab.</p>
            <InstallButton className="btn-block btn-quiet">Get Atlas</InstallButton>
            <ul className="ticks">
              {FREE.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="plan plan-pro" delay={80}>
            <div className="plan-head">
              <h3>Pro</h3>
              <span className="pill">7 days free</span>
            </div>
            <p className="plan-price">
              <b>{money(yearly ? prices.yearly : prices.monthly)}</b>
              <span>{yearly ? "per year" : "per month"}</span>
            </p>
            <p className="plan-note">
              {yearly ? `That's ${money(prices.yearly, { perMonth: true })} a month, billed once a year.` : "Billed monthly. Cancel whenever you like."}
            </p>
            <InstallButton className="btn-block">Start your free trial</InstallButton>
            <ul className="ticks">
              <li className="ticks-lead">Everything in Free, plus</li>
              {PRO.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="fine center">
          The trial starts when you sign in inside Atlas. No card needed for the trial; upgrade from Customize › Account.
        </p>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQ = [
  ["Is Atlas really free?", "Yes. The free version has no time limit and no ads. Pro adds extra themes, unlimited wallpapers, sync, the private space and a few power tools, and it pays for the servers."],
  ["What does Atlas know about my browsing?", "Your shortcuts, settings and screen-time stats stay in your browser. Stats only note which site is in front and for how long (the domain, never the page), and they're only uploaded if you turn on the weekly email. The privacy policy lists everything that leaves your computer."],
  ["Which browsers does it work in?", "Any Chromium browser that installs Chrome Web Store extensions: Chrome, Edge, Brave, Arc, Opera and Vivaldi."],
  ["How do I cancel Pro?", "Open Customize › Account › Manage subscription. You keep Pro until the end of the period you've paid for, and your settings stay as they are."],
  ["Do I need an account?", "Only for Pro, sync and backup. Everything else works signed out. Signing in uses your Google account; there's no password to remember."],
  ["Can I use my own wallpaper?", "Yes. Upload any image or .mp4 from Customize › Background. It stays on your computer."],
];

function Faq() {
  return (
    <section id="faq" className="section">
      <div className="wrap faq-grid">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="h2">
            Good to <em>know.</em>
          </h2>
        </Reveal>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="closing">
      <Loop src="/media/hero.mp4" poster="/media/hero.jpg" className="closing-video" />
      <div className="closing-shade" />
      <div className="wrap closing-inner">
        <h2 className="display small">
          Open a new tab.
          <br />
          <em>Stay a second longer.</em>
        </h2>
        <InstallButton />
      </div>
    </section>
  );
}
