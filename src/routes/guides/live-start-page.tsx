import { Link, createFileRoute } from "@tanstack/react-router";
import { GuideFaq, GuidePage, InstallBox, Shot } from "@/components/site/guide";
import { guideHead, type Faq } from "@/lib/guides";

const PATH = "/guides/live-start-page";
const HEADING = "Live Start Page choices that feel polished and useful";

const FAQ: Faq = [
  [
    "What is the best place to get live wallpapers?",
    "The best place to get live wallpapers is from a source that gives you control, not just a gallery. For Chrome users, that usually means a new tab extension that lets you preview the look, adjust the motion, and keep text and shortcuts readable over the background.",
  ],
  [
    "What are the downsides of having a live wallpaper?",
    "The main downsides are distraction, higher battery use, and a page that can feel heavier if the motion is too strong. The safer choice is a setup with pause, dim, and blur controls, so the wallpaper stays in the background and the page still feels fast.",
  ],
  [
    "Can Windows PC have live wallpaper?",
    "Yes, a Windows PC can have a live wallpaper through desktop apps, browser extensions, or specific built-in options. The key difference is where the motion appears: across the desktop itself or only inside Chrome when you open a new tab.",
  ],
  [
    "Why won't my phone let me have a live wallpaper?",
    "Usually, your phone will not allow a live wallpaper because the device, launcher, or battery settings do not support it. Power-saving modes often disable motion, and some phones allow live backgrounds on the home screen but not on the lock screen.",
  ],
];

