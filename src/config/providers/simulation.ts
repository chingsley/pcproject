import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';
import { normalizePromptScoring } from '../../utils/promptScoring';
import {
  DEMO_ENGAGEMENT_CASES,
  DEMO_PROMPT_CASES,
  DEMO_QUIZ_EVALUATIONS,
  DEMO_QUIZ_QUESTION_SETS,
  type DemoEngagementCase,
  type DemoPromptCase,
} from '../../data/demo/demoData';
import { SIMULATED_API_LATENCY_MS } from '../../constants/simulation.constants';

function normalizeText(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

function withTimestamp(response: ApiChatResponse): ApiChatResponse {
  return {
    ...response,
    timestamp: response.timestamp || new Date().toISOString(),
  };
}

function findDemoPromptCase(prompt: string): DemoPromptCase | undefined {
  const normalizedPrompt = normalizeText(prompt);
  return DEMO_PROMPT_CASES.find(
    (item) => normalizeText(item.prompt) === normalizedPrompt
  );
}

function extractQuotedBlock(prompt: string, marker: string): string | null {
  const markerIndex = prompt.indexOf(marker);
  if (markerIndex < 0) return null;
  const tripleQuoteStart = prompt.indexOf('"""', markerIndex);
  if (tripleQuoteStart < 0) return null;
  const tripleQuoteEnd = prompt.indexOf('"""', tripleQuoteStart + 3);
  if (tripleQuoteEnd < 0) return null;
  return prompt.slice(tripleQuoteStart + 3, tripleQuoteEnd).trim();
}

function parseEngagementEvaluationPrompt(prompt: string): {
  engagementType: DemoEngagementCase['engagementType'];
  userEngagementText: string;
} | null {
  if (!prompt.includes("Evaluate the user's engagement with the assistant response.")) {
    return null;
  }

  const engagementTypeMatch = prompt.match(/Engagement type:\s*(.+)/);
  if (!engagementTypeMatch) return null;

  const engagementLabel = engagementTypeMatch[1].trim().toLowerCase();
  let engagementType: DemoEngagementCase['engagementType'] | null = null;

  if (engagementLabel === 'summarize') engagementType = 'summarize';
  else if (engagementLabel === 'ask questions') engagementType = 'ask_questions';
  else if (engagementLabel === 'paraphrase') engagementType = 'paraphrase';
  else if (engagementLabel === 'analyze') engagementType = 'analyze';

  if (!engagementType) return null;

  const userEngagementText = extractQuotedBlock(prompt, 'User engagement:');
  if (!userEngagementText) return null;

  return { engagementType, userEngagementText };
}

function normalizeForEngagementMatch(text: string): string {
  const unicodeNormalized = text
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
    .replace(/[\u201c\u201d\u201e\u201f\u2033\u2036"]/g, '"')
    .replace(/[\u2013\u2014]/g, '-');
  return normalizeText(unicodeNormalized);
}

function findDemoEngagementCase(prompt: string): DemoEngagementCase | undefined {
  const parsed = parseEngagementEvaluationPrompt(prompt);
  if (!parsed) return undefined;
  const normalizedUser = normalizeForEngagementMatch(parsed.userEngagementText);
  return DEMO_ENGAGEMENT_CASES.find(
    (item) =>
      item.engagementType === parsed.engagementType &&
      normalizeForEngagementMatch(item.userEngagementText) === normalizedUser
  );
}

function parseQuizCorrectCount(prompt: string): number {
  const answersBlock = extractQuotedBlock(prompt, "User's answers:");
  if (!answersBlock) return 0;
  let correct = 0;
  const selectedMatch = answersBlock.matchAll(/Selected:\s*(.+?)(?:\n|$)/g);
  const correctMatch = answersBlock.matchAll(/Correct:\s*(.+?)(?:\n|$)/g);
  const selected = [...selectedMatch].map((m) => m[1].trim());
  const correctAnswers = [...correctMatch].map((m) => m[1].trim());
  for (let i = 0; i < Math.min(selected.length, correctAnswers.length); i++) {
    if (selected[i] === correctAnswers[i]) correct++;
  }
  return correct;
}

function isQuizQuestionsPrompt(prompt: string): boolean {
  return prompt.includes('Generate 3 multiple-choice questions') || prompt.includes('multiple-choice questions');
}

function isQuizEvaluationPrompt(prompt: string): boolean {
  return prompt.includes("Evaluate the user's quiz answers");
}

export const simulatedAIChatProvider: ChatApiProvider = {
  async generateRawResponse(prompt: string): Promise<string> {
    const delayMs = 1200 + Math.random() * 800;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (isQuizQuestionsPrompt(prompt)) {
          const setIndex = Math.floor(Math.random() * DEMO_QUIZ_QUESTION_SETS.length);
          const questions = DEMO_QUIZ_QUESTION_SETS[setIndex];
          resolve(JSON.stringify({ questions }));
          return;
        }
        if (isQuizEvaluationPrompt(prompt)) {
          const correctCount = Math.min(3, Math.max(0, parseQuizCorrectCount(prompt)));
          const evaluation = DEMO_QUIZ_EVALUATIONS[correctCount] ?? DEMO_QUIZ_EVALUATIONS[0];
          resolve(
            JSON.stringify({
              chatTitle: 'Quiz Results',
              ...evaluation,
              timestamp: new Date().toISOString(),
            })
          );
          return;
        }
        resolve(JSON.stringify({ questions: [] }));
      }, delayMs);
    });
  },

  async generateChatResponse(prompt: string): Promise<ApiChatResponse> {
    return new Promise<ApiChatResponse>((resolve) => {
      setTimeout(() => {
        const demoPromptCase = findDemoPromptCase(prompt);
        if (demoPromptCase) {
          resolve(withTimestamp(demoPromptCase.response));
          return;
        }

        const demoEngagementCase = findDemoEngagementCase(prompt);
        if (demoEngagementCase) {
          resolve(withTimestamp(demoEngagementCase.response));
          return;
        }

        const parsedEngagement = parseEngagementEvaluationPrompt(prompt);
        const isEngagementPrompt = parsedEngagement !== null;
        const scoring = isEngagementPrompt
          ? { promptPoint: 0, promptCategory: 'passive' as const, promptFeedback: 'Use one of the demo summary samples from DEMO_DATA.md for exact scoring.' }
          : normalizePromptScoring({ promptText: prompt });

        resolve({
          chatTitle: isEngagementPrompt ? 'Engagement review' : 'Simulation fallback response',
          content: isEngagementPrompt
            ? 'No demo match found for this engagement. Use the exact sample text from DEMO_DATA.md to test scoring.'
            : 'Simulation mode fallback: no exact demo mapping found for this prompt. Use one of the predefined demo prompts to replay the scripted walkthrough.',
          promptPoint: scoring.promptPoint,
          promptCategory: scoring.promptCategory,
          promptFeedback: scoring.promptFeedback,
          timestamp: new Date().toISOString(),
        });
      }, SIMULATED_API_LATENCY_MS); // simulate ~2s API latency
    });
  },
};
