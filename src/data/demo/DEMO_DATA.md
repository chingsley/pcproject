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

Start with this prompt, then select **Summarize** from engagement options.

### Feature 2 starter prompt

> Tell me about the state of the art in persuasive computing systems.

This returns a detailed summary response to engage with.

### Summary sample (0 points: near-copy)

> Persuasive computing systems are used in health, education, finance, and productivity. The field moved from fixed reminders to adaptive systems with context. Strengths include personalization, real-time feedback, experimentation, and multimodal delivery. Weaknesses include short-term optimization, engagement not equal outcomes, variation across groups, and ethics concerns.

### Summary sample (1 point)

> It says persuasive systems are getting better, but they still have problems with ethics and long-term results.

### Summary sample (2-3 points)

> The response says modern persuasive systems are strong at personalization and real-time feedback, but still weak on long-term behavior change and ethics. It also says research is shifting toward user agency and better long-term evaluation.

### Summary sample (4-5 points)

> The response shows that persuasive systems are advanced in personalization, testing, and cross-device delivery, but still weak in proving durable change and protecting user autonomy. Its key message is that engagement metrics are not enough. Future systems should prioritize agency, transparent nudging, and long-term evaluation like retention and behavior transfer.

## Notes

- Engagement responses are marked with `isEngagementResponse` and never show engagement options again.
- Engagement scoring and feedback fields are returned in the same shape as live provider responses.
