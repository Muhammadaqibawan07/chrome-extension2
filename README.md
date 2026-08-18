# Haven Home

Build a completely original Chrome New Tab extension with a polished UI inspired by the clean usability of Android mobile interfaces and Windows 11, while creating its own unique visual identity.

IMPORTANT:

This must be a Chrome Extension using Manifest V3.

It must be designed as a New Tab replacement.

Make the entire extension functional, not just a visual mockup.

Keep the design modern, clean, artistic, and practical.

DO NOT make it futuristic.

DO NOT use cyberpunk aesthetics.

DO NOT use neon colors.

DO NOT make it look like an AI dashboard.

DO NOT add excessive glassmorphism.

DO NOT fill the screen with unnecessary widgets.

Avoid copying Android, Windows 11, or any existing application's exact UI.

Take inspiration from their usability and layout principles, but create an original design.

CORE VISUAL IDEA

Create a desktop New Tab interface that feels like:

Android home screen simplicity
+
Windows 11 desktop organization
+
Premium editorial design
+
Cinematic live wallpapers

The interface should feel like a carefully designed personal homepage rather than a normal browser start page.

Keep plenty of negative space.

LIVE WALLPAPER

The entire page should use a cinematic LIVE VIDEO wallpaper.

Use local video files rather than remote streaming.

Create a wallpaper system that supports high-quality video backgrounds.

The extension should have a folder such as:

extension/
wallpapers/
wallpaper-1.mp4
wallpaper-2.mp4
wallpaper-3.mp4

IMPORTANT:
I want to be able to change the wallpapers myself later simply by replacing the video files in the wallpaper folder while keeping the same filenames.

Do NOT hardcode the video into complicated JavaScript.

Use a clean wallpaper configuration system so I can easily understand where the videos are coming from.

The wallpaper should:

Play automatically.

Loop continuously.

Be muted.

Cover the entire viewport.

Preserve the video's aspect ratio.

Never stretch the video.

Use object-fit: cover.

Work correctly on 1920×1080, 2560×1440, and 3840×2160 displays.

Support 4K video files.

Use smooth transitions when switching between wallpapers.

Avoid unnecessary CPU/GPU usage.

Pause or reduce activity when the tab is not visible if appropriate.

Add a subtle readability overlay, but keep it extremely light.

I want the original colors of the video to remain visible.

Do NOT put a heavy black tint over the wallpaper.

WALLPAPER SWITCHING

Add a very small wallpaper control somewhere discreetly.

Allow switching between:

Wallpaper 01
Wallpaper 02
Wallpaper 03

The selected wallpaper should be saved using Chrome storage so the choice remains after restarting Chrome.

Make it possible to add more wallpapers later by editing the code.

CLOCK

Put a medium-sized clock in the TOP LEFT.

Use 12-hour format.

Example:

12:45 PM

Do NOT use:

13:45

The clock should:

Be clearly visible.

Not be huge.

Not be tiny.

Use elegant typography.

Display AM/PM.

Show the date underneath or beside it in a very subtle way.

Automatically update every minute.

Example:

12:45 PM
WED · 12 AUG

Keep the clock visually simple.

MAIN UI — FOUR CARDS

Create exactly four main cards.

Arrange them asymmetrically.

LEFT SIDE:

Two slightly larger cards stacked vertically.

RIGHT SIDE:

Two smaller cards stacked vertically.

The layout should roughly feel like:

┌─────────────────┐ ┌──────────────┐
│ │ │ │
│ CARD 01 │ │ CARD 03 │
│ LARGE │ │ SMALL │
│ │ └──────────────┘
│ │
└─────────────────┘ ┌──────────────┐
│ │
┌─────────────────┐ │ CARD 04 │
│ │ │ SMALL │
│ CARD 02 │ │ │
│ LARGE │ └──────────────┘
│ │
└─────────────────┘

Do NOT make them huge.

The cards should float naturally over the wallpaper.

CARD DESIGN

The cards should combine:

Android-style simplicity

Windows 11-like organization

Soft rounded corners

Subtle borders

Slight transparency

Clean typography

Small icons

Subtle hover animations

But do NOT simply copy Windows 11 Fluent Design.

Each card should have a clear purpose.

Example cards:

CARD 01:
Apps

CARD 02:
Favorites

CARD 03:
Quick Links

CARD 04:
Recent

The exact content should be easy to customize later.

When hovering over a card:

Slight movement.

Very subtle scale.

Slight shadow.

Smooth transition.

Do NOT use exaggerated animations.

APPS INSIDE CARDS

Allow application shortcuts inside the cards.

Each shortcut should contain:

Small icon.

Application/site name.

Clickable URL.

