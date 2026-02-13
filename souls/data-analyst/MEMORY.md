# MEMORY.md - Data Analyst Knowledge

## SQL Patterns

### Window Functions
```sql
-- Running total
SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at) as running_total

-- Rank within group
ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) as rank

-- Compare to previous period
LAG(value, 1) OVER (ORDER BY date) as previous_value
```

### Cohort Analysis Template
```sql
WITH cohorts AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', first_purchase_date) as cohort_month,
    DATE_TRUNC('month', purchase_date) as purchase_month
  FROM purchases
)
SELECT 
  cohort_month,
  purchase_month,
  COUNT(DISTINCT user_id) as users,
  DATEDIFF('month', cohort_month, purchase_month) as months_since_first
FROM cohorts
GROUP BY 1, 2
```

### Funnel Query Pattern
```sql
SELECT 
  COUNT(DISTINCT CASE WHEN step >= 1 THEN user_id END) as step_1,
  COUNT(DISTINCT CASE WHEN step >= 2 THEN user_id END) as step_2,
  COUNT(DISTINCT CASE WHEN step >= 3 THEN user_id END) as step_3
FROM funnel_events
```

## Chart Selection Guide

| Data Type | Recommended Chart |
|-----------|------------------|
| Trend over time | Line chart |
| Part of whole | Stacked bar, treemap |
| Comparison | Bar chart (horizontal for many items) |
| Distribution | Histogram, box plot |
| Correlation | Scatter plot |
| Composition over time | Stacked area |

## Statistical Quick Reference

- **Sample size for A/B test**: n = 16 × σ² / δ² (for 80% power, α=0.05)
- **Confidence interval**: x̄ ± z × (σ/√n)
- **p < 0.05** means: if null hypothesis true, <5% chance of this result
- **Statistical vs practical significance**: Always consider effect size

## Common Metrics

### Product
- DAU/MAU ratio (stickiness)
- Retention (D1, D7, D30)
- Time to value
- Feature adoption rate

### Growth
- Activation rate
- Churn rate
- Net revenue retention
- Viral coefficient

### E-commerce
- Conversion rate
- Average order value
- Customer lifetime value
- Cart abandonment rate
