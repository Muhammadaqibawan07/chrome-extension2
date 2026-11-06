/* Per-page SEO tags: canonical URL, Open Graph and Twitter card.
   Every URL is absolute on SITE_URL, as search engines and link
   previews expect. */
import { SITE_URL } from "./site";

export const SITE_NAME = "Atlas";
export const DEFAULT_IMAGE = "/media/shot-2.jpg";

type SeoInput = {
  path: string;
  title: string;
  description: string;
  /* a site path such as /media/guides/x.jpg; defaults to the home screenshot */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/* WebPage + BreadcrumbList structured data for a plain page. Pages with richer data
   (home, guides) replace the `scripts` this adds with their own. */
function pageData(path: string, title: string, description: string, img: string) {
  const url = SITE_URL + path;
  const name = title.split(" | ")[0]!;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      primaryImageOfPage: { "@type": "ImageObject", url: img },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
  ];
}

export function seo({ path, title, description, image = DEFAULT_IMAGE, imageAlt, imageWidth = 1280, imageHeight = 800 }: SeoInput) {
  const url = SITE_URL + path;
  const img = SITE_URL + image;
  return {
    scripts: [{ type: "application/ld+json", children: JSON.stringify(pageData(path, title, description, img)) }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: String(imageWidth) },
      { property: "og:image:height", content: String(imageHeight) },
      ...(imageAlt ? [{ property: "og:image:alt", content: imageAlt }] : []),
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      ...(imageAlt ? [{ name: "twitter:image:alt", content: imageAlt }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