Examples:

YouTube
GitHub
Google
Discord
Gmail
Spotify

Make the shortcuts editable through the code.

Do not require a complicated database.

SEARCH BAR

Place the main Google search bar toward the BOTTOM CENTER of the page.

It should be:

Medium width.

Not enormous.

Not tiny.

Clean.

Rounded.

Slightly transparent.

Easy to read over the wallpaper.

Placeholder:

"Search Google..."

Pressing Enter should perform a Google search.

Do not make it look like the standard Google homepage.

SMALL AI CHAT

Add a small AI chat interface in the BOTTOM RIGHT corner.

IMPORTANT:
Keep it SMALL and discreet.

It should initially appear as a small circular or compact button.

When clicked, it expands into a small chat panel.

The panel should:

Open smoothly.

Have a simple input field.

Have a send button.

Display messages cleanly.

Not dominate the page.

Not look like a huge ChatGPT clone.

IMPORTANT:
Do not pretend that an AI backend exists if one has not been configured.

Create the UI and structure for the AI chat, but make the actual AI provider configurable.

Create a clearly marked configuration section in the code where an API endpoint or AI provider can later be connected.

Do NOT put an API key directly into the frontend code.

If no AI API is configured, show a simple message explaining that the AI assistant is not configured yet.

ORIGINAL UI ELEMENT

Add ONE or TWO small original interface ideas.

Do not add random widgets.

One idea:

A tiny "Quick Peek" button that expands a very small panel containing the user's most-used shortcuts.

Another idea:

A small horizontal "workspace strip" near the cards that lets the user switch between different shortcut layouts.

Keep these subtle.

WINDOWS 11 + ANDROID INFLUENCE

Use the following principles:

Android:

Simple hierarchy.

Easy touch-like interactions.

Compact shortcuts.

Clean icons.

Simple navigation.

Friendly spacing.

Windows 11:

Organized layout.

Rounded surfaces.

Desktop-like structure.

Clean typography.

Subtle transparency.

Consistent spacing.

But create a completely ORIGINAL interface.

Do not reproduce Windows 11's Start Menu.
Do not reproduce Android's home screen.
Do not use Microsoft's or Google's branding.

COLORS

The wallpaper should determine most of the visual atmosphere.

UI colors should automatically remain readable against different wallpapers.

Use mostly:

White

Off-white

Soft gray

Charcoal

Very subtle accent colors

Avoid:

Neon green

Neon purple

Cyberpunk blue

Excessive gradients

Rainbow effects

RESPONSIVENESS

Optimize the extension for:

1920×1080
2560×1440
3840×2160
1366×768

The four-card layout should adapt naturally to different screen sizes.

Do not allow cards to cover the clock.

Do not allow the search bar to overlap the cards.

Do not allow the AI chat to cover important UI.

PERFORMANCE

Because this is a video wallpaper:

Optimize video playback.

Do not create unnecessary animation loops.

Avoid excessive JavaScript.

Use CSS transitions where possible.

Use local assets.

Keep the UI lightweight.

Do not load huge libraries unnecessarily.

FILE STRUCTURE

Create a clean Chrome extension structure similar to:

extension/
manifest.json
index.html
style.css
app.js
assets/
icons/
wallpapers/
wallpaper-1.mp4
wallpaper-2.mp4
wallpaper-3.mp4

Only create files that are actually necessary.

The wallpaper files must be easy to find and replace.

IMPORTANT:
Make the wallpaper filenames clearly visible in the code/configuration so I can later replace:

wallpaper-1.mp4
wallpaper-2.mp4
wallpaper-3.mp4

without having to redesign the extension.

CHROME EXTENSION

Use Manifest V3.

The extension must replace Chrome's New Tab page.

Use:

chrome_url_overrides

where appropriate.

Use Chrome storage for user preferences such as:

Selected wallpaper

Selected shortcuts

UI preferences

Do not request unnecessary permissions.

FINAL REQUIREMENT

Before finishing:

Verify the Manifest V3 structure.

Verify the New Tab override.

Verify all buttons actually work.

Verify Google search works.

Verify the clock uses 12-hour time.

Verify video wallpapers loop.

Verify wallpaper switching works.

Verify the four-card layout works.

Verify the AI chat UI opens and closes.

Verify the extension works without an internet connection except for Google searches and any optional AI service.

Make the final project ready to load through Chrome's "Load unpacked" feature.

The final result should feel like a completely new type of desktop homepage:

Android simplicity + Windows 11 organization + cinematic manga/film-style live wallpaper + original editorial UI.

It should feel premium and creative, but NOT futuristic.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bf5edfeb-88a1-44c2-a4d9-a00f48a1e825).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
