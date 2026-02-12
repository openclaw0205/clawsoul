"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const guideUrl = "https://raw.githubusercontent.com/openclaw0205/clawsoul/main/SUBMIT_GUIDE.md";

export default function SubmitClient() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === "zh";

  const messageText = isZh 
    ? `帮我提交灵魂模板到 ClawSoul，请先阅读这个指南：${guideUrl}`
    : `Help me submit a soul template to ClawSoul. Please read this guide first: ${guideUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    alert(isZh ? "已复制！" : "Copied!");
  };

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
            {isZh ? "返回首页" : "Back to Home"}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6">
            🚀
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isZh ? "提交你的灵魂模板" : "Submit Your Soul"}
          </h1>
          <p className="text-lg text-gray-400">
            {isZh 
              ? "让你的 OpenClaw 助理帮你完成提交" 
              : "Let your OpenClaw assistant help you submit"}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isZh ? "复制下面的消息" : "Copy the message below"}
                </h3>
                <p className="text-gray-400">
                  {isZh 
                    ? "这条消息包含了提交指南，你的 OpenClaw 会知道怎么做" 
                    : "This message contains the submission guide for your OpenClaw"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isZh ? "发送给你的 OpenClaw" : "Send to your OpenClaw"}
                </h3>
                <p className="text-gray-400">
                  {isZh 
                    ? "通过 Telegram、WhatsApp 或其他已连接的渠道发送" 
                    : "Via Telegram, WhatsApp, or any connected channel"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isZh ? "回答几个问题" : "Answer a few questions"}
                </h3>
                <p className="text-gray-400">
                  {isZh 
                    ? "你的 OpenClaw 会问你想分享哪个人格，然后自动帮你提交 PR" 
                    : "Your OpenClaw will ask which persona to share and create a PR for you"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Link Box */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-sm text-gray-400 mb-3">
            {isZh ? "发送给你的 OpenClaw：" : "Send this to your OpenClaw:"}
          </h3>
          <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm text-orange-400 break-all border border-gray-700 mb-4">
            {messageText}
          </div>
          <button
            onClick={handleCopy}
            className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {isZh ? "复制到剪贴板" : "Copy to Clipboard"}
          </button>
        </div>

        {/* Alternative */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            {isZh ? "或者手动提交：" : "Or submit manually:"}
          </p>
          <a
            href="https://github.com/openclaw0205/clawsoul/blob/main/CONTRIBUTING.md"
            target="_blank"
            className="text-orange-400 hover:underline"
          >
            {isZh ? "查看贡献指南" : "View Contributing Guide"}
          </a>
        </div>
      </main>
    </div>
  );
}
