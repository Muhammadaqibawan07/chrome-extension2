import { Link, createFileRoute } from "@tanstack/react-router";
import { GuideFaq, GuidePage, InstallBox, Shot } from "@/components/site/guide";
import { guideHead, type Faq } from "@/lib/guides";

const PATH = "/guides/new-tab-page";
const HEADING = "New tab page ideas that make Chrome worth opening";

const FAQ: Faq = [
  [
    "How do I make my Chrome new tab go to the homepage?",
    "Chrome does not let you make a fresh tab open your homepage with a built-in setting. The homepage setting controls the Home button, and startup settings control what opens when Chrome launches, but a new tab stays separate unless you use an extension that replaces it.",
  ],
  [
    "Can I set a custom new tab URL in Chrome?",
    "No, standard Chrome does not let you set a custom URL for a fresh tab by itself. If you want a specific site or dashboard to appear there, you usually need an extension, because startup pages and the Home button are different from what opens in a new tab.",
  ],
  [
    "What are new tab page cards?",
    "New tab page cards are clickable blocks that show sites, shortcuts, or small bits of information on the tab itself. Some are simple tiles for favorite pages, while others act more like widgets and can show tasks, notes, or other quick actions without leaving the page.",
  ],
  [
    "How do I change the new tab page on Microsoft Edge?",
    "To change the new tab page on Microsoft Edge, open a new tab, select the page settings menu, and choose the layout and content you want. If you want to replace the page more fully, you can use an extension from Edge Add-ons or a compatible Chrome extension if Edge allows it.",
  ],
];

