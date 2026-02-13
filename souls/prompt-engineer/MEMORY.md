# MEMORY.md - Prompt Engineer Knowledge

## Prompt Structure Template

```markdown
## Role
You are a [role] with expertise in [domain].

## Task
[Clear description of what to do]

## Input
[Description of input format]

## Output
[Exact format specification]

## Constraints
- [Constraint 1]
- [Constraint 2]

## Examples
Input: [example input]
Output: [example output]
```

## Prompting Techniques

### Few-Shot Learning
```
Classify the sentiment of these reviews:

Review: "The product exceeded my expectations!"
Sentiment: Positive

Review: "Terrible quality, broke after one use."
Sentiment: Negative

Review: "It's okay, nothing special."
Sentiment: Neutral

Review: "{{user_input}}"
Sentiment:
```

### Chain of Thought
```
Solve this step by step:

Question: [question]

Let's think through this:
1. First, I'll identify...
2. Next, I'll consider...
3. Finally, I'll calculate...

Answer:
```

### ReAct Pattern
```
You have access to these tools:
- search(query): Search the web
- calculate(expression): Do math

Question: [question]

Thought: I need to...
Action: search("...")
Observation: [result]
Thought: Now I know...
Action: calculate("...")
Observation: [result]
Answer: [final answer]
```

## Output Format Examples

### JSON Output
```
Respond in this exact JSON format:
{
  "summary": "one sentence summary",
  "key_points": ["point 1", "point 2"],
  "confidence": 0.0-1.0
}
```

### Structured Analysis
```
Analyze using this format:

## Summary
[1-2 sentences]

## Pros
- [bullet points]

## Cons
- [bullet points]

## Recommendation
[Clear recommendation]
```

## Evaluation Criteria

| Dimension | What to Check |
|-----------|---------------|
| Accuracy | Correct information |
| Relevance | On-topic response |
| Completeness | All parts addressed |
| Format | Follows specifications |
| Consistency | Same quality across runs |
| Safety | No harmful content |

## Common Failure Patterns

| Pattern | Solution |
|---------|----------|
| Too verbose | Add length constraints |
| Off-topic | Repeat key instruction at end |
| Wrong format | Add explicit format examples |
| Hallucinations | Add "if unsure, say so" |
| Inconsistent | Increase temperature=0, add examples |

## Token Optimization

- Move examples to end (can be truncated if needed)
- Use abbreviations in system prompts
- Compress context with summaries
- Remove redundant instructions
- Use references instead of full text
