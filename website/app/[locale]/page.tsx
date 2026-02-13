import Link from "next/link";
import fs from "fs";
import path from "path";
import { getDictionary, locales, getLocaleName, type Locale } from "@/lib/i18n";
import SoulMarquee from "@/components/SoulMarquee";

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
    title: `ClawSoul - ${t.landing.meta.title}`,
    description: t.landing.meta.description,
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

  // Split souls for two rows
  const midPoint = Math.ceil(souls.length / 2);
  const topRowSouls = souls.slice(0, midPoint);
  const bottomRowSouls = souls.slice(midPoint);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <span className="text-3xl">🦞</span>
              <span className="text-xl font-bold text-white">ClawSoul</span>
            </Link>
            <div className="flex items-center gap-6">
              {/* Language Switcher */}
              <div className="flex gap-2">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    className={`px-3 py-1.5 text-sm rounded-md transition ${
                      loc === locale
                        ? "bg-orange-500/20 text-orange-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {getLocaleName(loc)}
                  </Link>
                ))}
              </div>
              <a
                href="https://github.com/openclaw0205/clawsoul"
                target="_blank"
                className="text-gray-400 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-8">
            <span>🎉</span>
            <span>{t.landing.hero.badge}</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t.landing.hero.title}
            <span className="text-orange-500"> {t.landing.hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.landing.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/souls`}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              {t.landing.hero.cta}
            </Link>
            <a
              href="https://github.com/openclaw0205/clawsoul"
              target="_blank"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              {t.landing.hero.github}
            </a>
          </div>
        </div>
      </section>

      {/* Soul Showcase - Marquee */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.landing.showcase.title}
          </h2>
          <p className="text-gray-400 text-lg">
            {t.landing.showcase.description.replace("{count}", String(souls.length))}
          </p>
        </div>
        
        {/* Top row - scroll left */}
        <SoulMarquee souls={topRowSouls} locale={locale} direction="left" />
        
        {/* Bottom row - scroll right */}
        <SoulMarquee souls={bottomRowSouls} locale={locale} direction="right" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            {t.landing.features.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.landing.features.items.map((feature: { icon: string; title: string; description: string }, index: number) => (
              <div
                key={index}
                className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
            {t.landing.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.landing.howItWorks.steps.map((step: { number: string; title: string; description: string }, index: number) => (
              <div key={index} className="relative">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {step.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] border-t-2 border-dashed border-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            {t.faq.title}
          </h2>
          <p className="text-gray-400 text-center mb-12">
            {t.faq.subtitle}
          </p>
          <div className="space-y-4">
            {t.faq.items.map((item: { q: string; a: string }, index: number) => (
              <details
                key={index}
                className="group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/30 transition-colors"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500/10 text-orange-400 rounded-lg flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <span className="text-white font-medium">{item.q}</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-400 leading-relaxed pl-12">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.landing.cta.title}
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {t.landing.cta.description}
            </p>
            <Link
              href={`/${locale}/submit`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
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
              {t.landing.cta.button}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦞</span>
              <span className="text-lg font-semibold text-white">ClawSoul</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">{t.footer.license}</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
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
              <a
                href="https://discord.com/invite/clawd"
                target="_blank"
                className="hover:text-white transition"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
