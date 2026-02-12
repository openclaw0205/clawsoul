import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import FileTabs from "@/components/FileTabs";

interface SoulManifest {
  name: string;
  display_name: string;
  version: string;
  author: string;
  description: string;
  tags: string[];
  skills: string[];
}

interface PageProps {
  params: Promise<{ locale: Locale; soul: string }>;
}

// Soul emoji mapping
const soulEmojis: Record<string, string> = {
  "pm-expert": "📋",
  "seo-master": "🔍",
  "code-mentor": "💻",
  "life-coach": "🌟",
};

async function getSoul(soulName: string) {
  const soulDir = path.join(process.cwd(), "souls", soulName);

  if (!fs.existsSync(soulDir)) {
    return null;
  }

  const manifest: SoulManifest = JSON.parse(
    fs.readFileSync(path.join(soulDir, "manifest.json"), "utf-8"),
  );

  const soulMd = fs.existsSync(path.join(soulDir, "SOUL.md"))
    ? fs.readFileSync(path.join(soulDir, "SOUL.md"), "utf-8")
    : null;

  const agentsMd = fs.existsSync(path.join(soulDir, "AGENTS.md"))
    ? fs.readFileSync(path.join(soulDir, "AGENTS.md"), "utf-8")
    : null;

  const memoryMd = fs.existsSync(path.join(soulDir, "MEMORY.md"))
    ? fs.readFileSync(path.join(soulDir, "MEMORY.md"), "utf-8")
    : null;

  return { manifest, soulMd, agentsMd, memoryMd };
}

async function getSoulNames(): Promise<string[]> {
  const soulsDir = path.join(process.cwd(), "souls");
  return fs.readdirSync(soulsDir);
}

export async function generateStaticParams() {
  const soulNames = await getSoulNames();
  const params = [];
  for (const locale of locales) {
    for (const soul of soulNames) {
      params.push({ locale, soul });
    }
  }
  return params;
}

export default async function SoulPage({ params }: PageProps) {
  const { locale, soul: soulName } = await params;
  const t = getDictionary(locale);
  const soul = await getSoul(soulName);

  if (!soul) {
    notFound();
  }

  const { manifest, soulMd, agentsMd, memoryMd } = soul;
  const installCommand = `curl -fsSL https://raw.githubusercontent.com/openclaw0205/clawsoul/main/scripts/install.sh | bash -s ${manifest.name}`;
  const manualCommand = `git clone https://github.com/openclaw0205/clawsoul.git\ncp -r clawsoul/souls/${manifest.name}/* ~/.openclaw/workspace/`;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-2xl">🦞</span>
              <span className="text-lg font-bold text-white">ClawSoul</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex gap-1">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}/${soulName}`}
                  className={`px-2 py-1 text-xs rounded transition ${
                    loc === locale
                      ? "bg-orange-500/20 text-orange-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {loc.toUpperCase()}
                </Link>
              ))}
            </div>
            <a
              href={`https://github.com/openclaw0205/clawsoul/tree/main/souls/${manifest.name}`}
              target="_blank"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              {t.detail.viewOnGithub}
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href={`/${locale}`} className="hover:text-white transition">
            {t.nav.home}
          </Link>
          <svg
            className="w-3.5 h-3.5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link
            href={`/${locale}/souls`}
            className="hover:text-white transition"
          >
            {t.nav.souls}
          </Link>
          <svg
            className="w-3.5 h-3.5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-gray-300">{manifest.display_name}</span>
        </nav>

        {/* ── Section 1: Basic Info ── */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shrink-0">
              {soulEmojis[manifest.name] || "🦞"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                {manifest.display_name}
              </h1>
              <p className="text-gray-400">
                {t.souls.by}{" "}
                <a
                  href={`https://github.com/${manifest.author}`}
                  target="_blank"
                  className="text-orange-400 hover:underline"
                >
                  @{manifest.author}
                </a>
                <span className="mx-2">·</span>
                <span className="text-gray-500">v{manifest.version}</span>
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-300 mb-6">{manifest.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {manifest.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Required Skills */}
          {manifest.skills.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {t.detail.requiredSkills}
              </span>
              <div className="flex gap-2">
                {manifest.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── Section 2: Installation ── */}
        <section className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              📦 {t.detail.installation}
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* One-line install */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">
                  {t.detail.oneLineInstall}
                </span>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                  {t.detail.recommended}
                </span>
              </div>
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto border border-gray-800">
                {installCommand}
              </div>
            </div>

            {/* Manual install */}
            <div>
              <span className="text-sm text-gray-400 block mb-2">
                {t.detail.manualInstall}
              </span>
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs text-gray-400 overflow-x-auto border border-gray-800 whitespace-pre">
                {manualCommand}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Soul MD Documents ── */}
        <section>
          <FileTabs soulMd={soulMd} agentsMd={agentsMd} memoryMd={memoryMd} />
        </section>

        {/* ── Section 4: FAQ ── */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {t.faq.title}
            </h2>
            <p className="text-sm text-gray-500">{t.faq.subtitle}</p>
          </div>
          <div className="grid gap-4">
            {t.faq.items.map(
              (item: { q: string; a: string }, index: number) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl p-5 border border-gray-800"
                >
                  <div className="flex gap-4">
                    <div className="w-7 h-7 bg-orange-500/20 text-orange-400 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1.5">
                        {item.q}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Back CTA */}
        <div className="text-center pt-2">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.detail.exploreMore}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-4">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
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
    </div>
  );
}
