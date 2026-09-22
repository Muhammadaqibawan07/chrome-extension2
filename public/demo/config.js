/* ============================================================
   ATLAS NEW TAB — CONFIGURATION
   Everything you may want to change lives in this one file.
   ============================================================ */

/* ---------- 1. WALLPAPERS -------------------------------------
   Drop your own .mp4 files into  extension/wallpapers/
   Keep the same filenames and nothing else needs to change.
   To add more wallpapers, just append an entry to this list. */
const WALLPAPERS = [
  { id: "w1", label: "Wallpaper 01", file: "wallpapers/wallpaper-1.mp4" },
  { id: "w2", label: "Wallpaper 02", file: "wallpapers/wallpaper-2.mp4" },
  { id: "w3", label: "Wallpaper 03", file: "wallpapers/wallpaper-3.mp4" },
  { id: "w4", label: "Wallpaper 04", file: "wallpapers/wallpaper-4.mp4" },
  { id: "w5", label: "Wallpaper 05", file: "wallpapers/wallpaper-5.mp4" },
  { id: "w6", label: "Wallpaper 06", file: "wallpapers/wallpaper-6.mp4" },
];

/* ---------- 2. WORKSPACES + CARD CONTENT ----------------------
   Each workspace holds the 4 cards. Edit names, icons and URLs.
   "icon" is a single character / emoji shown in the tile.       */
const WORKSPACES = [
  {
    id: "personal",
    name: "Personal",
    cards: [
      {
        title: "Apps",
        hint: "Everyday",
        size: "large",
        items: [
          { name: "YouTube", url: "https://youtube.com", icon: "▶" },
          { name: "Gmail", url: "https://mail.google.com", icon: "✉" },
          { name: "Spotify", url: "https://open.spotify.com", icon: "♪" },
          { name: "Drive", url: "https://drive.google.com", icon: "▲" },
          { name: "Maps", url: "https://maps.google.com", icon: "◎" },
          { name: "Photos", url: "https://photos.google.com", icon: "◧" },
        ],
      },
      {
        title: "Favorites",
        hint: "Pinned",
        size: "large",
        items: [
          { name: "GitHub", url: "https://github.com", icon: "◆" },
          { name: "Reddit", url: "https://reddit.com", icon: "◕" },
          { name: "Discord", url: "https://discord.com", icon: "◍" },
          { name: "Notion", url: "https://notion.so", icon: "◨" },
          { name: "X", url: "https://x.com", icon: "✕" },
          { name: "Figma", url: "https://figma.com", icon: "❋" },
        ],
      },
      {
        title: "Quick Links",
        hint: "Jump to",
        size: "small",
        items: [
          { name: "Calendar", url: "https://calendar.google.com", icon: "▤" },
          { name: "Translate", url: "https://translate.google.com", icon: "文" },
          { name: "Weather", url: "https://weather.com", icon: "☂" },
        ],
      },
      {
        title: "Reading",
        hint: "Later",
        size: "small",
        items: [
          { name: "Wikipedia", url: "https://wikipedia.org", icon: "W" },
          { name: "Medium", url: "https://medium.com", icon: "M" },
          { name: "HN", url: "https://news.ycombinator.com", icon: "Y" },
        ],
      },
    ],
  },
  {
    id: "work",
    name: "Work",
    cards: [
      {
        title: "Workspace",
        hint: "Daily",
        size: "large",
        items: [
          { name: "GitHub", url: "https://github.com", icon: "◆" },
          { name: "Linear", url: "https://linear.app", icon: "▬" },
          { name: "Slack", url: "https://slack.com", icon: "◈" },
          { name: "Docs", url: "https://docs.google.com", icon: "▦" },
          { name: "Sheets", url: "https://sheets.google.com", icon: "▩" },
          { name: "Meet", url: "https://meet.google.com", icon: "◉" },
        ],
      },
      {
        title: "Build",
        hint: "Tools",
        size: "large",
        items: [
          { name: "Vercel", url: "https://vercel.com", icon: "▲" },
          { name: "Figma", url: "https://figma.com", icon: "❋" },
          { name: "MDN", url: "https://developer.mozilla.org", icon: "◐" },
          { name: "npm", url: "https://npmjs.com", icon: "❐" },
          { name: "Stack", url: "https://stackoverflow.com", icon: "❖" },
          { name: "Cloud", url: "https://console.cloud.google.com", icon: "☁" },
        ],
      },
      {
        title: "Quick Links",
        hint: "Jump to",
        size: "small",
        items: [
          { name: "Calendar", url: "https://calendar.google.com", icon: "▤" },
          { name: "Inbox", url: "https://mail.google.com", icon: "✉" },
          { name: "Notes", url: "https://keep.google.com", icon: "✎" },
        ],
      },
      {
        title: "Recent",
        hint: "Back to",
        size: "small",
        items: [
          { name: "Notion", url: "https://notion.so", icon: "◨" },
          { name: "Figma", url: "https://figma.com", icon: "❋" },
          { name: "GitHub", url: "https://github.com", icon: "◆" },
        ],
      },
    ],
  },
];

/* ---------- 3. SEARCH ------------------------------------------ */
const SEARCH_URL = "https://www.google.com/search?q=";

/* ---------- 4. AI ASSISTANT ------------------------------------
   By default the assistant is NOT configured and will politely say so.
   To connect a provider, host a small endpoint that holds your API key
   server-side (never put a key in this file) and set:

     AI_CONFIG.endpoint = "https://your-endpoint.example.com/chat";

   Your endpoint receives:  POST { messages: [{role, content}, ...] }
   and should reply with JSON: { reply: "..." }                    */
const AI_CONFIG = {
  endpoint: "", // <-- leave empty to keep the assistant disabled
  greeting: "Hi. Ask me anything once an assistant endpoint is connected.",
  notConfigured:
    "The assistant isn't connected yet. Add your endpoint URL in config.js (AI_CONFIG.endpoint) to enable replies.",
};
