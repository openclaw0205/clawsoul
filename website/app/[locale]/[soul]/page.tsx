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

// Soul key features (localized)
const soulFeatures: Record<string, Record<Locale, string[]>> = {
  "seo-master": {
    en: [
      "Keyword research and competition analysis",
      "Content optimization for search intent",
      "Technical SEO audits and fixes",
      "Link building strategy planning",
      "GEO (Generative Engine Optimization)",
    ],
    zh: [
      "关键词研究与竞争分析",
      "内容优化以匹配搜索意图",
      "技术 SEO 审核与修复",
      "外链建设策略规划",
      "GEO（生成式引擎优化）",
    ],
  },
  "pm-expert": {
    en: [
      "PRD writing and requirements analysis",
      "User story breakdown",
      "Competitive analysis",
      "Feature prioritization",
      "Roadmap planning",
    ],
    zh: [
      "PRD 撰写与需求分析",
      "用户故事拆解",
      "竞品分析",
      "功能优先级排序",
      "路线图规划",
    ],
  },
};

// Soul use cases (localized)
const soulUseCases: Record<string, Record<Locale, string[]>> = {
  "seo-master": {
    en: [
      "Audit your website's SEO health",
      "Research keywords for new content",
      "Optimize existing pages for better rankings",
      "Analyze competitor backlink profiles",
      "Plan content calendar based on search demand",
    ],
    zh: [
      "审核网站 SEO 健康状况",
      "为新内容研究关键词",
      "优化现有页面提升排名",
      "分析竞争对手外链策略",
      "基于搜索需求规划内容日历",
    ],
  },
  "pm-expert": {
    en: [
      "Write detailed PRDs for new features",
      "Break down epics into user stories",
      "Conduct competitive analysis",
      "Define MVP scope and roadmap",
      "Create feature specifications",
    ],
    zh: [
      "为新功能撰写详细 PRD",
      "将大型需求拆解为用户故事",
      "进行竞品分析",
      "定义 MVP 范围和路线图",
      "创建功能规格说明",
    ],
  },
};

async function getSoul(soulName: string) {
  const soulDir = path.join(process.cwd(), "souls", soulName);

  if (!fs.existsSync(soulDir)) {
    return null;
  }

  const manifest: SoulManifest = JSON.parse(
    fs.readFileSync(path.join(soulDir, "manifest.json"), "utf-8")
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
  const manualCommand = `git clone https://github.com/openclaw0205/clawsoul.git
cp -r clawsoul/souls/${manifest.name}/* ~/.openclaw/workspace/`;

  const features = soulFeatures[manifest.name]?.[locale] || [];
  const useCases = soulUseCases[manifest.name]?.[locale] || [];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-2xl">🦞</span>
              <span className="text-lg font-bold text-white">ClawSoul</span>
            </Link>
            <Link
              href={`/${locale}`}
              className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.detail.backToList}
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
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Left: Info */}
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                {soulEmojis[manifest.name] || "🦞"}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{manifest.display_name}</h1>
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
            <div className="flex flex-wrap gap-2 mb-6">
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
                <span className="text-sm text-gray-500">{t.detail.requiredSkills}</span>
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
          </div>

          {/* Right: Install Card */}
          <div className="md:w-96">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">📦 {t.detail.installation}</h2>
              </div>
              <div className="p-6 space-y-6">
                {/* One-line install */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{t.detail.oneLineInstall}</span>
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">{t.detail.recommended}</span>
                  </div>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto border border-gray-800">
                    {installCommand}
                  </div>
                </div>

                {/* Manual install */}
                <div>
                  <span className="text-sm text-gray-400 block mb-2">{t.detail.manualInstall}</span>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs text-gray-400 overflow-x-auto border border-gray-800 whitespace-pre">
                    {manualCommand}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards - MiniMax Style */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* What is this Soul */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>❓</span>
              {locale === "zh" ? `什么是 ${manifest.display_name}？` : `What is ${manifest.display_name}?`}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {manifest.description}
              {locale === "zh" 
                ? " 这是一个 OpenClaw 人格模板，可以让你的 AI 助理瞬间具备专业能力。"
                : " This is an OpenClaw Soul template that instantly gives your AI assistant professional capabilities."
              }
            </p>
          </div>

          {/* How to use */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🚀</span>
              {locale === "zh" ? "如何使用？" : "How to use?"}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {locale === "zh"
                ? "1. 使用上方安装命令下载模板\n2. 重启 OpenClaw 或新建会话\n3. 开始与你的专业 AI 助理对话"
                : "1. Use the install command above\n2. Restart OpenClaw or start a new session\n3. Start chatting with your expert AI assistant"
              }
            </p>
          </div>
        </div>

        {/* Key Features */}
        {features.length > 0 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>✨</span>
              {locale === "zh" ? "核心能力" : "Key Features"}
            </h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-400">
                  <span className="text-orange-400 mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Use Cases */}
        {useCases.length > 0 && (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-12">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>💡</span>
              {locale === "zh" ? "使用场景" : "Use Cases"}
            </h2>
            <ul className="space-y-3">
              {useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-400">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* File Tabs - Client Component */}
        <FileTabs soulMd={soulMd} agentsMd={agentsMd} memoryMd={memoryMd} />

        {/* Back CTA */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.detail.exploreMore}
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
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
    </div>
  );
}
