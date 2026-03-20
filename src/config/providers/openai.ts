import OpenAI from 'openai';
import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';
import { sanitizeJsonForParse } from '../../utils/jsonParse';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const openaiProvider: ChatApiProvider = {
  async generateChatResponse(
    prompt: string,
    options = {}
  ): Promise<ApiChatResponse> {
    const { temperature = 0.7, systemMessage: customSystemMessage } = options;

    const systemMessage =
      customSystemMessage ??
      `You are a helpful AI assistant. Respond with a JSON object in this exact format:
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

Respond ONLY with the JSON object, no additional text.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
      throw new Error('No response text from OpenAI API');
    }

    const sanitized = sanitizeJsonForParse(text.trim());
    const parsed = JSON.parse(sanitized) as ApiChatResponse;
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
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: systemMessage ?? 'Return ONLY valid JSON. No markdown, no extra text.',
        },
        { role: 'user', content: prompt },
      ],
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
      throw new Error('No response text from OpenAI API');
    }
    return text.trim();
  },
};