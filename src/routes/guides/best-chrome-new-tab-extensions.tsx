import { Link, createFileRoute } from "@tanstack/react-router";
import { GuideFaq, GuidePage, InstallBox, Shot } from "@/components/site/guide";
import { guideHead, type Faq } from "@/lib/guides";

const PATH = "/guides/best-chrome-new-tab-extensions";
const HEADING = "Best Chrome new tab extensions";

const FAQ: Faq = [
  [
    "Can I use more than one new tab extension at once?",
    "No. Chrome lets only one extension control the new tab page at a time, usually the one installed or turned on most recently. To switch, turn the others off in chrome://extensions.",
  ],
  [
    "Do new tab extensions slow Chrome down?",
    "They can, because the page runs every time you open a tab. A plain page with shortcuts costs very little; video wallpapers, many widgets and network calls cost more. If tabs feel slow to open, try a still wallpaper or turn off widgets you don't use.",
  ],
  [
    "How do I get Chrome's default new tab back?",
    "Open chrome://extensions and switch the new tab extension off, or remove it. Chrome goes back to its own new tab page straight away.",
  ],
  [
    "Does Atlas work in Edge, Brave and other browsers?",
    "Atlas installs from the Chrome Web Store, so it works in Chromium browsers that accept Chrome Web Store extensions, such as Chrome, Edge, Brave, Opera and Vivaldi.",
  ],
  [
    "Is Atlas free?",
    "Yes. Shortcuts, workspaces, search, the Command Center, widgets, focus tools, themes and 4K still wallpapers are free, with no ads. Atlas Pro adds every live wallpaper, sync and backup, the site blocker, the private space and a few other tools, and new accounts can try Pro free first.",
  ],
];

export const Route = createFileRoute("/guides/best-chrome-new-tab-extensions")({
  head: () =>
    guideHead({
      path: PATH,
      title: "Best Chrome New Tab Extensions | Atlas",
      description:
        "Discover Chrome new tab extensions for customization, productivity, shortcuts, and beautiful wallpapers. Explore what Atlas offers.",
      heading: HEADING,
      image: "/media/guides/customize-theme.jpg",
      imageAlt: "Atlas new tab with glass shortcut cards and the Customize panel open on the Theme tab",
      faq: FAQ,
    }),
  component: Page,
});

