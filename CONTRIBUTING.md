# Contributing Guide

Thanks for considering contributing to ClawSoul!

## How to Contribute

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/clawsoul.git
cd clawsoul
```

### 2. Create a New Soul

```bash
mkdir souls/your-soul-name
```

### 3. Required Files

Each soul **must** include:

- `manifest.json` - Metadata
- `SOUL.md` - Persona definition

**Optional** files:

- `AGENTS.md` - Custom behavior guidelines
- `MEMORY.md` - Pre-loaded knowledge and memory
- `skills.txt` - Required skills (one per line)

### 4. manifest.json Schema

```json
{
  "name": "your-soul-name",
  "display_name": "Display Name",
  "version": "1.0.0",
  "author": "your-github-username",
  "description": "One-line description of this soul's capabilities",
  "tags": ["tag1", "tag2"],
  "skills": ["skill1", "skill2"],
  "min_openclaw": "0.1.0"
}
```

### 5. Submit a PR

- Ensure the soul has been actually tested
- Describe use cases in the PR description
- Include example conversations (optional but recommended)

## Quality Standards

✅ **Good souls**:
- Have a clear domain expertise
- SOUL.md defines clear personality and behavior
- Actually tested and solves real problems

❌ **Will be rejected**:
- Generic copy-paste prompts
- Untested templates
- Contains sensitive or inappropriate content

## Feedback

Found a bug or have a feature suggestion? Please open an Issue!
