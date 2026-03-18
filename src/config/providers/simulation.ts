import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';
import { normalizePromptScoring } from '../../utils/promptScoring';
import {
  DEMO_ENGAGEMENT_CASES,
  DEMO_PROMPT_CASES,
  type DemoEngagementCase,
  type DemoPromptCase,
} from '../../data/demo/demoData';

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

function findDemoEngagementCase(prompt: string): DemoEngagementCase | undefined {
  const parsed = parseEngagementEvaluationPrompt(prompt);
  if (!parsed) return undefined;
  const normalizedUserEngagementText = normalizeText(parsed.userEngagementText);
  return DEMO_ENGAGEMENT_CASES.find(
    (item) =>
      item.engagementType === parsed.engagementType &&
      normalizeText(item.userEngagementText) === normalizedUserEngagementText
  );
}

export const simulatedAIChatProvider: ChatApiProvider = {
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

        const scoring = normalizePromptScoring({
          promptText: prompt,
        });

        resolve({
          chatTitle: 'Simulation fallback response',
          content:
            'Simulation mode fallback: no exact demo mapping found for this prompt. Use one of the predefined demo prompts to replay the scripted walkthrough.',
          promptPoint: scoring.promptPoint,
          promptCategory: scoring.promptCategory,
          promptFeedback: scoring.promptFeedback,
          timestamp: new Date().toISOString(),
        });
      }, 2000); // simulate ~2s API latency
    });
  },
};
