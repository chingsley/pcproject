/**
 * Engagement evaluation prompts (buildEngagementEvaluationPrompt) are shared by all chat providers
 * (simulation, Cohere, Gemini, OpenAI) via generateChatResponse — keep `content` structure rules here in sync with demo copy in demoData.ts.
 */
export type EngagementType = 'summarize' | 'ask_questions' | 'paraphrase' | 'analyze';

const ENGAGEMENT_LABELS: Record<EngagementType, string> = {
  summarize: 'Summarize',
  ask_questions: 'Ask Questions',
  paraphrase: 'Paraphrase',
  analyze: 'Analyze',
};

export function buildEngagementEvaluationPrompt({
  engagementType,
  assistantResponse,
  userEngagementText,
}: {
  engagementType: EngagementType;
  assistantResponse: string;
  userEngagementText: string;
}): string {
  const engagementLabel = ENGAGEMENT_LABELS[engagementType];

  return `
Evaluate the user's engagement with the assistant response.

Assistant response:
"""
${assistantResponse}
"""

Engagement type: ${engagementLabel}
User engagement:
"""
${userEngagementText}
"""

Task:
- Judge the engagement's correctness and insightfulness vs the assistant response.
- Focus on whether the user's engagement matches the assistant content (for summarize/paraphrase) or is relevant and high-quality (for ask_questions/analyze).

Scoring (0-5) for promptPoint:
- 0 (passive): substitution / off-topic / no meaningful engagement / an exact or near (>=90%) copy of the assistant response
- 1 (low): minimal relevant engagement, very thin or vague
- 2 (low): partially relevant; some correct themes but missing key dimensions or depth
- 3 (moderate): generally correct and relevant, but limited depth/quality or mostly descriptive
- 4 (active): strong accuracy and insight; minor gap vs top band (e.g. one weaker implication)
- 5 (active): strong, accurate, and insightful engagement throughout

promptCategory must match promptPoint:
- passive (0)
- low (1-2)
- moderate (3)
- active (4-5)

Return a single JSON object with keys:
chatTitle, content, promptPoint, promptCategory, promptFeedback

Rules:
- promptFeedback must be constructive, specific, and <= 120 characters.
- content must be Markdown for display. Use exactly this structure (no other top-level sections):
  1. **Opening** – One or two short paragraphs: genuine praise or encouragement (tone should match the score—warmer for higher scores, constructive and supportive for lower ones).
  2. Blank line, then the heading \`## Feedback\` on its own line.
  3. **Under Feedback** – Several paragraphs that together cover: how their engagement compares to the assistant content, what worked, what to improve, and why the score fits. You may weave in short example phrases in prose; do not add a separate "examples" section.
  4. Blank line, then the heading \`## Score\` on its own line.
  5. **Under Score** – Exactly one line in this form: \`Score: N/5\` where N is the integer promptPoint you assign (0–5).
- Do **not** use headings or labels such as "Praise", "Evaluation", "Score Justification", or "Better Response Examples" as section titles.
- For promptPoint **2** (low): opening modest; feedback notes partial relevance and missing depth; end with \`Score: 2/5\`.
- For promptPoint **4** (active): opening strong; feedback notes solid insight with room for one sharper implication; end with \`Score: 4/5\`.
- Use Markdown sparingly elsewhere: **bold** for emphasis where helpful, optional bullet lists inside Feedback if they improve clarity.
`.trim();
}

