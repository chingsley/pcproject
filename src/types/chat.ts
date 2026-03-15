/** API response from chat provider (e.g., Gemini) */
export interface ApiChatResponse {
  /** Short summary for sidebar (truncate to 30 chars in UI) */
  chatTitle: string;
  /** Formatted AI text for display */
  msgResponse: string;
  /** Points earned (fixed at 5) */
  promptPoint: number;
  /** Message ID from API */
  messageId: number;
  /** Original user text */
  question: string;
  /** Raw AI response text */
  answer: string;
  /** ISO timestamp */
  timestamp?: string;
  /** Model identifier (e.g., "gemini-2.0-flash") */
  modelId?: string;
}

/** Client-side message representation */
export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  /** Additional API fields for assistant messages */
  msgResponse?: string;
  promptPoint?: number;
  question?: string;
  answer?: string;
  modelId?: string;
}

/** Client-side chat representation */
export interface Chat {
  id: string;
  title: string;
  points: number;
  createdAt: string;
}

/** Chat API provider interface */
export interface ChatApiProvider {
  generateChatResponse(
    prompt: string,
    options?: { temperature?: number }
  ): Promise<ApiChatResponse>;
}