function Page() {
  return (
    <GuidePage
      path={PATH}
      eyebrow="Guide"
      heading={HEADING}
      lede="You open a new tab dozens of times a day. A good new tab extension turns that blank page into something useful: your sites one click away, a faster way to search, and a background you like looking at. Here's what these extensions do, the main kinds, and how to choose."
    >
      <Shot
        src="/media/guides/customize-theme.jpg"
        alt="Atlas new tab page with a clock, weather, a glass card of app shortcuts and the Customize panel showing theme presets"
        caption="Atlas with the Customize panel open: theme presets, colours and glass settings."
        eager
      />

      <h2>What a Chrome new tab extension does</h2>
      <p>
        Chrome allows an extension to replace the page you see when you open a new tab. Instead of the default Google
        page, you get whatever the extension draws: shortcuts, a search bar, a clock, widgets, a wallpaper, or all of
        them. The extension runs that page locally, each time a tab opens.
      </p>
      <p>
        Two rules are worth knowing before you install one. Only <b>one</b> extension can own the new tab page at a time,
        and Chrome may ask you to confirm the change the first time. And because the page loads on every new tab, how
        light it is matters more than for most extensions.
      </p>

      <h2>What to look for</h2>
      <ul>
        <li>
          <b>Speed.</b> The page should appear the moment the tab opens. Heavy pages and slow network calls get old
          quickly.
        </li>
        <li>
          <b>Shortcuts that fit how you work.</b> A fixed grid of eight tiles suits some people; others want groups,
          folders or separate sets for work and home.
        </li>
        <li>
          <b>Search.</b> Check which engine it uses and whether you can change it. Some extensions switch you to a
          different search engine, so read the listing.
        </li>
        <li>
          <b>Customization.</b> Colours, layout, fonts and the background. See our{" "}
          <Link to="/guides/best-chrome-wallpaper-extensions">guide to Chrome wallpaper extensions</Link> if the
          background is what you care about most.
        </li>
        <li>
          <b>Widgets you will actually use.</b> Weather, to-dos, a focus timer and notes are handy; ten widgets you
          never open just add clutter.
        </li>
        <li>
          <b>Permissions and privacy.</b> The Chrome Web Store lists what an extension can access. Read the privacy
          policy to see what leaves your computer.
        </li>
        <li>
          <b>The price model.</b> Free, free with a paid plan, or ad-supported. Know which one before you set
          everything up.
        </li>
      </ul>

      <h2>The main kinds of new tab extensions</h2>
      <p>
        Most new tab extensions lean towards one of a few styles. None is better in general; it depends on what you want
        from the page.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Kind</th>
            <th scope="col">Good for</th>
            <th scope="col">Trade-offs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Minimal</b>
            </td>
            <td>A clean page with a clock, a search bar and little else</td>
            <td>Few shortcuts or tools; you may still need a bookmarks bar</td>
          </tr>
          <tr>
            <td>
              <b>Speed dial / bookmarks</b>
            </td>
            <td>Getting to the same sites fast, often in groups</td>
            <td>Can turn into a wall of tiles if you save everything</td>
          </tr>
          <tr>
            <td>
              <b>Wallpaper-first</b>
            </td>
            <td>A new picture or scene behind a simple page</td>
            <td>Large images or video use more data, memory and battery</td>
          </tr>
          <tr>
            <td>
              <b>Productivity dashboard</b>
            </td>
            <td>To-dos, focus timers, notes and goals where you can't miss them</td>
            <td>More to set up, and more on screen every time</td>
          </tr>
          <tr>
            <td>
              <b>All-in-one</b>
            </td>
            <td>Shortcuts, tools and wallpapers in one place, with most of it switchable</td>
            <td>Takes a few minutes to tune; needs good defaults to stay calm</td>
          </tr>
        </tbody>
      </table>

      <h2>Where Atlas fits</h2>
      <p>
        Atlas is an all-in-one new tab built to stay calm. It starts with a clock, a search bar and your shortcuts over a
        wallpaper, and everything else is a panel or a keystroke away. Here is what it includes today.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">What it does</th>
            <th scope="col">Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Shortcut cards and workspaces</b>
            </td>
            <td>Sites in glass cards, sorted into tabs such as Apps, Favorites and Reading, with separate workspaces</td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <b>Search</b>
            </td>
            <td>Uses your browser's search engine, with shortcuts such as !yt, !gh and !w for YouTube, GitHub and Wikipedia</td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <b>Command Center</b>
            </td>
            <td>
              <kbd>Ctrl</kbd> + <kbd>Space</kbd> finds any setting or tool by name
            </td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <b>Zen and Minimal modes</b>
            </td>
            <td>
              <kbd>Z</kbd> shows only a clock; <kbd>M</kbd> hides everything but search
            </td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <b>Widgets</b>
            </td>
            <td>Weather, a daily quote, now playing and translation</td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <b>Focus tools</b>
            </td>
            <td>Focus timer, reminders, notes and goals, and habits (three on the free plan)</td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <b>Themes and backgrounds</b>
            </td>
            <td>Eight theme presets, glass and colour settings, 4K still wallpapers, your own image, a colour or a gradient</td>
            <td>Free</td>
          </tr>
          <tr>
            <td>
              <b>Live wallpapers</b>
            </td>
            <td>Built-in and online video backgrounds (the default built-in one is free)</td>
            <td>Pro</td>
          </tr>
          <tr>
            <td>
              <b>Site blocker, private space, sync and backup</b>
            </td>
            <td>Block distracting sites, keep an encrypted private space, and keep settings in step across computers</td>
            <td>Pro</td>
          </tr>
        </tbody>
      </table>
      <p>
        Pro also adds an AI day planner with Google Calendar, 30-day screen-time stats and more saved tab sessions.
        Current prices are on the <a href="/#pricing">pricing section</a> of the home page.
      </p>

      <Shot
        src="/media/guides/search-engines.jpg"
        alt="Atlas search bar with a menu of search engines including Google, YouTube, GitHub, Wikipedia, ChatGPT and Amazon, over an evening city wallpaper"
        caption="Search from the new tab and switch where it searches with a shortcut."
      />

      <h3>What to weigh up</h3>
      <ul>
        <li>
          Atlas asks for access to the sites you visit. That's because custom cursors, page translation and the
          now-playing widget work on other pages, not only on the new tab. The{" "}
          <Link to="/privacy">privacy policy</Link> lists what is stored and what leaves your computer.
        </li>
        <li>
          Live video wallpapers look great but use more power than a still image. Our page on{" "}
          <Link to="/features/live-wallpapers">live wallpapers and performance</Link> explains the trade-off and how
          Atlas keeps it small.
        </li>
        <li>An account is only needed for Pro, sync and backup. Everything else works signed out.</li>
      </ul>

      <h2>How to install and set up Atlas</h2>
      <ol>
        <li>Open the Atlas page on the Chrome Web Store and choose <b>Add to Chrome</b>.</li>
        <li>Open a new tab. If Chrome asks whether to keep the new page, choose to keep it.</li>
        <li>
          Open <b>Customize</b> and pick a theme preset under <b>Theme</b>. The accent colour, text colour and glass tint
          can all be changed.
        </li>
        <li>
          Under <b>Background</b>, choose a built-in wallpaper, browse the online library, or upload your own picture.
        </li>
        <li>Add your sites to the shortcut cards with the <b>+</b> button, and group them into tabs.</li>
        <li>
          Press <kbd>Ctrl</kbd> + <kbd>Space</kbd> any time to find a setting or tool by name.
        </li>
      </ol>

      <InstallBox title="Try Atlas on your next tab">
        Free to install, no ads, and you can turn it off from chrome://extensions at any time.
      </InstallBox>

      <GuideFaq items={FAQ} />
    </GuidePage>
  );
}
