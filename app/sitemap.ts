import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://allu-arjun-cinematic.example.com";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#films`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
