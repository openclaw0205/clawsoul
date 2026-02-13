import Link from "next/link";
import fs from "fs";
import path from "path";
import { getDictionary, locales, getLocaleName, type Locale } from "@/lib/i18n";
import SoulExplorer from "./SoulExplorer";

interface SoulManifest {
  name: string;
  display_name: string;
  version: string;
  author: string;
  description: string;
  tags: string[];
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

async function getSouls(): Promise<SoulManifest[]> {
  const soulsDir = path.join(process.cwd(), "souls");
  const dirs = fs.readdirSync(soulsDir);

  const souls: SoulManifest[] = [];
  for (const dir of dirs) {
    const manifestPath = path.join(soulsDir, dir, "manifest.json");
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      souls.push(manifest);
    }
  }
  return souls;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return {
    title: `${t.hero.title} ${t.hero.titleHighlight} - ClawSoul`,
    description: `${t.hero.description} ${t.hero.descriptionSub}`,
    alternates: {
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const souls = await getSouls();

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 fixed h-full hidden lg:block">
        <div className="p-6">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🦞</span>
            <span className="text-xl font-bold text-white">ClawSoul</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-orange-500/10 text-orange-400 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t.nav.home}
            </Link>
            <Link
              href={`/${locale}/souls`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {t.nav.souls}
            </Link>
            <a
              href="https://github.com/openclaw0205/clawsoul"
              target="_blank"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              {t.nav.github}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <span className="text-xs text-gray-500 block mb-3">
              {t.nav.language}
            </span>
            <div className="flex gap-2">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    loc === locale
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {getLocaleName(loc)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <Link
            href={`/${locale}/submit`}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {t.nav.submitSoul}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-2xl">🦞</span>
              <span className="text-lg font-bold text-white">ClawSoul</span>
            </Link>
            <div className="flex items-center gap-3">
              {/* Mobile Language Switcher */}
              <div className="flex gap-1">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    className={`px-2 py-1 text-xs rounded transition ${
                      loc === locale
                        ? "bg-orange-500/20 text-orange-400"
                        : "text-gray-400"
                    }`}
                  >
                    {loc.toUpperCase()}
                  </Link>
                ))}
              </div>
              <a
                href="https://github.com/openclaw0205/clawsoul"
                target="_blank"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Soul Explorer (Client Component) */}
        <SoulExplorer
          souls={souls}
          locale={locale}
          t={{
            hero: t.hero,
            filters: t.filters,
            souls: t.souls,
            cta: t.cta,
            faq: t.faq,
          }}
        />

        {/* Footer */}
        <footer className="px-6 lg:px-12 py-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>🦞</span>
              <span>ClawSoul</span>
              <span>·</span>
              <span>{t.footer.license}</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/openclaw0205/clawsoul"
                target="_blank"
                className="hover:text-white transition"
              >
                GitHub
              </a>
              <a
                href="https://openclaw.ai"
                target="_blank"
                className="hover:text-white transition"
              >
                OpenClaw
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
