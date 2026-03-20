/**
 * Builds the prompt for generating multiple-choice questions from assistant content.
 */
export function buildQuizQuestionsPrompt(assistantResponse: string): string {
  return `
Generate 3 multiple-choice questions to test comprehension of the following content.
Each question should have exactly 4 options, with one correct answer.

Content:
"""
${assistantResponse}
"""

Rules:
- Questions must be answerable from the content alone.
- Avoid trivial or overly obvious questions.
- Mix difficulty: 1 easier, 1 medium, 1 harder.
- Options should be plausible; wrong answers should be reasonable distractors.
- correctIndex is 0-based (0 = first option, 1 = second, etc.).

Return ONLY a JSON object with this exact structure (no markdown, no extra text):
{
  "questions": [
    {
      "id": "q1",
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0
    }
  ]
}
`.trim();
}

import { QUIZ_BONUS_POINTS } from '../constants/engagement.constants';

/**
 * Builds the prompt for evaluating quiz answers and awarding bonus points.
 */
export function buildQuizEvaluationPrompt(
  assistantResponse: string,
  questions: Array<{ id: string; question: string; options: string[]; correctIndex: number; }>,
  userAnswers: Array<{ questionId: string; selectedIndex: number; }>
): string {
  const answersSummary = userAnswers
    .map((a) => {
      const q = questions.find((q) => q.id === a.questionId);
      const selected = q ? q.options[a.selectedIndex] : '?';
      const correct = q ? q.options[q.correctIndex] : '?';
      return `Q: ${q?.question || '?'}\nSelected: ${selected}\nCorrect: ${correct}`;
    })
    .join('\n\n');

  return `
Evaluate the user's quiz answers against the correct answers.

Original content:
"""
${assistantResponse}
"""

User's answers:
"""
${answersSummary}
"""

Task:
- Count correct answers (selectedIndex matches correctIndex for each question).
- Return a JSON object with keys: chatTitle, content, promptPoint, promptCategory, promptFeedback, correctCount, totalCount
- correctCount and totalCount must be numbers (correctCount = number of correct answers, totalCount = ${questions.length})
- promptPoint: ${QUIZ_BONUS_POINTS} if all correct, 0 otherwise
- promptCategory: "active" if all correct, "passive" otherwise
- content and promptFeedback: any short message (our system replaces these with canonical messages for display)
`.trim();
}
