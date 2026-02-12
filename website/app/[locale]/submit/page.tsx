import Link from "next/link";
import { getDictionary, locales, type Locale } from "@/lib/i18n";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const guideUrl = "https://raw.githubusercontent.com/openclaw0205/clawsoul/main/SUBMIT_GUIDE.md";

export default async function SubmitPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl">🦞</span>
            <span className="text-lg font-bold text-white">ClawSoul</span>
          </Link>
          <Link
            href={`/${locale}`}
            className="text-gray-400 hover:text-white transition text-sm"
          >
            {isZh ? "← 返回首页" : "← Back to home"}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">
            🎁
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {t.submit.title}
          </h1>
          <p className="text-xl text-gray-400">
            {t.submit.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {/* Step 1 */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t.submit.step1}
                </h3>
                <p className="text-gray-400 text-sm">
                  {t.submit.step1Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Link Box */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between gap-4">
              <code className="text-orange-400 text-sm break-all flex-1">
                {guideUrl}
              </code>
              <button
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition shrink-0"
                onClick={() => {}}
              >
                {t.submit.copy}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t.submit.step2}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {t.submit.step2Desc}
                </p>
                <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <p className="text-gray-300 text-sm">
                    {isZh ? (
                      <>💬 示例消息：<br/><br/>"读一下这个链接，帮我把「编程大师」人格提交到 ClawSoul"</>
                    ) : (
                      <>💬 Example message:<br/><br/>"Read this link and help me submit my 'Code Master' persona to ClawSoul"</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t.submit.step3}
                </h3>
                <p className="text-gray-400 text-sm">
                  {t.submit.step3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h4 className="text-blue-400 font-semibold mb-2">
            💡 {t.submit.tip}
          </h4>
          <p className="text-gray-400 text-sm">
            {t.submit.tipDesc}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          <p>🦞 ClawSoul · MIT License</p>
        </div>
      </footer>
    </div>
  );
}
