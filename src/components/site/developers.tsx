/* The people who build Atlas. Add someone by appending to DEVELOPERS;
   each gets the wide layout, one at a time in a swipeable carousel. */
import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import { Reveal } from "@/components/site/layout";
import { useCycle } from "@/components/site/showcase";

type Link = { kind: "web" | "linkedin" | "stack" | "github" | "mail"; label: string; href: string };
type Developer = {
  name: string;
  initials: string;
  photo?: string;
  roles: string[];
  location: string;
  status: string;
  bio: string;
  stats: [number, string, string][];
  stack: string[];
  path: { when: string; where: string; what: string }[];
  site: { label: string; href: string };
  links: Link[];
};

const DEVELOPERS: Developer[] = [
  {
    name: "Muhammad Aqib",
    initials: "MA",
    roles: ["Backend Developer", "API architect", "LLM & RAG builder", "Full-stack when it counts"],
    location: "Karachi, Pakistan",
    status: "Building For Personal",
    bio: "I build the parts of a product people never see: the APIs, the queues, the data models. Lately that means LLM integrations, RAG pipelines and vector search, alongside OAuth, Stripe billing and the third-party plumbing that makes Atlas sync, plan and stay quick.",
    stats: [
      [3, "+", "years building"],
      [7, "+", "products shipped"],
      [3, "", "companies"],
    ],
    stack: [
      "Node.js",
      "Express",
      "Laravel",
      "PHP",
      "React",
      "Vue 3",
      "Nuxt",
      "MySQL",
      "Redis",
      "BullMQ",
      "Qdrant",
      "Supabase",
      "Firebase",
      "Claude",
      "Gemini",
      "RAG",
      "OAuth 2.0",
      "Stripe",
    ],
    path: [
      { when: "2025 — now", where: "Eusopht", what: "Backend Developer" },
      { when: "2023 — 2025", where: "V8 Digital Solutions", what: "Backend Developer" },
      { when: "2022 — 2023", where: "Reignsol", what: "Web Development Intern" },
    ],
    site: { label: "aqibawan.com", href: "https://aqibawan.com/" },
    links: [
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/maqibawan/" },
      {
        kind: "stack",
        label: "Stack Overflow",
        href: "https://stackoverflow.com/users/18027696/m-aqib",
      },
      { kind: "mail", label: "Email", href: "mailto:muhammadaqibawan07@gmail.com" },
    ],
  },
  {
    name: "Syed Taha",
    initials: "ST",
    roles: ["Junior Frontend Developer", "AR Developer", "AI & prompt specialist", "2D game developer", "Editor & creative designer"],
    location: "Karachi, Pakistan",
    status: "Building & learning",
    bio: "I like learning by building: websites, small games, AR experiments, edits and designs. I build responsive interfaces with HTML, CSS, JavaScript and React, use AI to move faster, and refine the results by hand, turning ideas into interactive experiences.",
    stats: [
      [1, "+", "years building"],
      [5, "+", "projects shipped"],
      [6, "", "crafts"],
    ],
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "C#",
      "AR",
      "2D games",
      "Prompt engineering",
      "AI tools",
      "Graphic design",
      "Video editing",
      "Alight Motion",
    ],
    path: [
      { when: "2025 — now", where: "Eusopht", what: "AR Developer" },
      { when: "2025", where: "Eusopht · internship", what: "Frontend & automation intern" },
      { when: "Ongoing", where: "Freelance", what: "Editor & creative designer" },
    ],
    site: { label: "tahadevs.netlify.app", href: "https://tahadevs.netlify.app/" },
    links: [
      { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-taha-2169bb289/" },
      { kind: "github", label: "GitHub", href: "https://github.com/tahafte0236-create" },
      { kind: "mail", label: "Email", href: "mailto:taha.fte0236@gmail.com" },
    ],
  },
];

const GLYPH: Record<Link["kind"] | "out" | "pin", string> = {
  web: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
  linkedin:
    "M5 9h3v10H5zM6.5 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM11 9h3v1.5c.6-1 1.7-1.8 3.3-1.8 2.4 0 3.7 1.5 3.7 4.3V19h-3v-5.5c0-1.4-.6-2.2-1.8-2.2s-2.2.8-2.2 2.4V19h-3z",
  stack: "M5 14v6h13v-6M8 17h7M8.3 13.6l6.9 1.4M9.3 10.2l6.4 3M11.2 6.9l5.4 4.5M14.3 4l4.1 5.6",
  github:
    "M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  out: "M14 4h6v6M20 4l-9 9M18 14v5H5V6h5",
  pin: "M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
};

const Glyph = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

/* types a phrase, holds it, deletes it, moves to the next */
function useTyped(words: string[]) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0;
    let n = words[0].length;
    let deleting = true;
    let id: number;
    const step = () => {
      let wait = 70;
      if (deleting) {
        n--;
        wait = 34;
        if (n === 0) {
          deleting = false;
          w = (w + 1) % words.length;
          wait = 260;
        }
      } else {
        n++;
        if (n === words[w].length) {
          deleting = true;
          wait = 2200;
        }
      }
      setText(words[w].slice(0, n));
      id = window.setTimeout(step, wait);
    };
    id = window.setTimeout(step, 2400);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

function Count({ to, suffix }: { to: number; suffix: string }) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [el, to]);
  return (
    <b ref={setEl}>
      {n}
      <i>{suffix}</i>
    </b>
  );
}