export const Route = createFileRoute("/guides/live-start-page")({
  head: () =>
    guideHead({
      path: PATH,
      title: "Live Start Page for Chrome: Polished and Useful Choices | Atlas",
      description:
        "What a Live Start Page should do in Chrome, which features to compare before you install, and how to keep a live wallpaper new tab fast and readable.",
      heading: HEADING,
      image: "/media/guides/live-wallpaper.jpg",
      imageAlt: "A Live Start Page in Chrome: an animated anime wallpaper behind the Atlas clock, weather and assistant panel",
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
      lede="A Live Start Page turns Chrome's blank new tab into a dashboard you can actually use. The good ones keep search, shortcuts, and a few daily tools close without making the tab feel crowded."
    >
      <Shot
        src="/media/guides/live-wallpaper.jpg"
        alt="Atlas Live Start Page with an animated anime wallpaper in front of blurred city lights, with the clock, weather and assistant panel on top"
        caption="A quietly looping wallpaper behind the clock, search and shortcuts."
        eager
      />

      <p>
        Some versions add a still image or a quietly looping video behind the basics. That can feel polished, but only
        if the page stays fast, readable, and easy to act from. This guide shows what to expect, what to compare, and
        how to tell the difference between a useful setup and a flashy one.
      </p>

      <h2>Start with a dashboard, not just a wallpaper</h2>
      <p>
        A good new tab should shorten the gap between opening Chrome and doing the next thing. Before you compare
        styles, make sure the page covers the basics: instant search, dependable shortcuts, clear text, and enough
        control to remove anything you do not use.
      </p>
      <p>
        It should also stay useful after the first glance. That means editable tiles, easy keyboard use, and tools that
        support the page you are about to open, not just the page you are leaving. For a broader set of options,
        compare a few <Link to="/guides/best-chrome-new-tab-extensions">Chrome new tab extensions</Link> side by side.
        Atlas translates pages as they load and lets users show the original quickly, which is a good example of a
        feature that helps with the next step instead of decorating the current one.
      </p>

      <h2>Compare the features that matter before you install</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">What to compare</th>
            <th scope="col">Useful when</th>
            <th scope="col">Red flag</th>
            <th scope="col">What to check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Animated wallpaper or video</b>
            </td>
            <td>Motion stays behind the tools and sets a calm tone</td>
            <td>The background pulls your eye away from search and shortcuts</td>
            <td>Can you dim, blur, pause, or swap it easily?</td>
          </tr>
          <tr>
            <td>
              <b>Tiles or speed dial</b>
            </td>
            <td>You open the same sites often and want fewer clicks</td>
            <td>Cards are oversized, fixed, or awkward to edit</td>
            <td>Can you rename, reorder, and remove them without friction?</td>
          </tr>
          <tr>
            <td>
              <b>Quick access and search</b>
            </td>
            <td>You want the first keystroke to start work</td>
            <td>Search feels delayed or overrides your usual habits</td>
            <td>Does typing work right away, and can you keep your preferred search flow?</td>
          </tr>
          <tr>
            <td>
              <b>Widgets and notes</b>
            </td>
            <td>The info changes through the day and affects what you do next</td>
            <td>The page turns into a wall of small panels</td>
            <td>Can you hide each widget and keep only the ones you use?</td>
          </tr>
          <tr>
            <td>
              <b>Local weather and background library</b>
            </td>
            <td>A quick glance helps, or you like changing scenes</td>
            <td>The extension feels built around looks alone</td>
            <td>Does it still feel useful when the visuals are toned down?</td>
          </tr>
        </tbody>
      </table>
      <p>
        This table shows how to judge motion, shortcuts, and widgets by function first; if visuals are your main focus,
        compare a few <Link to="/guides/best-chrome-wallpaper-extensions">Chrome wallpaper extensions</Link>{" "}
        separately.
      </p>

      <h2>What a Live Start Page changes in Chrome</h2>
      <p>
        A live new tab changes Chrome in a small but noticeable way. Instead of a flat pause between tasks, you get a
        page that can hold your bearings: where to search, where your regular sites are, and what needs attention before
        you open the next tab.
      </p>
      <p>
        That works best when the layout stays steady and the movement stays secondary. Atlas plays a short, silently
        looping video behind the new tab page, with shortcuts, a clock and a search bar on top. The useful part is not
        the motion by itself. It is the layering: the foreground keeps the core actions fixed, while the background adds
        texture without taking over the page.
      </p>

      <Shot
        src="/media/guides/wallpaper-library.jpg"
        alt="Atlas Customize panel on the Background tab listing 4K wallpapers, several marked Live, beside an anime wallpaper"
        caption="Pick a live or still background, then tune brightness, blur and dim so text stays readable."
      />

      <h2>Choose the tools that earn their space</h2>
      <ul>
        <li>
          Keep reminders in the new tab only if you actually act on them before opening mail, chat, or another site.
        </li>
        <li>Add habits only when the check is simple and quick; if it needs explanation, it belongs elsewhere.</li>
        <li>Use notes for capture, not storage; if a thought needs structure, move it into a proper document.</li>
        <li>Show goals only when they guide today's choices; broad ambitions can become wallpaper in the bad sense.</li>
        <li>Use a day planner when your work starts in the browser and you switch between sites throughout the day.</li>
        <li>Add translation if you often read pages in another language and want less copying and pasting.</li>
        <li>Skip custom cursors unless they improve visibility; most change the look more than the experience.</li>
      </ul>

      <h2>Why Atlas is the practical pick for Chrome users</h2>
      <p>It fits people who want a polished new tab that stays useful after the first few days.</p>
      <p>
        The deciding points are simple: the layout keeps the basics close, the background supports the page instead of
        dominating it, and the extra tools feel built into the flow rather than bolted on. You can see the overall
        approach on the <Link to="/">Chrome start page home</Link>. Try{" "}
        <Link to="/features/live-wallpapers">Atlas's live wallpapers for Chrome's new tab</Link> and see whether a Live
        Start Page can stay useful every day.
      </p>

      <InstallBox title="Try a Live Start Page in Chrome">
        Free to install, no ads, and you can turn it off from chrome://extensions at any time.
      </InstallBox>

      <GuideFaq items={FAQ} />
    </GuidePage>
  );
}
