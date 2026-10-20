import { Link, createFileRoute } from "@tanstack/react-router";
import { GuideFaq, GuidePage, InstallBox, Shot } from "@/components/site/guide";
import { guideHead, type Faq } from "@/lib/guides";

const PATH = "/features/live-wallpapers";
const HEADING = "Live wallpapers for Chrome's new tab";

const FAQ: Faq = [
  [
    "What is a live wallpaper in Chrome?",
    "A short looping video that plays, muted, behind your new tab page. Chrome itself only supports still backgrounds on its new tab, so live wallpapers come from extensions such as Atlas.",
  ],
  [
    "Do live wallpapers drain the battery?",
    "They use more power than a still image, because the video has to be decoded for every frame while the tab is on screen. Atlas pauses the video whenever the tab is hidden, but on a laptop running on battery a still wallpaper or a plain colour is the lighter choice.",
  ],
  [
    "Can I use my own video as a wallpaper?",
    "Yes. In Customize › Background, choose My file and pick a video from your computer. MP4 is the safest choice; any format Chrome can play will work. The file stays in your browser on that computer.",
  ],
  [
    "Are live wallpapers free in Atlas?",
    "The default built-in live wallpaper is free. The other built-in and online live wallpapers are part of Atlas Pro, and new accounts can try Pro free before paying. Still wallpapers, colours, gradients and your own uploads are free.",
  ],
  [
    "Do live wallpapers work offline?",
    "Your own uploaded video does. Built-in and online live wallpapers are streamed the first time; Atlas then keeps the last few you used on disk, so they don't need downloading again.",
  ],
];

export const Route = createFileRoute("/features/live-wallpapers")({
  head: () =>
    guideHead({
      path: PATH,
      title: "Live Wallpaper Chrome Extension | Atlas",
      description:
        "Explore animated and dynamic backgrounds for your Chrome new tab with Atlas. Learn about wallpaper customization and browser performance.",
      heading: HEADING,
      image: "/media/guides/live-wallpaper.jpg",
      imageAlt: "An animated anime wallpaper with city lights behind the Atlas new tab and its assistant panel",
      faq: FAQ,
    }),
  component: Page,
});

/* a few of the clips the home page plays, as still frames */
const POSTERS = [
  ["meadow", "Meadow"],
  ["storm", "Storm"],
  ["halo", "Halo"],
  ["roses", "Roses"],
] as const;

