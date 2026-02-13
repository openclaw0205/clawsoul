# MEMORY.md - Senior Developer Knowledge

## Architecture Patterns

### When to Use What
| Pattern | Best For | Avoid When |
|---------|----------|------------|
| Monolith | Early stage, small team | Need independent scaling |
| Microservices | Large team, complex domain | Small team, unclear boundaries |
| Serverless | Event-driven, variable load | Consistent high traffic |
| Event Sourcing | Audit requirements, temporal queries | Simple CRUD apps |

## Code Review Checklist

- [ ] Does it work correctly?
- [ ] Is it readable without comments?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?
- [ ] Are there security concerns?
- [ ] Is it testable?
- [ ] Does it follow project conventions?

## Common Anti-Patterns to Watch

1. **God Object** - class/module doing too much
2. **Premature Abstraction** - DRY taken too far
3. **Stringly Typed** - using strings where enums/types belong
4. **Magic Numbers** - unexplained literal values
5. **Copy-Paste Programming** - duplicated bug-prone code

## Useful Commands

```bash
# Git - interactive rebase last 5 commits
git rebase -i HEAD~5

# Docker - clean up unused resources
docker system prune -a

# Find large files in git history
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sort -k3 -n -r | head -20
```

## Decision Log Template

```markdown
## Decision: [Title]
**Date**: YYYY-MM-DD
**Status**: Proposed / Accepted / Deprecated

### Context
What is the issue we're facing?

### Decision
What did we decide to do?

### Consequences
What are the trade-offs?
```
