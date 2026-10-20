import { Link, createFileRoute } from "@tanstack/react-router";
import { GuideFaq, GuidePage, InstallBox, Shot } from "@/components/site/guide";
import { guideHead, type Faq } from "@/lib/guides";

const PATH = "/guides/best-chrome-wallpaper-extensions";
const HEADING = "Best Chrome wallpaper extensions";

/* the filters in Customize › Background › Online library (extension/library.js) */
const STYLES: [string, boolean][] = [
  ["Nature", true],
  ["Mountains", true],
  ["Forest", true],
  ["Ocean", true],
  ["Sunset", true],
  ["Snow", true],
  ["Space", true],
  ["Cityscape", true],
  ["Abstract", true],
  ["Cyberpunk", true],
  ["Cars", true],
  ["Anime", false],
  ["Minimal", false],
  ["Dark", false],
  ["Fantasy", false],
  ["Architecture", false],
  ["Games", false],
];

const FAQ: Faq = [
  [
    "Can I use my own photo as the Chrome new tab background?",
    "Yes. In Atlas, open Customize › Background, choose My file and pick an image or a video from your computer. It's kept in your browser on that computer.",
  ],
  [
    "Are the wallpapers in Atlas free?",
    "The 4K and HD still wallpapers in the online library are free for everyone, as are colours, gradients and your own uploads. Live video wallpapers are part of Atlas Pro, apart from the default built-in one.",
  ],
  [
    "Does the wallpaper change by itself?",
    "Only if you ask it to. Atlas keeps the wallpaper you pick. With a schedule (Customize › Background › Schedule) it switches to a chosen wallpaper at set times, for example a bright one in the morning and a dark one at night.",
  ],
  [
    "Where do the online wallpapers come from?",
    "Still images come from Wallhaven, filtered to safe-for-work pictures of at least 1920×1080. Live wallpapers come from Pixabay Videos and WallpaperWaves. They're shown from those sites' own servers, and each one keeps its credit.",
  ],
  [
    "Will a wallpaper make my text hard to read?",
    "It can, which is why Atlas has brightness, blur and dim sliders for the background. Dim or blur a busy picture until the clock and shortcuts stand out.",
  ],
];

