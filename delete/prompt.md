# Task: Add 3 SEO Landing Pages to Atlas Without Changing the Existing Design

## Project Context

Website: https://atlas.aqibawan.com/

Atlas is a Chrome new-tab extension website built with React. The existing homepage is already designed and deployed. I want to improve organic Google rankings by adding three high-quality SEO landing pages while preserving the current design system, branding, and functionality.

## Primary Requirements

1. Inspect the existing project before making changes.
2. Identify the React framework, routing setup, styling system, reusable components, build tooling, and deployment configuration.
3. Reuse the existing design system, including typography, colors, backgrounds, spacing, buttons, navigation, animations, and responsive layouts.
4. Do not redesign or unnecessarily modify the existing homepage.
5. Do not migrate the project to Next.js or another framework unless absolutely necessary. Prefer the smallest compatible solution.
6. Do not add a backend, database, paid API, or unnecessary dependencies.
7. Implement all three pages as real, independently addressable URLs.
8. Ensure the pages contain useful, original content—not generic SEO filler or keyword stuffing.

## Page 1: Best Chrome New Tab Extensions

**URL:** `/best-chrome-new-tab-extensions/`

**SEO title:** Best Chrome New Tab Extensions in 2026 | Atlas

**Meta description:** Compare Chrome new tab extensions for wallpapers, customization, shortcuts, productivity, and a more personalized browsing experience.

**Primary keyword:** best Chrome new tab extensions

**Related keywords:**
- customizable Chrome new tab
- Chrome homepage extensions
- personalized new tab page
- Chrome new tab customization

### Content requirements

- Create a visually attractive hero section with a clear H1.
- Explain what Chrome new-tab extensions do and who benefits from them.
- Compare Atlas with relevant alternatives using consistent, factual criteria.
- Include a comparison table covering customization, wallpaper options, productivity features, and pricing where verified.
- Highlight Atlas's genuine strengths without making unsupported claims about competitors.
- Include a clear CTA to try or install Atlas, using the existing verified destination.
- Add a useful FAQ section.
- Include internal links to the homepage and the other relevant SEO pages.

## Page 2: Best Chrome Wallpaper Extensions

**URL:** `/best-chrome-wallpaper-extensions/`

**SEO title:** Best Chrome Wallpaper Extensions in 2026 | Atlas

**Meta description:** Explore Chrome wallpaper extensions for beautiful browser backgrounds, live wallpapers, customization, and a personalized new-tab experience.

**Primary keyword:** best Chrome wallpaper extensions

**Related keywords:**
- Chrome live wallpaper extension
- wallpaper for Chrome new tab
- customizable Chrome backgrounds
- aesthetic Chrome homepage

### Content requirements

- Create a visually engaging hero section that matches Atlas's existing visual identity.
- Explain the difference between static wallpapers and live wallpapers.
- Compare relevant wallpaper extensions using verified features and limitations.
- Discuss performance, resource usage, privacy, and customization where information is available.
- Use actual Atlas screenshots or existing project assets whenever possible.
- Include a CTA to try Atlas, with a verified destination.
- Add useful FAQs and internal links to the other pages.

Do not claim Atlas supports features that do not exist in the current product.

## Page 3: How to Customize Your Chrome Homepage

**URL:** `/customize-chrome-homepage/`

**SEO title:** How to Customize Your Chrome Homepage in 2026 | Atlas

**Meta description:** Learn how to personalize your Chrome new tab with wallpapers, shortcuts, backgrounds, and useful customization options.

**Primary keyword:** how to customize Chrome homepage

**Related keywords:**
- customize Chrome new tab
- personalized browser homepage
- Chrome new tab wallpaper
- aesthetic browser homepage

### Content requirements

- Write a practical, step-by-step guide for beginners.
- Explain Chrome's built-in customization options.
- Explain how a new-tab extension can provide additional customization.
- Demonstrate the Atlas setup process using the actual product workflow.
- Use real screenshots if available; do not fabricate UI screenshots.
- Explain any required installation or permission steps accurately.
- Add a clear CTA to try Atlas.
- Include useful FAQs and links to the other SEO pages.

## Design Requirements

The new pages must look like natural extensions of the existing Atlas website.

