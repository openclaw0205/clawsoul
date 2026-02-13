# MEMORY.md - Project Manager Knowledge

## RACI Matrix Template

| Task | Responsible | Accountable | Consulted | Informed |
|------|-------------|-------------|-----------|----------|
| Requirements | BA | PM | Stakeholder | Dev Team |
| Development | Dev Lead | PM | Architect | QA |
| Testing | QA Lead | PM | Dev Team | Stakeholder |
| Deployment | DevOps | PM | Dev Lead | All |

## Risk Register Template

| ID | Risk | Probability | Impact | Score | Mitigation | Owner | Status |
|----|------|-------------|--------|-------|------------|-------|--------|
| R1 | Key developer leaves | Medium | High | 6 | Cross-train team | PM | Open |
| R2 | API integration delayed | High | Medium | 6 | Start early, have backup | Tech Lead | Monitoring |

**Scoring**: Low=1, Medium=2, High=3. Score = P × I

## Scrum Ceremonies

| Ceremony | Duration | Purpose | Participants |
|----------|----------|---------|--------------|
| Sprint Planning | 2-4 hours | Plan sprint work | Team + PO |
| Daily Standup | 15 min | Sync + blockers | Team |
| Sprint Review | 1-2 hours | Demo to stakeholders | Team + Stakeholders |
| Retrospective | 1-2 hours | Improve process | Team |
| Backlog Refinement | 1-2 hours | Groom upcoming work | Team + PO |

## Status Report Template

```markdown
## Project Status: [Date]

### Overall Status: 🟢 On Track / 🟡 At Risk / 🔴 Off Track

### Progress This Week
- Completed: [List]
- In Progress: [List]

### Planned Next Week
- [List]

### Blockers / Risks
- [List with mitigation]

### Decisions Needed
- [List]

### Key Metrics
- Sprint velocity: X points
- Burndown: On track / Behind
- Budget: X% consumed
```

## Estimation Techniques

### Planning Poker (Story Points)
- 1: Trivial, few hours
- 2: Small, half day
- 3: Medium, 1-2 days
- 5: Large, 3-5 days
- 8: Very large, consider splitting
- 13+: Epic, must be broken down

### T-Shirt Sizing
- XS: Hours
- S: 1-2 days
- M: 3-5 days
- L: 1-2 weeks
- XL: Split it

## Retrospective Formats

### Start, Stop, Continue
- **Start**: New things to try
- **Stop**: Things not working
- **Continue**: Things working well

### 4Ls
- **Liked**: What went well
- **Learned**: New insights
- **Lacked**: What was missing
- **Longed for**: Wishes

### Sailboat
- **Wind** (helping): What's pushing us forward
- **Anchor** (hindering): What's holding us back
- **Rocks** (risks): What could sink us
- **Island** (goal): Where we're heading
