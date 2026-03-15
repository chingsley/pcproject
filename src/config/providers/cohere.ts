import { CohereClientV2 } from 'cohere-ai';
import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';

const cohere = new CohereClientV2({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

export const cohereProvider: ChatApiProvider = {
  async generateChatResponse(
    prompt: string,
    options = {}
  ): Promise<ApiChatResponse> {
    const { temperature = 0.7 } = options;

    // System message for structured JSON response
    const systemMessage = `You are a helpful AI assistant. You must respond with a JSON object in the following format:
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

    const parsed = JSON.parse(jsonText) as ApiChatResponse;

    // Add timestamp and modelId if not provided by API
    if (!parsed.timestamp) {
      parsed.timestamp = new Date().toISOString();
    }
    if (!parsed.modelId) {
      parsed.modelId = 'command-r-plus';
    }

    return parsed;
  },
};
