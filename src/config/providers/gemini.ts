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
    const { temperature = 1 } = options;

    // System instruction for structured JSON response
    const systemPrompt = `You are a helpful AI assistant. You must respond with a JSON object in the following format:
{
  "chatTitle": "A brief 3-5 word summary of the user's question",
  "msgResponse": "Your detailed, helpful response to the user's question",
  "promptPoint": 5,
  "messageId": 1,
  "question": "The exact user question",
  "answer": "Your response text"
}

Rules:
- chatTitle should be concise (max 30 characters)
- msgResponse should be well-formatted and helpful
- promptPoint is always 5
- messageId can be any positive integer
- question should echo the user's input
- answer is the same as msgResponse

User question: ${prompt}

Respond ONLY with the JSON object, no additional text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: systemPrompt,
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

    // Add timestamp and modelId if not provided by API
    if (!parsed.timestamp) {
      parsed.timestamp = new Date().toISOString();
    }
    if (!parsed.modelId) {
      parsed.modelId = 'gemini-2.0-flash';
    }

    return parsed;
  },
};
