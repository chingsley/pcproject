/** API response from chat provider (e.g., Gemini) */
export interface ApiChatResponse {
  /** Short summary for sidebar (truncate to 30 chars in UI) */
  chatTitle: string;
  /** AI text for display */
  content: string;
  /** Points earned (fixed at 5) */
  promptPoint: number;
  /** ISO timestamp */
  timestamp?: string;
}

/** Client-side message representation */
export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  /** Additional API field for assistant messages */
  promptPoint?: number;
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
