/* What people say about Atlas, and a way to write to us. Both forms post
   to the backend's POST /contact, which emails the team. */
import { useState, type CSSProperties, type FormEvent } from "react";
import { Reveal } from "@/components/site/layout";
import { I, Icon } from "@/components/site/showcase";
import { API_URL, CONTACT_EMAIL } from "@/lib/site";

/* SAMPLE reviews: replace with real ones (Chrome Web Store, emails)
   before this goes live. */
type Review = { name: string; role: string; stars: number; text: string };
const REVIEWS: Review[] = [
  { name: "Hamza R.", role: "Student", stars: 5, text: "The focus timer plus the site blocker is the combo I didn't know I needed. My new tab finally stops pulling me into YouTube." },
  { name: "Ayesha K.", role: "Product designer", stars: 5, text: "The live wallpapers are gorgeous and it still feels quick. Picking a theme preset recolours everything, which is a really nice touch." },
  { name: "Daniel M.", role: "Software engineer", stars: 5, text: "Ctrl+Space for the command center is muscle memory now. Bangs like !gh and !yt save me a click every single time." },
  { name: "Sara L.", role: "Freelance writer", stars: 4, text: "Reminders that ring wherever I am in Chrome are a lifesaver. Zen mode is lovely when I just want the clock." },
  { name: "Omar F.", role: "Marketing lead", stars: 5, text: "Workspaces keep my personal and work shortcuts apart. The AI day planner laid out my afternoon better than I would have." },
  { name: "Mina T.", role: "PhD researcher", stars: 5, text: "Habits heatmap keeps me honest, and the daily quote is a nice little reset between papers." },
];

type Status = { kind: "idle" | "sending" | "sent" | "error"; note?: string };

async function send(body: Record<string, string | number>) {
  const r = await fetch(API_URL + "/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const j = await r.json().catch(() => null);
    throw new Error((j && j.error) || "Could not send");
  }
}

function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <span className="stars" aria-label={n + " out of 5 stars"}>
      {[1, 2, 3, 4, 5].map((k) => (
        <svg key={k} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={k <= n ? "on" : ""}>
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="rv-card">
      <Stars n={r.stars} />
      <blockquote>“{r.text}”</blockquote>
      <figcaption>
        <span className="rv-av">{r.name[0]}</span>
        <span>
          <b>{r.name}</b>
          <small>{r.role}</small>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const avg = REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length;
  const half = Math.ceil(REVIEWS.length / 2);
  const rows = [REVIEWS.slice(0, half), REVIEWS.slice(half)];
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("website")) return; /* a bot filled the hidden field */
    setStatus({ kind: "sending" });
    try {
      await send({ kind: "review", stars, name: String(f.get("name") || ""), email: String(f.get("email") || ""), message: String(f.get("message") || "") });
      setStatus({ kind: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ kind: "error", note: (err as Error).message });
    }
  };

  return (
    <section id="reviews" className="section reviews">
      <div className="wrap">
        <Reveal className="section-head center">
          <p className="eyebrow">Reviews</p>
          <h2 className="h2">
            Loved by people who <em>open a lot of tabs.</em>
          </h2>
          <p className="rv-score">
            <b>{avg.toFixed(1)}</b>
            <Stars n={Math.round(avg)} size={18} />
            <small>from early users</small>
          </p>
        </Reveal>
      </div>
      <div className="rv-rows">
        {rows.map((row, k) => (
          <div className={"rv-track" + (k ? " rev" : "")} key={k}>
            {[...row, ...row, ...row].map((r, j) => (
              <div key={j} aria-hidden={j >= row.length || undefined}>
                <ReviewCard r={r} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="wrap rv-foot">
        {!open ? (
          <button type="button" className="btn btn-ghost" onClick={() => setOpen(true)}>
            <Icon d={I.spark} size={15} /> Write a review
          </button>
        ) : status.kind === "sent" ? (
          <p className="form-done">
            <Icon d={I.check} size={16} /> Thank you! Your review is with us.
          </p>
        ) : (
          <form className="rv-form glass" onSubmit={submit}>
            <div className="rv-pick" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((k) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={stars === k}
                  aria-label={k + " stars"}
                  key={k}
                  className={k <= (hover || stars) ? "on" : ""}
                  onMouseEnter={() => setHover(k)}
                  onClick={() => setStars(k)}
                >
                  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="form-row">
              <input name="name" required maxLength={80} placeholder="Your name" autoComplete="name" />
              <input name="email" type="email" maxLength={160} placeholder="Email (optional, not shown)" autoComplete="email" />
            </div>
            <textarea name="message" required minLength={10} maxLength={1200} rows={3} placeholder="What do you like about Atlas? What should we fix?" />
            <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-actions">
              {status.kind === "error" && <small className="form-err">{status.note}. Try again or email {CONTACT_EMAIL}.</small>}
              <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Sending…" : "Send review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

const TOPICS = ["Question", "Bug report", "Feature idea", "Billing", "Partnership"];

export function Contact() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("website")) return;
    setStatus({ kind: "sending" });
    try {
      await send({ kind: "contact", topic: topic || "Question", name: String(f.get("name") || ""), email: String(f.get("email") || ""), message: String(f.get("message") || "") });
      setStatus({ kind: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ kind: "error", note: (err as Error).message });
    }
  };

  return (
    <section id="contact" className="section tint contact">
      <div className="wrap contact-grid">
        <Reveal>
          <p className="eyebrow">Contact us</p>
          <h2 className="h2">
            Say hello. <em>A human replies.</em>
          </h2>
          <p className="lede">Questions, bugs, ideas or billing: send a note and we usually answer within a day.</p>
          <ul className="contact-facts">
            <li>
              <Icon d="M4 6h16v12H4zM4 7l8 6 8-6" size={16} />
              <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <Icon d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" size={16} />
              Karachi, Pakistan
            </li>
          </ul>
        </Reveal>
        <Reveal delay={100}>
          {status.kind === "sent" ? (
            <div className="contact-form glass form-sent">
              <span className="form-tick">
                <Icon d={I.check} size={26} />
              </span>
              <h3>Message sent</h3>
              <p>Thanks for writing. We'll get back to you by email soon.</p>
              <button type="button" className="btn btn-ghost" onClick={() => setStatus({ kind: "idle" })}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form glass" onSubmit={submit}>
              <div className="topics" role="radiogroup" aria-label="Topic">
                {TOPICS.map((t, k) => (
                  <button type="button" role="radio" aria-checked={topic === t} key={t} className={topic === t ? "on" : ""} onClick={() => setTopic(t)} style={{ "--d": k * 50 + "ms" } as CSSProperties}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input name="name" required maxLength={80} placeholder="Your name" autoComplete="name" />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" required maxLength={160} placeholder="you@example.com" autoComplete="email" />
                </label>
              </div>
              <label>
                <span>Message</span>
                <textarea name="message" required minLength={10} maxLength={4000} rows={5} placeholder="How can we help?" />
              </label>
              <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="form-actions">
                {status.kind === "error" && (
                  <small className="form-err">
                    {status.note}. You can also <a href={"mailto:" + CONTACT_EMAIL}>email us directly</a>.
                  </small>
                )}
                <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
                  {status.kind === "sending" ? "Sending…" : "Send message"}
                  <Icon d="M5 12h14M13 6l6 6-6 6" size={16} />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
