import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';
import { normalizePromptScoring } from '../../utils/promptScoring';

export const simulatedAIChatProvider: ChatApiProvider = {
  async generateChatResponse(prompt: string): Promise<ApiChatResponse> {
    return new Promise<ApiChatResponse>((resolve) => {
      setTimeout(() => {
        const scoring = normalizePromptScoring({
          promptText: prompt,
        });

        resolve({
          chatTitle: 'Theory-driven prompt review', // { CURSORPROMPT: update this to be simuation prompt 1, simulation prompt 2, etc depending, assume 1, 2 ... are the chat id.}
          content:
            'Simulation mode: this response mirrors production scoring behavior. Use critique-focused prompts to earn higher engagement points.',
          promptPoint: scoring.promptPoint,
          promptCategory: scoring.promptCategory,
          promptFeedback: scoring.promptFeedback,
          timestamp: new Date().toISOString(),
        });
      }, 2000); // simulate ~2s API latency
    });
  },
};
