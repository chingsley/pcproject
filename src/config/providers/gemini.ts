import { GoogleGenAI } from '@google/genai';
import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
});

export const geminiProvider: ChatApiProvider = {
  async generateChatResponse(
    prompt: string,
    options = {}
  ): Promise<ApiChatResponse> {
    const { temperature = 1, systemMessage: customSystemMessage } = options;

    // System instruction for structured JSON response (or custom for quiz etc.)
    const defaultSystemPrompt = `You are a helpful AI assistant. Respond with a JSON object in this exact format:
{
  "chatTitle": "A brief 3-5 word summary of the user's question",
  "content": "Your detailed, helpful response to the user's question",
  "promptPoint": 0,
  "promptCategory": "passive|low|moderate|active",
  "promptFeedback": "One short coaching sentence (max 120 chars)"
}

Rules:
- chatTitle should be concise (max 30 characters)
- content should be well-formatted and helpful
- Score promptPoint from 0 to 5 based on user prompt quality:
  - 0: asks you to do the thinking/writing for them (substitution)
  - 1-2: basic informational prompt with low engagement
  - 3: asks for structure/clarity on user's own ideas
  - 4-5: asks to analyse, critique, question assumptions, evidence, or alignment
- promptCategory must match promptPoint:
  - 0 => passive
  - 1-2 => low
  - 3 => moderate
  - 4-5 => active
- promptFeedback should be constructive and specific to the prompt style

User question: ${prompt}

Respond ONLY with the JSON object, no additional text.`;

    const systemPrompt = customSystemMessage ?? defaultSystemPrompt;
    const contents = customSystemMessage
      ? `${systemPrompt}\n\nUser: ${prompt}`
      : systemPrompt;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        maxOutputTokens: 2000,
        temperature,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error('No response text from API');
    }

    const parsed = JSON.parse(text) as ApiChatResponse;

    // Add timestamp if not provided by API
    if (!parsed.timestamp) {
      parsed.timestamp = new Date().toISOString();
    }

    return parsed;
  },

  async generateRawResponse(
    prompt: string,
    options = {}
  ): Promise<string> {
    const { temperature = 0.5, systemMessage } = options;
    const contents = `${systemMessage ?? 'Return ONLY valid JSON. No markdown, no extra text.'}\n\nUser: ${prompt}`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        maxOutputTokens: 2000,
        temperature,
        responseMimeType: 'application/json',
      },
    });
    const text = response.text;
    if (!text) throw new Error('No response text from API');
    return text.trim();
  },
};
