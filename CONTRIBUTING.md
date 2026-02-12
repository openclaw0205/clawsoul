# 贡献指南

感谢你考虑为 ClawSoul 贡献灵魂！

## 如何贡献

### 1. Fork 并克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/clawsoul.git
cd clawsoul
```

### 2. 创建新灵魂

```bash
mkdir souls/your-soul-name
```

### 3. 必需文件

每个灵魂**必须**包含：

- `manifest.json` - 元数据
- `SOUL.md` - 人格定义

**可选**文件：

- `AGENTS.md` - 自定义行为准则
- `MEMORY.md` - 预置知识和记忆
- `skills.txt` - 依赖的技能列表（每行一个）

### 4. manifest.json 规范

```json
{
  "name": "your-soul-name",
  "display_name": "显示名称",
  "version": "1.0.0",
  "author": "your-github-username",
  "description": "一句话描述这个灵魂的能力",
  "tags": ["标签1", "标签2"],
  "skills": ["skill1", "skill2"],
  "min_openclaw": "0.1.0"
}
```

### 5. 提交 PR

- 确保灵魂经过实际测试
- 在 PR 描述中说明灵魂的使用场景
- 附上示例对话（可选但推荐）

## 质量标准

✅ **好的灵魂**：
- 有明确的专业领域
- SOUL.md 定义清晰的人格和行为
- 实际测试过，能解决真实问题

❌ **会被拒绝的**：
- 纯复制粘贴的通用 prompt
- 未经测试的模板
- 包含敏感/不当内容

## 问题反馈

发现 bug 或有功能建议？请提交 Issue！
