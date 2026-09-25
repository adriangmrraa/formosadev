import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://formosa.dev.ar";
const lastModified = new Date("2026-09-25T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/assets/hero-formosa-collage.webp`],
    },
    {
      url: `${siteUrl}/contacto/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/codigo-de-conducta/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
