import { CohereClientV2 } from 'cohere-ai';
import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';
import { sanitizeJsonForParse } from '../../utils/jsonParse';

const cohere = new CohereClientV2({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

export const cohereProvider: ChatApiProvider = {
  async generateChatResponse(
    prompt: string,
    options = {}
  ): Promise<ApiChatResponse> {
    const { temperature = 0.7, systemMessage: customSystemMessage } = options;

    // System message for structured JSON response (or custom for quiz etc.)
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

    const response = await cohere.chat({
      // model: 'command-r-plus',
      model: 'command-a-03-2025',
      messages: [
        {
          role: 'system',
          content: systemMessage,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature,
    });

    // Extract text from response content
    const content = response.message?.content;
    if (!content || content.length === 0) {
      throw new Error('No response content from Cohere API');
    }

    // Find the text content item
    const textContent = content.find((item) => item.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content found in Cohere response');
    }

    const text = textContent.text;

    if (!text) {
      throw new Error('No response text from Cohere API');
    }

    // Try to extract JSON from response (Cohere might wrap it in markdown)
    let jsonText = text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Escape unescaped control chars in string literals (LLMs sometimes return invalid JSON)
    const sanitized = sanitizeJsonForParse(jsonText);
    const parsed = JSON.parse(sanitized) as ApiChatResponse;

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
    const response = await cohere.chat({
      model: 'command-a-03-2025',
      messages: [
        { role: 'system', content: systemMessage ?? 'Return ONLY valid JSON. No markdown, no extra text.' },
        { role: 'user', content: prompt },
      ],
      temperature,
    });
    const content = response.message?.content;
    if (!content?.length) throw new Error('No response content from Cohere API');
    const textContent = content.find((item) => item.type === 'text');
    if (!textContent || textContent.type !== 'text') throw new Error('No text content in Cohere response');
    const text = textContent.text;
    if (!text) throw new Error('No response text from Cohere API');
    let out = text.trim();
    if (out.startsWith('```json')) out = out.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    else if (out.startsWith('```')) out = out.replace(/^```\s*/, '').replace(/\s*```$/, '');
    return out;
  },
};
