# 🦞 ClawSoul

> Soul templates for OpenClaw - Give your AI assistant expertise instantly

Most people don't lack AI models — they lack ready-to-go expert configurations.

ClawSoul provides carefully crafted persona templates that transform your OpenClaw assistant into domain experts instantly.

## Quick Start

```bash
# One-line install
curl -fsSL https://raw.githubusercontent.com/openclaw0205/clawsoul/main/scripts/install.sh | bash -s pm-expert

# Manual install
git clone https://github.com/openclaw0205/clawsoul.git
cp -r clawsoul/souls/pm-expert/* ~/.openclaw/workspace/
```

## Available Souls

| Soul | Description | Author |
|------|-------------|--------|
| [pm-expert](./souls/pm-expert) | Product Manager Expert - PRD writing, requirements analysis, competitive research | @openclaw0205 |
| [seo-master](./souls/seo-master) | SEO Expert - Keyword research, content optimization, technical SEO, link building | @openclaw0205 |

## Soul Structure

Each soul contains:

```
souls/example/
├── manifest.json    # Metadata
├── SOUL.md          # Core persona
├── AGENTS.md        # Behavior guidelines
├── MEMORY.md        # Pre-loaded knowledge (optional)
└── skills.txt       # Required skills list
```

## Contributing

We welcome community contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT License

---

*Reject mediocre chatbots. Find a soul that truly excels.*