export const Route = createFileRoute("/guides/best-chrome-wallpaper-extensions")({
  head: () =>
    guideHead({
      path: PATH,
      title: "Best Chrome Wallpaper Extensions | Atlas",
      description:
        "Find Chrome wallpaper extensions that make your new tab more personal with beautiful backgrounds, customization options, and useful features.",
      heading: HEADING,
      image: "/media/guides/wallpaper-library.jpg",
      imageAlt: "The Atlas online wallpaper library showing 4K and live wallpapers next to an anime wallpaper on the new tab",
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
      lede="A wallpaper is the first thing you see on every new tab. The right extension gives you sharp pictures that load fast, plenty to choose from, and the controls to keep your shortcuts readable on top. Here's how these extensions work and what separates a good one from a slow one."
    >
      <Shot
        src="/media/guides/wallpaper-library.jpg"
        alt="Atlas Customize panel on the Background tab, listing 3840×2160 wallpapers, several marked Live, beside a red-eyed anime wallpaper"
        caption="The online library in Customize › Background. Wallpapers marked Live are videos."
        eager
      />

      <h2>How Chrome wallpaper extensions work</h2>
      <p>
        A wallpaper extension replaces Chrome's new tab page with its own page and draws a picture behind it. The
        pictures come from one of three places: files bundled with the extension, an online collection the extension
        fetches from, or images you upload yourself.
      </p>
      <p>
        If all you want is one still photo, Chrome's own new tab can do that: open a new tab, choose <b>Customize
        Chrome</b> and pick a background. Extensions are worth it when you want more: a larger library, higher
        resolutions, video wallpapers, scheduling, or a different layout on top.
      </p>

      <h2>What makes a good wallpaper extension</h2>
      <ul>
        <li>
          <b>Resolution that matches your screen.</b> A 1920×1080 image looks soft on a 4K monitor. Look for a 4K
          option if your screen is large, and HD if it isn't; there's no benefit to downloading more pixels than you can
          see.
        </li>
        <li>
          <b>Fast loading.</b> The new tab should feel instant. Good extensions show a small preview first, cache what
          you use, and avoid fetching the same large file again and again.
        </li>
        <li>
          <b>Readability controls.</b> Busy pictures make text hard to read. Brightness, blur and dim sliders fix that
          without changing the wallpaper.
        </li>
        <li>
          <b>Variety and search.</b> Categories are a good start; a search box lets you find exactly the scene you want.
        </li>
        <li>
          <b>Control over changes.</b> Some people want a new picture every tab; others want one that stays put. Check
          which the extension does, and whether you can change it.
        </li>
        <li>
          <b>Clear sources.</b> Know where pictures come from, whether they're filtered for safe content, and whether
          the creators get credit.
        </li>
      </ul>

      <h2>Wallpaper styles you can choose in Atlas</h2>
      <p>
        The Atlas online library has a filter for each style below, plus All, 4K, Live and your Favourites. Every style
        has still images; the ones marked below also include live video wallpapers. You can type your own search too,
        such as "rain" or "lighthouse".
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Style</th>
            <th scope="col">Still (HD and 4K)</th>
            <th scope="col">Live video</th>
          </tr>
        </thead>
        <tbody>
          {STYLES.map(([name, live]) => (
            <tr key={name}>
              <td>
                <b>{name}</b>
              </td>
              <td>Yes</td>
              <td>{live ? "Yes" : "Search only"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        "Search only" means the style's filter shows still images, but you can still search the live library for it by
        name. What appears depends on what the sources have at the time.
      </p>

      <h2>Atlas's wallpaper features</h2>
      <h3>Five kinds of background</h3>
      <ul>
        <li>
          <b>Built-in</b>: Atlas's own live wallpapers.
        </li>
        <li>
          <b>Online</b>: the searchable library of HD and 4K stills from Wallhaven and live wallpapers from Pixabay Videos and
          WallpaperWaves.
        </li>
        <li>
          <b>My file</b>: any image or video from your computer.
        </li>
        <li>
          <b>Colour</b> or <b>Gradient</b>: a plain background, with your choice of colours and gradient angle.
        </li>
      </ul>
      <h3>Settings that keep it readable</h3>
      <p>
        Brightness, blur and dim apply to any wallpaper, and playback speed applies to video. The eight theme presets
        (Sand, Ocean, Rose, Mint, Violet, Ember, Lime and Mono) change the accent colour and glass tint to suit the
        picture.
      </p>
      <h3>Favourites and schedules</h3>
      <p>
        Star a wallpaper to keep it in Favourites; with an account, favourites follow you to other computers. A
        schedule switches wallpapers at the times you set. You can also step through the wallpapers with the "Next
        wallpaper" and "Previous wallpaper" commands in the Command Center (<kbd>Ctrl</kbd> + <kbd>Space</kbd>).
      </p>
      <h3>How it stays quick</h3>
      <p>
        Thumbnails in the library load lazily, and a new wallpaper fades in only once it's ready, so you never see a
        half-drawn picture. Live wallpapers have extra tricks to keep loading fast, covered in our page on{" "}
        <Link to="/features/live-wallpapers">how Atlas handles live wallpapers</Link>.
      </p>

      <div className="note">
        <p>
          <b>What's free:</b> every still wallpaper in the library, colours, gradients and your own uploads. Live video
          wallpapers are part of Atlas Pro (the default built-in one is free), and new accounts can try Pro free first.
          See <a href="/#pricing">pricing</a> for details.
        </p>
      </div>

      <h2>How to set a wallpaper in Atlas</h2>
      <ol>
        <li>Install Atlas from the Chrome Web Store and open a new tab.</li>
        <li>
          Open <b>Customize</b> and go to the <b>Background</b> tab.
        </li>
        <li>
          Choose <b>Online</b>, then pick a style such as Nature or 4K, or type a search.
        </li>
        <li>Click a wallpaper to use it. Click the star to keep it in Favourites.</li>
        <li>
          Adjust <b>Brightness</b>, <b>Blur</b> and <b>Dim</b> until your shortcuts and clock are easy to read.
        </li>
        <li>
          To use your own picture, choose <b>My file</b> and select an image.
        </li>
      </ol>

      <p>
        Wallpapers are only part of a new tab. If you're also comparing shortcuts, search and productivity tools, read
        our <Link to="/guides/best-chrome-new-tab-extensions">guide to choosing a Chrome new tab extension</Link>.
      </p>

      <InstallBox title="Put a 4K wallpaper on your new tab">
        Atlas is free to install, and every still wallpaper in the library is free to use.
      </InstallBox>

      <GuideFaq items={FAQ} />
    </GuidePage>
  );
}
