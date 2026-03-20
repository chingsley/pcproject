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

## Feature 3: Quiz (Ask Questions)

The **Ask Questions** engagement option shows multiple-choice questions about the AI response. Scoring is **all-or-nothing**: you earn 5 bonus points only if you answer all questions correctly. Otherwise you get 0 points.

### How to test the quiz in demo mode

1. **Start with a prompt that returns substantial content** (at least ~100 characters and 2+ sentences). Use the engagement starter prompt:

   > Tell me about the state of the art in persuasive computing systems.

2. **Click "Ask Questions"** in the engagement options below the AI response.

3. **Wait for questions to load** (~1.2–2 seconds in demo mode). A random set of 3 questions is fetched each time.

4. **Answer the questions** by clicking the correct option. Each try uses one of 3 question sets – see below for correct answers.

5. **Click "Submit answers"** to receive your score and feedback.

6. **Retry if needed:** If you get 0 points, click **Ask Questions** again to try a new set of questions. Each click fetches a different (random) set.

### Demo quiz scoring (all-or-nothing)

| Result | Points | Category |
|--------|--------|----------|
| Any wrong (0/3, 1/3, 2/3) | 0 | passive |
| All correct (3/3) | 5 | active |

### Correct answers by question set

Demo mode has 3 question sets. The simulation randomly returns one on each fetch.

**Set 1**
- Q1: Main strengths → **A** (Personalization, real-time feedback, experimentation, multimodal delivery)
- Q2: Key weakness → **B** (They optimize short-term clicks instead of long-term change)
- Q3: Research direction → **B** (Systems that support user agency and long-term evaluation)

**Set 2**
- Q1: Strength of current systems → **B** (Personalization and real-time feedback)
- Q2: Why engagement ≠ outcomes → **B** (Engagement metrics can miss long-term behavior change)
- Q3: Future priority → **B** (User agency, transparent nudging, and long-term evaluation)

**Set 3**
- Q1: Evolution from older tools → **B** (From fixed rules to context-aware, adaptive systems)
- Q2: Ethical concern → **B** (Manipulation risk, weak consent, limited transparency)
- Q3: Research focus → **B** (User agency and sustained outcomes)

### Other prompts that work for the quiz

Any demo prompt that returns content long enough to show engagement options will work:

- **Tell me about the state of the art in persuasive computing systems.** (recommended – detailed content)
- **Outline the state of persuasive computing and give 3 angles I can compare in my own analysis.**
- **Here is my draft: "Persuasive computing can help people build better habits..."** (critique response)

Very short or single-sentence responses (e.g. greetings) do not show engagement options. All demo prompts above return content long enough for the quiz.

## Notes

- Engagement responses are marked with `isEngagementResponse` and never show engagement options again.
- Engagement scoring and feedback fields are returned in the same shape as live provider responses.
- Quiz questions and evaluations in demo mode come from `DEMO_QUIZ_QUESTION_SETS` and `DEMO_QUIZ_EVALUATIONS` in `demoData.ts`. Each fetch uses `setTimeout` (1.2–2 s) to simulate API latency and randomly selects one of the 3 question sets.
