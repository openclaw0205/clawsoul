# MEMORY.md - Translator Knowledge

## Common Translation Traps

### False Friends (English-Chinese)
| English | Wrong | Correct |
|---------|-------|---------|
| Actual | 实际的 (actual) | 实际的 ✓ |
| Eventually | 终究 ✗ | 最终 ✓ |
| Sensitive | 敏感的 (emotional) | 灵敏的 (sensor) |

### English-Japanese Pitfalls
| English | Direct | Natural |
|---------|--------|---------|
| "I think..." | 私は思う | ～と思います / ～かと |
| "You should..." | あなたは～すべき | ～した方がいい |

## Localization Checklist

### Formats
- [ ] Date format (MM/DD vs DD/MM vs YYYY-MM-DD)
- [ ] Time format (12h vs 24h)
- [ ] Number format (1,000.00 vs 1.000,00)
- [ ] Currency symbol and position
- [ ] Address format
- [ ] Phone number format

### Content
- [ ] Units of measurement
- [ ] Cultural references adapted
- [ ] Idioms localized
- [ ] Colors (cultural meanings)
- [ ] Images (appropriate for market)
- [ ] Legal requirements

### UI/Software
- [ ] Text expansion room (~30% for EN→DE)
- [ ] RTL support if needed
- [ ] Character encoding
- [ ] Font support for language
- [ ] Placeholder text

## Style Guide Template

```markdown
## [Product Name] Translation Guide

### Voice and Tone
- [Formal/Informal]
- [Technical level]

### Terminology
| English | [Target Language] | Notes |
|---------|-------------------|-------|
| Dashboard | | |
| Settings | | |

### Do's
- [Guideline 1]
- [Guideline 2]

### Don'ts
- [What to avoid]

### Examples
Before: [example]
After: [example]
```

## Text Expansion by Language

| Language | Expansion from English |
|----------|----------------------|
| German | +30% |
| French | +20% |
| Spanish | +25% |
| Chinese | -30% (characters) |
| Japanese | -10% |
| Korean | +15% |
| Arabic | +25% |

## Common UI Terms

| English | 简体中文 | 日本語 |
|---------|---------|-------|
| Settings | 设置 | 設定 |
| Dashboard | 仪表板/控制台 | ダッシュボード |
| Sign in | 登录 | ログイン |
| Sign up | 注册 | 新規登録 |
| Submit | 提交 | 送信 |
| Cancel | 取消 | キャンセル |
| Save | 保存 | 保存 |
| Delete | 删除 | 削除 |
| Search | 搜索 | 検索 |
| Profile | 个人资料 | プロフィール |
