import Link from "next/link";
import fs from "fs";
import path from "path";
import { getDictionary, locales, getLocaleName, type Locale } from "@/lib/i18n";

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

// Soul emoji mapping
const soulEmojis: Record<string, string> = {
  "pm-expert": "📋",
  "seo-master": "🔍",
  "code-mentor": "💻",
  "life-coach": "🌟",
};

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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t.nav.home}
            </Link>
            <Link
              href={`/${locale}#souls`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {t.nav.souls}
            </Link>
            <a
              href="https://github.com/openclaw0205/clawsoul"
              target="_blank"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {t.nav.github}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <span className="text-xs text-gray-500 block mb-3">Language</span>
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
          <a
            href="https://github.com/openclaw0205/clawsoul/blob/main/CONTRIBUTING.md"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t.nav.submitSoul}
          </a>
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
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 lg:px-12 py-12 lg:py-16 border-b border-gray-800">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.hero.title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              {t.hero.description}{" "}
              <span className="text-orange-400 font-semibold">{souls.length}</span>{" "}
              {t.hero.descriptionSuffix}
              <br />
              {t.hero.descriptionSub}
            </p>

            {/* Search Box */}
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder={t.hero.searchPlaceholder}
                className="w-full px-5 py-3.5 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-6">
              <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full">
                🔥 {t.filters.all}
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-400 hover:text-white text-sm font-medium rounded-full transition">
                ⭐ {t.filters.featured}
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-400 hover:text-white text-sm font-medium rounded-full transition">
                🆕 {t.filters.latest}
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-400 hover:text-white text-sm font-medium rounded-full transition">
                💼 {t.filters.business}
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-400 hover:text-white text-sm font-medium rounded-full transition">
                💻 {t.filters.development}
              </button>
            </div>
          </div>
        </section>

        {/* Soul Cards Grid */}
        <section id="souls" className="px-6 lg:px-12 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">{t.souls.title}</h2>
            <span className="text-sm text-gray-500">{souls.length} {t.souls.available}</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {souls.map((soul) => (
              <Link
                key={soul.name}
                href={`/${locale}/${soul.name}`}
                className="group bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/5"
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {soulEmojis[soul.name] || "🦞"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition truncate">
                      {soul.display_name}
                    </h3>
                    <p className="text-sm text-gray-500">{t.souls.by} @{soul.author}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {soul.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {soul.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs bg-gray-800 text-gray-400 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                  {soul.tags.length > 3 && (
                    <span className="px-2.5 py-1 text-xs bg-gray-800 text-gray-500 rounded-md">
                      +{soul.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Version Badge */}
                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-600">v{soul.version}</span>
                  <span className="text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition">
                    {t.souls.viewDetails}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 lg:px-12 py-16 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-gray-400 mb-8">
              {t.cta.description}
            </p>
            <a
              href="https://github.com/openclaw0205/clawsoul/blob/main/CONTRIBUTING.md"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t.cta.button}
            </a>
          </div>
        </section>

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
              <a href="https://github.com/openclaw0205/clawsoul" target="_blank" className="hover:text-white transition">
                GitHub
              </a>
              <a href="https://openclaw.ai" target="_blank" className="hover:text-white transition">
                OpenClaw
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
