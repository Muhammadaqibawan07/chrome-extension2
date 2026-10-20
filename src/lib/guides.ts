/* The guide pages: one list for the footer and the "keep reading"
   links, and one head() builder so every guide gets the same SEO tags
   and structured data (WebPage, BreadcrumbList and, when the page
   shows one, FAQPage). */
import { seo, SITE_NAME } from "./seo";
import { SITE_URL } from "./site";

export const GUIDES = [
  {
    path: "/guides/best-chrome-new-tab-extensions",
    name: "Best Chrome new tab extensions",
    blurb: "What a new tab extension can do, the main kinds, and how to pick one.",
  },
  {
    path: "/guides/best-chrome-wallpaper-extensions",
    name: "Best Chrome wallpaper extensions",
    blurb: "Picture quality, styles and settings that make a wallpaper extension worth keeping.",
  },
  {
    path: "/features/live-wallpapers",
    name: "Live wallpapers for Chrome",
    blurb: "How animated new tab backgrounds work, and what they cost in battery and memory.",
  },
] as const;

export type GuidePath = (typeof GUIDES)[number]["path"];
export type Faq = readonly (readonly [string, string])[];

type GuideHeadInput = {
  path: GuidePath;
  title: string;
  description: string;
  /* the visible <h1>, used as the breadcrumb's last step */
  heading: string;
  image: string;
  imageAlt: string;
  faq?: Faq;
};

export function guideHead({ path, title, description, heading, image, imageAlt, faq }: GuideHeadInput) {
  const url = SITE_URL + path;
  const data: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      primaryImageOfPage: { "@type": "ImageObject", url: SITE_URL + image },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: heading, item: url },
      ],
    },
  ];
  if (faq?.length) {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
  }
  return {
    ...seo({ path, title, description, image, imageAlt }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(data) }],
  };
}
