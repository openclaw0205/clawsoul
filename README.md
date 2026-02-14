# 🦞 ClawSoul

> **Pre-configured AI Personas with Skills** — One click to become an expert

[![Souls](https://img.shields.io/badge/souls-30-orange?style=flat-square)](./souls)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)

## Why ClawSoul?

**The Problem**: You have OpenClaw, but setting up the perfect persona takes time.

**The Solution**: ClawSoul gives you ready-to-go expert packages — persona + skills + knowledge, all pre-configured.

```
Soul = Persona + Skills + Knowledge
     = Instant Expert
```

| Without ClawSoul | With ClawSoul |
|------------------|---------------|
| Install 10 skills manually | One-click install |
| Configure persona yourself | Pre-tuned personality |
| Figure out best practices | Battle-tested setup |
| Hours of setup | **30 seconds** |

## Quick Start

```bash
# One-line install
curl -fsSL https://raw.githubusercontent.com/openclaw0205/clawsoul/main/scripts/install.sh | bash -s indie-hacker

# Or manually
git clone https://github.com/openclaw0205/clawsoul.git
cp -r clawsoul/souls/indie-hacker/* ~/.openclaw/workspace/
```

## 🔥 Featured Souls

| Soul | What You Get | Included Skills |
|------|--------------|-----------------|
| **[indie-hacker](./souls/indie-hacker)** | Bootstrap founder mindset | coding + seo + stripe + analytics + twitter |
| **[seo-master](./souls/seo-master)** | SEO domination | audit + keywords + backlinks + schema + serp |
| **[dev-senior](./souls/dev-senior)** | 10x developer | coding-agent + architecture + docker + debug |
| **[startup-mentor](./souls/startup-mentor)** | YC-style guidance | pitch-deck + fundraising + growth-metrics |
| **[content-creator](./souls/content-creator)** | Viral content machine | youtube + tiktok + instagram + thumbnails |

## All 30 Souls

<details>
<summary><b>Development & Tech</b></summary>

- `dev-senior` - Senior developer with architecture expertise
- `devops-engineer` - Infrastructure & CI/CD specialist
- `security-analyst` - Security auditor & pen tester
- `prompt-engineer` - LLM optimization expert
- `tech-writer` - Documentation specialist

</details>

<details>
<summary><b>Marketing & Growth</b></summary>

- `seo-master` - Search engine optimization expert
- `marketing-strategist` - Growth & campaign planner
- `copywriter` - Conversion-focused writer
- `content-creator` - Social media & video creator
- `sales-expert` - B2B sales specialist

</details>

<details>
<summary><b>Business & Startup</b></summary>

- `indie-hacker` - Bootstrap founder
- `startup-mentor` - VC & fundraising advisor
- `pm-expert` - Product manager
- `project-manager` - Agile/Scrum master
- `ecommerce-expert` - Online store specialist

</details>

<details>
<summary><b>Design & Creative</b></summary>

- `ui-designer` - Visual design expert
- `ux-designer` - User research specialist
- `video-editor` - Video production pro
- `public-speaker` - Presentation coach

</details>

<details>
<summary><b>Professional Services</b></summary>

- `finance-advisor` - Personal finance guide
- `legal-consultant` - Contract & IP basics
- `hr-specialist` - Recruiting & HR
- `data-analyst` - SQL & visualization
- `researcher` - Academic research

</details>

<details>
<summary><b>Personal Development</b></summary>

- `career-coach` - Job search & interviews
- `english-tutor` - Language learning
- `fitness-coach` - Workout & nutrition
- `therapist` - Mental wellness support
- `translator` - Multi-language expert
- `customer-success` - Customer support pro

</details>

## Soul Anatomy

```
souls/indie-hacker/
├── manifest.json    # Metadata + FAQ
├── SOUL.md          # Core persona definition
├── AGENTS.md        # Behavior guidelines
├── MEMORY.md        # Pre-loaded knowledge
└── skills.txt       # 10 recommended skills
```

Each Soul comes with **recommended skills** that auto-install the right tools for the job.

## Contributing

Have expertise to share? Create a Soul!

1. Fork this repo
2. Copy `souls/_template` to `souls/your-soul-name`
3. Fill in the files
4. Submit a PR

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Links

- 🌐 **Website**: [clawsoul.vercel.app](https://clawsoul.vercel.app)
- 🦞 **OpenClaw**: [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)
- 📦 **Skills**: [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)

## License

MIT License — Use freely, modify freely, share freely.

---

*Stop configuring. Start creating.* 🚀