function Profile({ dev, wide, delay }: { dev: Developer; wide: boolean; delay: number }) {
  const role = useTyped(dev.roles);
  const now = useCycle(dev.path.length, 2600);
  /* pointer spotlight plus a gentle 3D tilt */
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x * 100 + "%");
    el.style.setProperty("--my", y * 100 + "%");
    el.style.setProperty("--rx", (0.5 - y) * 5 + "deg");
    el.style.setProperty("--ry", (x - 0.5) * 7 + "deg");
  };
  const onLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal className={"devp" + (wide ? " devp-wide" : "")} delay={delay}>
      <article className="dev-card" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="dev-aurora" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="dev-grid-bg" aria-hidden="true" />

        <div className="dev-side">
          <div className="dev-avatar">
            <span className="dev-ring" aria-hidden="true" />
            <span className="dev-orbit" aria-hidden="true">
              <i />
            </span>
            <span className="dev-face">
              {dev.photo ? (
                <img src={dev.photo} alt="" />
              ) : (
                <span className="dev-initials">{dev.initials}</span>
              )}
            </span>
            <span className="dev-wave" aria-hidden="true">
              👋
            </span>
          </div>
          <p className="dev-status">
            <span className="dev-live" />
            {dev.status}
          </p>
          <p className="dev-loc">
            <Glyph d={GLYPH.pin} size={14} />
            {dev.location}
          </p>
        </div>

        <div className="dev-main">
          <p className="dev-kicker">
            <span className="dev-mono">&lt;/&gt;</span> About the developer
          </p>
          <h3 className="dev-name">
            Hi, I'm <span className="dev-shine">{dev.name}</span>
          </h3>
          <p className="dev-role" aria-label={dev.roles.join(", ")}>
            <span aria-hidden="true">
              {role}
              <span className="caret" />
            </span>
          </p>
          <p className="dev-bio">{dev.bio}</p>

          <div className="dev-stats">
            {dev.stats.map(([n, s, l]) => (
              <span key={l}>
                <Count to={n} suffix={s} />
                <small>{l}</small>
              </span>
            ))}
          </div>

          <ol className="dev-path" aria-label="Experience">
            {dev.path.map((p, k) => (
              <li key={p.where} className={k === now ? "on" : ""}>
                <span className="dev-dot" />
                <small>{p.when}</small>
                <b>{p.where}</b>
                <em>{p.what}</em>
              </li>
            ))}
          </ol>

          <div className="dev-stack" aria-label="Tech stack">
            <div className="dev-stack-track">
              {[...dev.stack, ...dev.stack].map((s, k) => (
                <span key={k} aria-hidden={k >= dev.stack.length || undefined}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="dev-ctas">
            <a className="btn dev-visit" href={dev.site.href} target="_blank" rel="noreferrer">
              <Glyph d={GLYPH.web} />
              Visit <span className="dev-url">{dev.site.label}</span>
              <span className="dev-url-short">portfolio</span>
              <span className="dev-out">
                <Glyph d={GLYPH.out} size={15} />
              </span>
            </a>
            <div className="dev-links">
              {dev.links.map((l, k) => (
                <a
                  key={l.kind}
                  href={l.href}
                  {...(l.kind === "mail" ? {} : { target: "_blank", rel: "noreferrer" })}
                  aria-label={l.label}
                  title={l.label}
                  style={{ "--d": k * 90 + "ms" } as CSSProperties}
                >
                  <Glyph d={GLYPH[l.kind]} size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* one profile at a time: swipe, drag the scrollbar, or use the arrows and dots */
function Carousel() {
  const [track, setTrack] = useState<HTMLDivElement | null>(null);
  const [at, setAt] = useState(0);
  const n = DEVELOPERS.length;
  useEffect(() => {
    if (!track) return;
    const on = () => setAt(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", on, { passive: true });
    return () => track.removeEventListener("scroll", on);
  }, [track]);
  const go = (k: number) => {
    if (!track) return;
    const i = (k + n) % n;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  };
  return (
    <div className="devs-carousel" role="region" aria-roledescription="carousel" aria-label="The team">
      <div
        className="devs-track"
        ref={setTrack}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(at + 1);
          if (e.key === "ArrowLeft") go(at - 1);
        }}
      >
        {DEVELOPERS.map((d, k) => (
          <div className="devs-slide" key={d.name} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}: ${d.name}`}>
            <Profile dev={d} wide delay={0} />
          </div>
        ))}
      </div>
      {n > 1 && (
        <div className="devs-nav">
          <button type="button" className="devs-arrow" aria-label="Previous profile" onClick={() => go(at - 1)}>
            <Glyph d="M15 5l-7 7 7 7" size={18} />
          </button>
          <div className="devs-dots">
            {DEVELOPERS.map((d, k) => (
              <button type="button" key={d.name} className={k === at ? "on" : ""} aria-label={"Show " + d.name} aria-current={k === at || undefined} onClick={() => go(k)}>
                <span>{d.initials}</span>
                <b>{d.name}</b>
              </button>
            ))}
          </div>
          <button type="button" className="devs-arrow" aria-label="Next profile" onClick={() => go(at + 1)}>
            <Glyph d="M9 5l7 7-7 7" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export function Developers() {
  return (
    <section className="section devs" id="team">
      <div className="devs-glow" aria-hidden="true" />
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="eyebrow">The people behind it</p>
          <h2 className="h2">
            Made by hand, <em>by humans.</em>
          </h2>
          <p className="lede center">
            Atlas is built by a small team who open far too many tabs. Say hello.
          </p>
        </Reveal>
        <Carousel />
      </div>
    </section>
  );
}
