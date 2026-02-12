import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries = {
  en,
  zh,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.en;
}

export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: "English",
    zh: "简体中文",
  };
  return names[locale];
}