export const Route = createFileRoute("/guides/new-tab-page")({
  head: () =>
    guideHead({
      path: PATH,
      title: "New Tab Page Ideas for Chrome That Are Worth Opening | Atlas",
      description:
        "What a useful Chrome new tab page should do, a checklist for judging extensions, and how to turn a blank tab into a fast, calm start page.",
      heading: HEADING,
      image: "/media/guides/search-engines.jpg",
      imageAlt: "Atlas new tab page with a search bar and a menu of search engines over an evening city wallpaper",
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
      lede="A useful new tab page should open as a working start page, not a blank pause between tasks. In Chrome, the right setup brings search, your usual sites, and a few calm tools together so the next step is obvious."
    >
      <Shot
        src="/media/guides/search-engines.jpg"
        alt="Atlas new tab page with a search bar and a menu of search engines including Google, YouTube, GitHub and Wikipedia over an evening city wallpaper"
        caption="A new tab that starts with search and your usual sites, over a calm wallpaper."
        eager
      />

      <p>
        That matters more than the wallpaper. A tab you open dozens of times should reduce friction, not add another
        screen to manage. The best versions keep common actions close, leave visual space to think, and stay quick
        enough that opening a tab still feels instant.
      </p>
      <p>
        This guide shows what a strong page should do, how to judge an extension before you install it, and how to tell
        the difference between a cosmetic refresh and a real daily tool.
      </p>

      <h2>What a new tab page should replace first</h2>
      <p>
        The first job is simple: remove the small delays between deciding what to do and starting it. A good tab should
        let you search, open a regular site, or return to a task without reaching for bookmarks, opening another menu,
        or scanning a crowded toolbar. When that path is short, the browser feels lighter.
      </p>
      <p>
        The second job is to lower friction across different kinds of work. Some tabs begin with a search. Others begin
        with a note, a timer, a translation, or the same few sites you visit every day. Putting those actions in one
        place means you stop rebuilding your starting point over and over.
      </p>
      <p>
        That is why a useful tab replaces more than the blank screen Chrome gives you. It can replace a bookmark folder,
        a sticky note, part of your toolbar, and some of the mental effort of remembering where to begin. The page
        becomes a small launchpad instead of empty space.
      </p>
      <p>
        It also helps to think in terms of the next task, not every possible task. If the page tries to show
        everything, it becomes another dashboard you ignore. If it shows the few things you reach for most, it becomes
        part of your flow.
      </p>
      <p>
        If you want to compare approaches before changing anything, this{" "}
        <Link to="/guides/best-chrome-new-tab-extensions">guide to Chrome new tab extensions</Link> can help you sort
        simple visual replacements from pages built for daily work.
      </p>

      <h2>Use this checklist before you install an extension</h2>
      <h3>Speed</h3>
      <ul>
        <li>It opens cleanly, with no obvious pause before the page is ready.</li>
        <li>Search is available straight away, without forcing extra clicks.</li>
        <li>Your main shortcuts are visible at a glance, not hidden in menus or side panels.</li>
      </ul>
      <h3>Usefulness</h3>
      <ul>
        <li>The page helps with real tasks you repeat, such as search, notes, timers, reminders, or quick site access.</li>
        <li>The layout stays readable when you have only the essentials turned on.</li>
        <li>It feels like a starting point for work, not just a decorated background.</li>
      </ul>
      <h3>Control</h3>
      <ul>
        <li>You can remove widgets you do not need, so the page does not become cluttered.</li>
        <li>Shortcuts are easy to edit, reorder, and replace as your routine changes.</li>
        <li>Visual settings can be tuned without making text hard to read.</li>
      </ul>
      <h3>Trust</h3>
      <ul>
        <li>
          The extension explains what it changes and does not ask for permissions that seem unrelated to a tab page.
        </li>
        <li>Settings are easy to understand, so you know what will happen before you turn something on.</li>
        <li>If the extension adds productivity tools, those tools stay quiet until you need them.</li>
      </ul>
      <p>Copy this list into a note before you browse the store. It makes weak options easier to spot.</p>

      <h2>Choose features that match how you browse every day</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">If you often start with...</th>
            <th scope="col">Choose features like...</th>
            <th scope="col">Best for...</th>
            <th scope="col">Skip if...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>A search and a few regular sites</b>
            </td>
            <td>Fast search box, editable shortcuts, clean layout</td>
            <td>People who want less friction without changing much</td>
            <td>You need timers, notes, or blockers on the page</td>
          </tr>
          <tr>
            <td>
              <b>Ongoing work across several sites</b>
            </td>
            <td>Pinned shortcuts, recent pages, quick commands</td>
            <td>Admin tasks, research, and daily routines</td>
            <td>You prefer a very minimal screen</td>
          </tr>
          <tr>
            <td>
              <b>Focused work sessions</b>
            </td>
            <td>Timer, reminders, habits, site controls</td>
            <td>Deep work, study, and task sprints</td>
            <td>You only want a visual refresh</td>
          </tr>
          <tr>
            <td>
              <b>Capturing things before you forget them</b>
            </td>
            <td>Notes, to-do items, small widgets</td>
            <td>Busy tabs, quick planning, light personal systems</td>
            <td>You already keep another tool open all day</td>
          </tr>
          <tr>
            <td>
              <b>A calmer mood when the browser opens</b>
            </td>
            <td>Still or moving wallpaper, brightness and blur controls, readable overlays</td>
            <td>People who value atmosphere as well as function</td>
            <td>Visuals matter more than speed or text clarity</td>
          </tr>
        </tbody>
      </table>
      <p>
        The table shows how to match a browsing habit to the smallest feature set that will actually help; for more
        visual-first options, see this{" "}
        <Link to="/guides/best-chrome-wallpaper-extensions">Chrome wallpaper extensions guide</Link>.
      </p>

      <h2>How Atlas turns a new tab into a working dashboard</h2>
      <p>
        A cosmetic tab changes the look of Chrome. A working dashboard changes what happens in the first few seconds
        after you open it. The practical test is simple: can you search, launch a site, check the time, and return to
        your next task without hunting around the browser? If the answer is yes, the tab is doing real work.
      </p>
      <p>
        That is the gap a page with <Link to="/features/live-wallpapers">live wallpapers for Chrome's new tab</Link>{" "}
        needs to handle well. Motion can make a tab feel calmer, but only if the useful parts stay readable and close at
        hand. Atlas plays a short, silently looping video behind the new tab page, with shortcuts, a clock and a search
        bar on top. That setup matters because the background stays in the background while the core actions remain
        visible.
      </p>

      <Shot
        src="/media/guides/live-wallpaper.jpg"
        alt="Atlas new tab with a looping anime wallpaper behind the clock, weather and assistant panel"
        caption="The live wallpaper stays behind the clock, search and shortcuts."
      />

      <p>
        The difference becomes clearer over a normal day. A decorative page gives you a nice image, then sends you back
        to the same old mix of bookmarks, pinned tabs, and half-remembered to-dos. A productive page lets the tab itself
        carry part of that load.
      </p>
      <p>
        When you test one, look for small signs of discipline. The text should stay easy to read. Shortcuts should be
        editable without effort. Useful tools should feel close, but not noisy. If the page can hold those tensions
        well, it becomes a dashboard instead of just a skin.
      </p>

      <h2>Why Atlas is the better fit when you want more than a background</h2>
      <p>Choose a simple visual extension if all you want is a nicer background and a short list of links.</p>
      <p>
        The first reason is fit. Many people do not need another task app, but they do need a better starting point
        inside the browser they already use all day. That is where a page designed as{" "}
        <Link to="/">a new tab finally worth opening</Link> makes sense. It keeps the opening action fast. It also
        leaves room for a few tools you would otherwise scatter across tabs, notes, and browser menus.
      </p>
      <p>
        The second reason is range without forcing clutter. Atlas provides a free new tab extension for Chrome with live
        4K wallpapers, a command center, a focus timer, reminders, habits, a site blocker and translation. It also
        offers online live wallpapers searchable from Pixabay Videos and WallpaperWaves, with filters including Nature,
        Space, Ocean, Cityscape and Abstract. Atlas offers 7 days of Pro free. That is a useful mix for people who want
        one calm page for quick launches and light planning.
      </p>

      <InstallBox title="Try Atlas on your next tab">
        Try Atlas if you want a new tab page that helps you search, focus, and plan without losing the speed of a fresh
        tab.
      </InstallBox>

      <GuideFaq items={FAQ} />
    </GuidePage>
  );
}