- Inspect and reuse existing layout, navigation, footer, buttons, cards, typography, colors, and spacing.
- Preserve the current premium, polished visual style.
- Maintain existing dark/light theme behavior if supported.
- Use responsive layouts for desktop, tablet, and mobile.
- Use existing image and animation assets wherever appropriate.
- Avoid generic template styling or unnecessary visual redesigns.
- Avoid adding excessive animations that harm performance.
- Reuse existing components rather than duplicating code.
- Keep the pages visually consistent with the existing homepage.

## Technical SEO Requirements

Implement and verify the following for every page:

1. Unique, descriptive HTML title.
2. Unique meta description.
3. One clear, descriptive H1.
4. Logical H2/H3 hierarchy.
5. Correct canonical URL using `https://atlas.aqibawan.com`.
6. Crawlable internal links using normal anchor elements with valid `href` attributes.
7. Open Graph title, description, and image where appropriate.
8. Appropriate image alt text.
9. Indexable page content and correct robots directives.
10. HTTP 200 response for valid routes.
11. Correct 404 behavior for unknown routes where supported.
12. Updated XML sitemap containing all canonical, indexable pages.
13. Correct robots.txt configuration without accidentally blocking important content.

Use the existing SEO library if one is already installed. Otherwise, select a lightweight, compatible solution only if needed.

### Critical: Rendering and Indexing

Inspect whether the current project uses Vite, React Router, client-side rendering, SSR, or prerendering.

Do not assume that creating React routes automatically makes their content available in the initial HTML.

If the site currently uses client-side rendering, implement a compatible prerendering approach for these three SEO pages and the homepage where feasible, without breaking the existing interactive application.

Verify that the production HTML for each URL includes its own title, description, canonical URL, H1, and meaningful main content before client-side JavaScript executes.

Ensure the existing hosting configuration serves the generated HTML for the correct routes instead of returning the same empty application shell for every URL.

If full prerendering is incompatible with the current setup, explain the limitation and implement the safest minimal alternative. Do not silently claim that prerendering or indexing works without verifying it.

## Structured Data

Where appropriate, implement valid JSON-LD structured data:

- `Article` for editorial comparison or guide pages.
- `BreadcrumbList` for page navigation.

Use only accurate, visible page information. Do not add fabricated ratings, reviews, aggregate scores, or unsupported claims.

Validate structured data where practical. Structured data does not guarantee rich results or higher rankings.

## Content Quality Rules

- Write natural, helpful English for a worldwide audience.
- Focus on the reader's intent rather than repeating keywords.
- Use factual, verifiable comparisons.
- Do not invent competitor features, prices, ratings, or performance claims.
- Do not generate fake testimonials.
- Do not create doorway pages or duplicate content.
- Do not promise top Google rankings.
- Use 2026 in titles only when the content is maintained and genuinely current.
- Do not publish placeholder content or empty sections.

## Performance and Accessibility

- Preserve existing functionality.
- Optimize images and avoid unnecessarily large assets.
- Lazy-load below-the-fold images where appropriate.
- Use semantic HTML and accessible link/button labels.
- Maintain keyboard navigation and visible focus states.
- Avoid unnecessary JavaScript and dependencies.
- Respect reduced-motion preferences where animations are used.

## Testing and Verification

After implementation:

1. Run the project's existing lint, type-check, build, and test commands where available.
2. Fix any issues introduced by these changes.
3. Test direct navigation to all three URLs.
4. Test page refreshes and internal navigation.
5. Verify that the existing homepage still works as before.
6. Inspect the generated HTML for page-specific SEO metadata and content.
7. Verify canonical URLs and sitemap entries.
8. Check responsive layouts at mobile and desktop sizes.
9. Confirm that the deployment configuration supports the generated pages.
10. Report any verification that could not be completed.

Do not claim that Google has indexed the pages. Google indexing must be checked separately in Search Console after deployment.

## Final Deliverables

When finished, provide:

- Summary of the three pages implemented.
- Exact URLs and SEO titles.
- Files created or modified.
- Any dependencies added and why.
- Rendering/prerendering implementation details.
- Sitemap and robots.txt changes.
- Build/test results.
- Any manual deployment steps required.
- Any remaining SEO limitations.

**Final objective:** Expand Atlas from a one-page React website into a small, high-quality SEO-friendly website while preserving the existing design and product experience, minimizing unnecessary code changes, and making the new pages technically accessible to search engines.