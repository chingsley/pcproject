import type { ApiChatResponse, ChatApiProvider } from '../types/chat';
import { geminiProvider } from './providers/gemini';
import { cohereProvider } from './providers/cohere';

const PROVIDER_MAP: Record<string, ChatApiProvider> = {
  gemini: geminiProvider,
  cohere: cohereProvider,
};

function getProvider(): ChatApiProvider {
  const providerName = import.meta.env.VITE_CHAT_PROVIDER || 'gemini';
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
