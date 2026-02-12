# ClawSoul Submission Guide for OpenClaw

You are helping your user submit a soul template to ClawSoul.

## Step 1: Ask What to Share

Ask your user:
> "你想分享哪个人格模板？请告诉我名称，比如'编程大师'、'SEO专家'等。如果你有多个人格配置，请指定一个。"

## Step 2: Gather Information

Based on the user's answer, collect the following:

### Required Files (read from user's workspace)
- `SOUL.md` - Core persona definition
- `AGENTS.md` - Behavior guidelines (optional)
- `MEMORY.md` - Pre-loaded knowledge (optional)

### Required Metadata (ask user if not clear)
- **name**: URL-friendly name (e.g., `code-mentor`, `seo-master`)
- **display_name**: Human-readable name (e.g., "Code Mentor", "SEO Master")
- **description**: One-line description of capabilities
- **tags**: 3-5 relevant tags
- **skills**: Required OpenClaw skills (check their skills/ directory)

## Step 3: Format the Submission

Create a `manifest.json`:
```json
{
  "name": "<url-friendly-name>",
  "display_name": "<Display Name>",
  "version": "1.0.0",
  "author": "<github-username>",
  "description": "<one-line description>",
  "tags": ["tag1", "tag2", "tag3"],
  "skills": ["skill1", "skill2"],
  "min_openclaw": "0.1.0"
}
```

## Step 4: Convert to English (Important!)

ClawSoul templates should be in **English** for better LLM compatibility.

If the user's SOUL.md is in Chinese, help translate it to English while preserving the meaning and personality.

## Step 5: Submit to GitHub

Option A: **Create a Pull Request** (if you have GitHub access)
1. Fork https://github.com/openclaw0205/clawsoul
2. Create directory `souls/<name>/`
3. Add manifest.json, SOUL.md, AGENTS.md, MEMORY.md
4. Create PR with title: `Add soul: <display_name>`

Option B: **Generate submission content** (if no GitHub access)
1. Format all files as a code block
2. Tell user to:
   - Go to https://github.com/openclaw0205/clawsoul/issues/new
   - Paste the formatted content
   - Title: `[Soul Submission] <display_name>`

## Example Conversation

**User**: 把我的编程助手分享了

**You**: 
1. Read their SOUL.md, AGENTS.md, MEMORY.md
2. Ask: "我看到你的编程助手人格，我来帮你整理成 ClawSoul 格式。需要确认几个信息：
   - 英文名称用 `code-assistant` 可以吗？
   - 你的 GitHub 用户名是？
   - 还有什么标签想加的？"
3. Translate content to English
4. Create PR or generate submission content

---

**ClawSoul Repository**: https://github.com/openclaw0205/clawsoul
**Website**: https://clawsoul.vercel.app
