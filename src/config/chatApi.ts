import type { ApiChatResponse, ChatApiProvider } from '../types/chat';
import { geminiProvider } from './providers/gemini';
import { cohereProvider } from './providers/cohere';
import { simulatedAIChatProvider } from './providers/simulation';

const PROVIDER_MAP: Record<string, ChatApiProvider> = {
  gemini: geminiProvider,
  cohere: cohereProvider,
  simulation: simulatedAIChatProvider,
};

function getProvider(): ChatApiProvider {
  const providerName = import.meta.env.VITE_CHAT_PROVIDER || 'cohere';
  const provider = PROVIDER_MAP[providerName];

  if (!provider) {
    throw new Error(`Unknown chat provider: ${providerName}`);
  }

  return provider;
}

export async function generateChatResponse(
  prompt: string,
  options?: { temperature?: number; }
): Promise<ApiChatResponse> {
  const provider = getProvider();
  return provider.generateChatResponse(prompt, options);
}
