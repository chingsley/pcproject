import type { RootState } from '../index';
import { getGameProgress } from '../../utils/gamePoints';

/**
 * Sum of promptPoint from all assistant messages in a chat.
 * Single source of truth: points come from messages, not stored on chat.
 */
export function selectChatPoints(state: RootState, chatId: string): number {
  const messageIds = state.chat.messageIdsByChatId[chatId];
  if (!messageIds) return 0;

  return messageIds.reduce((sum, msgId) => {
    const msg = state.chat.messagesById[msgId];
    if (msg?.role === 'assistant' && typeof msg.promptPoint === 'number') {
      return sum + msg.promptPoint;
    }
    return sum;
  }, 0);
}

/**
 * Total points across all chats (sum of all assistant message promptPoints).
 */
export function selectTotalPoints(state: RootState): number {
  const { messagesById } = state.chat;
  return Object.values(messagesById).reduce((sum, msg) => {
    if (msg.role === 'assistant' && typeof msg.promptPoint === 'number') {
      return sum + msg.promptPoint;
    }
    return sum;
  }, 0);
}

/**
 * Game progress derived from total points (stars, ring %, next target).
 */
export function selectGameProgress(state: RootState) {
  const totalPoints = selectTotalPoints(state);
  return getGameProgress(totalPoints);
}

/** Chat list item with computed points for sidebar display */
export interface ChatWithPoints {
  id: string;
  title: string;
  createdAt: string;
  points: number;
}

/**
 * Chats in display order with computed points (for ChatSection / ChatList).
 */
export function selectChatsWithPoints(state: RootState): ChatWithPoints[] {
  return state.chat.chatIds
    .map((id) => {
      const chat = state.chat.chatsById[id];
      if (!chat) return null;
      return {
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt,
        points: selectChatPoints(state, id),
      };
    })
    .filter((c): c is ChatWithPoints => c !== null);
}
