import type { Message } from '../types/chat';
import {
  getPromptCategoryFromPoint,
  getFallbackFeedback,
} from '../utils/promptScoring';

const CURRENT_STATE_URL = '/src/data/dummy/currentState.json';
const LOAD_TIMEOUT_MS = 1500;

interface PersistedChat {
  id: string;
  title: string;
  createdAt: string;
}

interface PersistedMessage {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  promptPoint?: number;
  promptCategory?: 'passive' | 'low' | 'moderate' | 'active';
  promptFeedback?: string;
}

function getMostRecentChatId(
  chatsById: Record<string, { createdAt: string }>,
  chatIds: string[]
): string | null {
  if (chatIds.length === 0) return null;
  return chatIds.reduce((latestId, id) => {
    const chat = chatsById[id];
    const latest = latestId ? chatsById[latestId] : null;
    if (!chat) return latestId;
    if (!latest) return id;
    return new Date(chat.createdAt) > new Date(latest.createdAt) ? id : latestId;
  }, null as string | null);
}

function isPersistedArrayChatShape(
  chat: Record<string, unknown>
): chat is Record<string, unknown> & {
  chats: PersistedChat[];
  messages: PersistedMessage[];
} {
  return Array.isArray(chat.chats) && Array.isArray(chat.messages);
}

function normalizeLegacyChatShape(chat: Record<string, unknown>) {
  if (!chat.chatsById || !chat.chatIds || !chat.messagesById || !chat.messageIdsByChatId) {
    return null;
  }

  const rawMessages = chat.messagesById as Record<string, PersistedMessage>;
  const messagesById: Record<string, Message> = {};
  for (const id of Object.keys(rawMessages)) {
    const m = rawMessages[id];
    if (m.role === 'assistant') {
      const point = typeof m.promptPoint === 'number' ? m.promptPoint : 0;
      const category =
        m.promptCategory && ['passive', 'low', 'moderate', 'active'].includes(m.promptCategory)
          ? m.promptCategory
          : getPromptCategoryFromPoint(point);
      const feedback =
        typeof m.promptFeedback === 'string' && m.promptFeedback.trim()
          ? m.promptFeedback.trim()
          : getFallbackFeedback(category);
      messagesById[id] = {
        id: m.id,
        chatId: m.chatId,
        role: 'assistant',
        content: m.content,
        timestamp: m.timestamp,
        promptPoint: point,
        promptCategory: category,
        promptFeedback: feedback,
      };
    } else {
      messagesById[id] = {
        id: m.id,
        chatId: m.chatId,
        role: 'user',
        content: m.content,
        timestamp: m.timestamp,
      };
    }
  }
  return {
    chatsById: chat.chatsById as Record<string, { id: string; title: string; createdAt: string }>,
    chatIds: chat.chatIds as string[],
    messagesById,
    messageIdsByChatId: chat.messageIdsByChatId as Record<string, string[]>,
  };
}

function normalizeArrayChatShape(chat: Record<string, unknown>) {
  if (!isPersistedArrayChatShape(chat)) return null;

  const chatsById: Record<string, PersistedChat> = {};
  const chatIds: string[] = [];
  for (const chatItem of chat.chats) {
    chatsById[chatItem.id] = chatItem;
    chatIds.push(chatItem.id);
  }

  const messagesById: Record<string, Message> = {};
  const messageIdsByChatId: Record<string, string[]> = {};
  for (const id of chatIds) {
    messageIdsByChatId[id] = [];
  }

  for (const message of chat.messages) {
    let hydrated: Message;
    if (message.role === 'assistant') {
      const point = typeof message.promptPoint === 'number' ? message.promptPoint : 0;
      const category =
        message.promptCategory && ['passive', 'low', 'moderate', 'active'].includes(message.promptCategory)
          ? message.promptCategory
          : getPromptCategoryFromPoint(point);
      const feedback =
        typeof message.promptFeedback === 'string' && message.promptFeedback.trim()
          ? message.promptFeedback.trim()
          : getFallbackFeedback(category);
      hydrated = {
        id: message.id,
        chatId: message.chatId,
        role: 'assistant',
        content: message.content,
        timestamp: message.timestamp,
        promptPoint: point,
        promptCategory: category,
        promptFeedback: feedback,
      };
    } else {
      hydrated = {
        id: message.id,
        chatId: message.chatId,
        role: 'user',
        content: message.content,
        timestamp: message.timestamp,
      };
    }
    messagesById[message.id] = hydrated;
    if (!messageIdsByChatId[message.chatId]) {
      messageIdsByChatId[message.chatId] = [];
    }
    messageIdsByChatId[message.chatId].push(message.id);
  }

  return {
    chatsById,
    chatIds,
    messagesById,
    messageIdsByChatId,
  };
}

/** Load state from currentState.json (served by Vite). Falls back to undefined to use slice defaults. */
export async function loadState(): Promise<Record<string, unknown> | undefined> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);
  try {
    const res = await fetch(CURRENT_STATE_URL, {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as Record<string, unknown>;
    const chat = data?.chat as Record<string, unknown> | undefined;
    if (chat) {
      const normalizedChat =
        normalizeArrayChatShape(chat) ?? normalizeLegacyChatShape(chat);

      if (normalizedChat) {
        data.chat = {
          ...normalizedChat,
          activeChatId: getMostRecentChatId(
            normalizedChat.chatsById as Record<string, { createdAt: string }>,
            normalizedChat.chatIds
          ),
          sendingMessageChatId: null,
          sendError: null,
          lastAddedAssistantMessageId: null,
        };
      }
    }
    return data;
  } catch {
    return undefined;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
