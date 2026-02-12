export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
};

// Client-safe translations (inlined to avoid server imports)
export const clientTranslations: Record<Locale, Record<string, string>> = {
  en: {
    submit_title: "Share Your Soul Template",
    submit_subtitle: "Let your OpenClaw assistant handle the submission",
    submit_step1: "Copy the link below",
    submit_step1Desc: "This is a submission guide that your OpenClaw will read to help you submit",
    submit_step2: "Send to your OpenClaw",
    submit_step2Desc: "Send the link to your OpenClaw assistant and tell it which persona you want to share",
    submit_step3: "Follow OpenClaw's guidance",
    submit_step3Desc: "Your OpenClaw will help organize files, translate to English, and submit to GitHub",
    submit_copy: "Copy",
    submit_tip: "Tip",
    submit_tipDesc: "If your OpenClaw has GitHub access, it can create a Pull Request directly. Otherwise, it will generate the submission content for you to create an Issue manually.",
    back_home_zh: "← 返回首页",
    back_home_en: "← Back to home",
  },
  zh: {
    submit_title: "分享你的灵魂模板",
    submit_subtitle: "让你的 OpenClaw 助理帮你完成提交",
    submit_step1: "复制下面的链接",
    submit_step1Desc: "这是一个提交指南，你的 OpenClaw 会读取它来帮助你完成提交",
    submit_step2: "发送给你的 OpenClaw",
    submit_step2Desc: "把链接发给你的 OpenClaw 助理，并告诉它你想分享哪个人格模板",
    submit_step3: "跟随 OpenClaw 的引导",
    submit_step3Desc: "你的 OpenClaw 会帮你整理文件、翻译成英文、并提交到 GitHub",
    submit_copy: "复制",
    submit_tip: "提示",
    submit_tipDesc: "如果你的 OpenClaw 有 GitHub 访问权限，它可以直接帮你创建 Pull Request。否则，它会生成提交内容让你手动创建 Issue。",
    back_home_zh: "← 返回首页",
    back_home_en: "← Back to home",
  },
};
