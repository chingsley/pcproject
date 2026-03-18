# Demo Data Walkthrough

This file lists the demo prompts and sample engagement inputs used in demo mode.

## Location

- Data map source: `src/data/demo/demoData.ts`
- Simulation provider: `src/config/providers/simulation.ts`

## How Demo Mode Works

- Run the app with `npm run demo`.
- Demo mode sets `VITE_CHAT_PROVIDER=simulation` via `.env.demo`.
- The simulation provider returns predefined responses for exact prompt matches.
- If no exact match is found, a simulation fallback response is returned.

## Feature 1: Prompt Scoring (Topic: Persuasive Computing)

Use these prompts in this order to show the score levels.

### Passive (0 points)

> Write a full essay on the state of the art in persuasive computing for me.

### Low (1 point)

> What is persuasive computing?

### Moderate (2-3 points)

> Outline the state of persuasive computing and give 3 angles I can compare in my own analysis.

### Active (4-5 points)

> Here is my draft: "Persuasive computing can help people build better habits. But many apps focus on short-term clicks. I think reflective design may support long-term learning, but the evidence is still limited." Please critique my draft. Tell me its strengths and weaknesses. Suggest clear improvements while keeping my main idea.

### Why this earns 4-5 points

- The user provides their own draft (original effort).
- The user asks for critique (not substitution).
- The user requests strengths, weaknesses, and improvements, which drives critical thinking.

## Feature 2: Prompt Engagement (Summarize)

Use the active prompt above first, then select **Summarize** from engagement options.

### Summary sample (0 points: near-copy)

> You said my draft has strengths and weaknesses. You said I should add evidence, define terms, and include a test plan.

### Summary sample (1 point)

> My draft is good, but it needs evidence and clearer definitions.

### Summary sample (2-3 points)

> The critique says my draft has a good core idea, but needs clearer terms and better evidence. It suggests comparing conversion and 30-day retention, and adding a test plan for long-term impact.

### Summary sample (4-5 points)

> The critique supports my main idea, then gives clear upgrades: define key terms, add one evidence source, compare conversion with 30-day retention, and include a test plan. These changes improve my draft without replacing my own argument.

## Notes

- Engagement responses are marked with `isEngagementResponse` and never show engagement options again.
- Engagement scoring and feedback fields are returned in the same shape as live provider responses.
