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
- 1-2 (low): weak or partially relevant engagement
- 3 (moderate): generally correct and relevant, but limited depth/quality
- 4-5 (active): strong, accurate, and insightful engagement

promptCategory must match promptPoint:
- passive (0)
- low (1-2)
- moderate (3)
- active (4-5)

Return a single JSON object with keys:
chatTitle, content, promptPoint, promptCategory, promptFeedback

Rules:
- promptFeedback must be constructive, specific, and <= 120 characters.
- content must be a detailed evaluation, formatted in Markdown for display. Structure it as follows:
  1. **Praise** – Start with genuine praise for the user's effort to motivate them.
  2. **Evaluation** – A detailed assessment of their response against the assistant content.
  3. **Score justification** – Explain why they received their score (promptPoint).
  4. **Feedback** – Specific feedback on what worked and what could improve.
  5. **Examples** – 1–2 brief examples of stronger responses they could have given.
  Use Markdown: headings (##), bold (**), bullet lists (-), and line breaks for readability.
`.trim();
}

