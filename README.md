# 🦞 ClawSoul

> 为 OpenClaw 注入灵魂的模板商店

大多数人并不缺 AI 模型，缺的是能够直接下场干活的"专家配置"。

ClawSoul 提供精心调教的人格模板，让你的 OpenClaw 助理瞬间变身各领域专家。

## 快速开始

```bash
# 浏览可用灵魂
ls souls/

# 手动安装（复制文件到你的 OpenClaw workspace）
cp -r souls/pm-expert/* ~/.openclaw/workspace/
```

## 可用灵魂

| 灵魂 | 描述 | 作者 |
|------|------|------|
| [pm-expert](./souls/pm-expert) | 产品经理专家 - PRD写作、需求分析、竞品研究 | @openclaw0205 |
| [seo-master](./souls/seo-master) | SEO专家 - 关键词研究、内容优化、技术SEO、外链策略 | @openclaw0205 |

## 灵魂结构

每个灵魂包含：

```
souls/example/
├── manifest.json    # 元数据
├── SOUL.md          # 人格核心
├── AGENTS.md        # 行为准则
├── MEMORY.md        # 初始知识（可选）
└── skills.txt       # 依赖技能列表
```

## 贡献灵魂

我们欢迎社区贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可证

MIT License

---

*拒绝平庸的复读机，为你的 OpenClaw 寻找百里挑一的灵魂。*
