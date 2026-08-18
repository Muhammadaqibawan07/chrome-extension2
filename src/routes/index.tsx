import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas New Tab — Cinematic Chrome New Tab Extension" },
      {
        name: "description",
        content:
          "A calm, editorial Chrome New Tab replacement with live video wallpapers, shortcut cards, Google search and a compact assistant. Manifest V3, load unpacked.",
      },
      { property: "og:title", content: "Atlas New Tab — Cinematic Chrome New Tab Extension" },
      {
        property: "og:description",
        content:
          "Live video wallpapers, four shortcut cards, workspace switching and a discreet assistant. Manifest V3 Chrome extension.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function download() {
  fetch("/atlas-new-tab.zip")
    .then((res) => {
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);
      return res.blob();
    })
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "atlas-new-tab.zip";
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch((err) => alert(err.message));
}

const steps = [
  "Unzip the downloaded file.",
  "Open chrome://extensions in Chrome.",
  "Enable Developer mode (top right).",
  "Click Load unpacked and pick the unzipped folder.",
  "Open a new tab.",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Chrome Extension · Manifest V3
        </p>
        <h1 className="mt-3 text-4xl font-light tracking-tight">Atlas New Tab</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A quiet, editorial new tab page: cinematic live video wallpapers, four shortcut cards,
          workspace switching, Google search and a discreet assistant panel.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={download}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Download extension
          </button>
          <a
            href="/demo/index.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:bg-accent"
          >
            Open full-screen preview
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm">
          <iframe
            src="/demo/index.html"
            title="Atlas New Tab preview"
            className="block h-[620px] w-full"
          />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <section>
            <h2 className="text-sm font-semibold">Install</h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              {steps.map((s, i) => (
                <li key={s}>
                  <span className="mr-2 text-foreground">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="text-sm font-semibold">Make it yours</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                Replace the videos in <code>wallpapers/</code> keeping the names{" "}
                <code>wallpaper-1.mp4</code>, <code>wallpaper-2.mp4</code>,{" "}
                <code>wallpaper-3.mp4</code>.
              </li>
              <li>
                Edit cards, shortcuts, workspaces and the search engine in{" "}
                <code>config.js</code>.
              </li>
              <li>
                The assistant stays disabled until you set <code>AI_CONFIG.endpoint</code> — keep API
                keys on your own server, never in the extension.
              </li>
              <li>Only the storage permission is requested; everything else works offline.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