function Page() {
  return (
    <GuidePage
      path={PATH}
      eyebrow="Feature"
      heading={HEADING}
      lede="Atlas can play a looping video behind your new tab: drifting clouds, rain on a city at night, a slow ocean. Here's what live wallpapers are, what Atlas supports today, and what they cost in memory and battery, so you can decide when they're worth it."
    >
      <Shot
        src="/media/guides/live-wallpaper.jpg"
        alt="Atlas new tab with an animated anime wallpaper of a character in front of blurred city lights, with the clock, weather and assistant panel on top"
        caption="A live wallpaper behind the Atlas new tab. The picture moves; the page on top works as usual."
        eager
      />

      <h2>What live wallpapers are</h2>
      <p>
        A live wallpaper is a short video that loops silently behind the new tab page. Some people call them animated or
        dynamic backgrounds. In Atlas, every live wallpaper is a real video file, played by Chrome's built-in video
        player, with your shortcuts, clock and search bar on top.
      </p>

      <h2>Static vs animated backgrounds</h2>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Still image</th>
            <th scope="col">Live video</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Look</b>
            </td>
            <td>Sharp, calm, nothing moves</td>
            <td>Motion and depth; the page feels alive</td>
          </tr>
          <tr>
            <td>
              <b>Download size</b>
            </td>
            <td>Usually a few megabytes at most</td>
            <td>Much larger; a 4K clip can run to 100 MB or more</td>
          </tr>
          <tr>
            <td>
              <b>Work while on screen</b>
            </td>
            <td>Drawn once</td>
            <td>Decoded frame by frame, using the graphics chip</td>
          </tr>
          <tr>
            <td>
              <b>Battery</b>
            </td>
            <td>Lowest</td>
            <td>Higher while the tab is visible</td>
          </tr>
          <tr>
            <td>
              <b>Best for</b>
            </td>
            <td>Laptops on battery, focus, older computers</td>
            <td>Desktops, plugged-in laptops, a page you enjoy opening</td>
          </tr>
        </tbody>
      </table>

      <h2>What Atlas supports today</h2>
      <ul>
        <li>
          <b>Built-in live wallpapers</b>: a set of looping clips chosen for Atlas. The default one is free for
          everyone.
        </li>
        <li>
          <b>An online live library</b>: search videos from Pixabay Videos and WallpaperWaves, with filters such as
          Nature, Space, Ocean, Cityscape and Abstract. Many are 4K. See the{" "}
          <Link to="/guides/best-chrome-wallpaper-extensions">wallpaper guide</Link> for every style.
        </li>
        <li>
          <b>Your own video</b>: upload a clip from your computer under <b>My file</b>.
        </li>
        <li>
          <b>Playback speed</b> from 25% to 200%, for a slower, calmer loop or a livelier one.
        </li>
        <li>
          <b>Brightness, blur and dim</b>, so the clock and shortcuts stay readable over a busy scene.
        </li>
        <li>
          <b>Schedules</b>: switch to a chosen wallpaper at set times of day, for example a sunrise clip in the morning
          and a night city after dark.
        </li>
        <li>
          <b>Favourites</b> and <b>Next / Previous wallpaper</b> commands in the Command Center.
        </li>
      </ul>

      <figure className="shot">
        <div className="poster-row">
          {POSTERS.map(([id, name]) => (
            <img key={id} src={`/media/wp/${id}.jpg`} alt={`Still frame from the ${name} live wallpaper`} width={800} height={450} loading="lazy" decoding="async" />
          ))}
        </div>
        <figcaption>
          Still frames from a few live wallpapers. The <a href="/#themes">theme picker on the home page</a> plays them.
        </figcaption>
      </figure>

      <h2>Performance: memory, battery and responsiveness</h2>
      <p>
        Playing video takes work, and a new tab page is opened a lot. Atlas is built to keep that cost down:
      </p>
      <ul>
        <li>
          <b>Paused when hidden.</b> The video stops whenever its tab isn't on screen, so ten open new tabs don't mean
          ten videos playing.
        </li>
        <li>
          <b>Background tabs wait.</b> A new tab opened behind others doesn't start downloading an online wallpaper until
          you switch to it.
        </li>
        <li>
          <b>Fast start, full quality later.</b> An online live wallpaper shows its thumbnail at once, then a lighter
          720p or 1080p clip within a second or two. The full file downloads behind it and takes over with a crossfade.
        </li>
        <li>
          <b>The right size for your screen.</b> On screens narrower than about 2K, Atlas keeps the full-HD copy rather
          than 4K, which looks the same there and is several times less to download and decode.
        </li>
        <li>
          <b>Cached on disk.</b> The last three live wallpapers are kept on your computer, so they play straight from
          disk next time instead of downloading again.
        </li>
        <li>
          <b>No blur over moving video.</b> Glass blur effects are redrawn on every frame of a video, so while a live
          wallpaper plays, panels switch to a frosted tint instead and the video keeps its frame rate.
        </li>
      </ul>
      <div className="note">
        <p>
          <b>Good to know:</b> Atlas doesn't switch to a still wallpaper on its own when your laptop is on battery or in
          power-saving mode, and the reduced-motion setting on your computer calms the interface but doesn't stop the
          video. If battery life matters, pick a still image, a colour or a gradient under Customize › Background. A
          memory or battery figure depends on your computer, the clip and its resolution, so try one and see how it
          feels.
        </p>
      </div>

      <h2>How to set up a live wallpaper</h2>
      <ol>
        <li>Install Atlas from the Chrome Web Store and open a new tab.</li>
        <li>
          Open <b>Customize</b> and go to <b>Background</b>.
        </li>
        <li>
          Choose <b>Built-in</b> and pick a clip, or choose <b>Online</b> and select the <b>Live</b> filter.
        </li>
        <li>
          Set <b>Playback speed</b>, then use <b>Dim</b> or <b>Blur</b> if the motion makes text harder to read.
        </li>
        <li>
          Optional: open <b>Schedule</b> to change wallpapers at set times.
        </li>
      </ol>
      <p>
        For the bigger picture, including shortcuts, search and focus tools, see our{" "}
        <Link to="/guides/best-chrome-new-tab-extensions">guide to Chrome new tab extensions</Link>.
      </p>

      <InstallBox title="See your new tab move">
        Install Atlas free. The default live wallpaper is included, and new accounts can try every live wallpaper with
        Atlas Pro.
      </InstallBox>

      <GuideFaq items={FAQ} />
    </GuidePage>
  );
}
