import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Footer, InstallButton, Nav } from "@/components/site/layout";
import { GUIDES, type Faq, type GuidePath } from "@/lib/guides";

/* the shell for guide pages: same nav and footer as the rest of the
   site, a breadcrumb, the heading and a readable column. Content isn't
   wrapped in <Reveal>, so it's visible before any script runs. */
export function GuidePage({
  path,
  eyebrow,
  heading,
  lede,
  children,
}: {
  path: GuidePath;
  eyebrow: string;
  heading: ReactNode;
  lede: ReactNode;
  children: ReactNode;
}) {
  const here = GUIDES.find((g) => g.path === path);
  return (
    <div className="site">
      <Nav />
      <main className="wrap guide">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">{here?.name}</li>
          </ol>
        </nav>
        <article>
          <header className="guide-head">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="doc-title">{heading}</h1>
            <p className="lede">{lede}</p>
            <div className="guide-cta-row">
              <InstallButton />
              <a className="btn btn-quiet" href="/#pricing">
                See what's free
              </a>
            </div>
          </header>
          <div className="prose">{children}</div>
        </article>
        <Related path={path} />
      </main>
      <Footer />
    </div>
  );
}

/* a screenshot with fixed dimensions, so nothing jumps while it loads */
export function Shot({ src, alt, caption, eager = false }: { src: string; alt: string; caption: ReactNode; eager?: boolean }) {
  return (
    <figure className="shot">
      <img
        src={src}
        alt={alt}
        width={1280}
        height={800}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* the same <details> list as the home page FAQ; the questions are also
   in the page's FAQPage data, so keep both from one array */
export function GuideFaq({ items }: { items: Faq }) {
  return (
    <section aria-labelledby="faq-h">
      <h2 id="faq-h">Frequently asked questions</h2>
      <div className="faq">
        {items.map(([q, a]) => (
          <details key={q} name="guide-faq">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function InstallBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="guide-cta" aria-label="Install Atlas">
      <p className="guide-cta-title">{title}</p>
      <p>{children}</p>
      <InstallButton />
    </aside>
  );
}

function Related({ path }: { path: GuidePath }) {
  return (
    <section className="related" aria-labelledby="related-h">
      <h2 id="related-h" className="eyebrow">
        Keep reading
      </h2>
      <div className="related-grid">
        {GUIDES.filter((g) => g.path !== path).map((g) => (
          <Link key={g.path} to={g.path} className="related-card">
            <b>{g.name}</b>
            <span>{g.blurb}</span>
          </Link>
        ))}
        <a href="/#features" className="related-card">
          <b>Everything in Atlas</b>
          <span>Shortcuts, focus tools, themes and the rest of the new tab, on the home page.</span>
        </a>
      </div>
    </section>
  );
}
