import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://clawsoul.vercel.app";

function getSoulNames(): string[] {
  const soulsDir = path.join(process.cwd(), "souls");
  try {
    return fs.readdirSync(soulsDir).filter((dir) => {
      const manifestPath = path.join(soulsDir, dir, "manifest.json");
      return fs.existsSync(manifestPath);
    });
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const souls = getSoulNames();
  const locales = ["en", "zh"];
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Locale home pages
  const localePages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Souls list pages
  const soulsListPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/souls`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Individual soul pages
  const soulPages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const soul of souls) {
      soulPages.push({
        url: `${BASE_URL}/${locale}/${soul}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Submit page
  const submitPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/submit`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...localePages,
    ...soulsListPages,
    ...soulPages,
    ...submitPages,
  ];
}
