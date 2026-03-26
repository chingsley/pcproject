import type { RootState } from '../index';
import { getGameProgress } from '../../utils/gamePoints';
import type { LeaderboardEntry } from '../../constants/leaderboard.constants';
import {
  CURRENT_USER_ID,
  getNaturalLeaderboardTierForTotalPoints,
} from '../../constants/leaderboard.constants';
import { getMockLeaderboardEntriesForLevel } from '../../data/leaderboard.mock';

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
 * Leaderboard for the selected panel tier: mock rows, plus **You** only when that tier matches
 * your natural tier from total points (so browsing other levels does not show your row).
 */
export function selectLeaderboardWithUser(state: RootState): LeaderboardEntry[] {
  const userPoints = selectTotalPoints(state);
  const selectedTier = state.ui.leaderboardPanelTierLevel;
  const naturalTier = getNaturalLeaderboardTierForTotalPoints(userPoints);
  const mockRows = getMockLeaderboardEntriesForLevel(selectedTier);
  const entries: LeaderboardEntry[] = mockRows.map((e) => ({ ...e, isCurrentUser: false }));
  if (naturalTier === selectedTier) {
    entries.push({
      id: CURRENT_USER_ID,
      displayName: 'You',
      points: userPoints,
      isCurrentUser: true,
    });
  }
  return entries.sort((a, b) => b.points - a.points);
}

/**
 * Current user's rank on the leaderboard (1-based).
 */
export function selectUserRank(state: RootState): number {
  const leaderboard = selectLeaderboardWithUser(state);
  const idx = leaderboard.findIndex((e) => e.isCurrentUser);
  return idx === -1 ? 0 : idx + 1;
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
