export type PromptCategory = 'passive' | 'low' | 'moderate' | 'active';

/** API response from chat provider (e.g., Gemini) */
export interface ApiChatResponse {
  /** Short summary for sidebar (truncate to 30 chars in UI) */
  chatTitle: string;
  /** AI text for display */
  content: string;
  /** Points earned from engagement rubric (0-5) */
  promptPoint: number;
  /** Optional rubric band returned by provider */
  promptCategory?: PromptCategory;
  /** Optional short coaching text returned by provider */
  promptFeedback?: string;
  /** ISO timestamp */
  timestamp?: string;
}

/** User message (no scoring fields) */
export interface UserMessage {
  id: string;
  chatId: string;
  role: 'user';
  content: string;
  timestamp: string;
}

/** Assistant message (scoring fields required for UI) */
export interface AssistantMessage {
  id: string;
  chatId: string;
  role: 'assistant';
  content: string;
  timestamp: string;
  promptPoint: number;
  promptCategory: PromptCategory;
  promptFeedback: string;
  /** True when this is an evaluation response to user engagement; no engage buttons. */
  isEngagementResponse?: boolean;
}

/** Client-side message representation */
export type Message = UserMessage | AssistantMessage;

/** Client-side chat representation. Points are computed from assistant messages via selectors. */
export interface Chat {
  id: string;
  title: string;
  createdAt: string;
}

/** Chat API provider interface */
export interface ChatApiProvider {
  generateChatResponse(
    prompt: string,
    options?: { temperature?: number; }
  ): Promise<ApiChatResponse>;
}
