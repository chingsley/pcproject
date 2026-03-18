import type { RootState } from './index';

export const PERSIST_DEBOUNCE_MS = 300;

/**
 * Persist only durable data. Runtime/transient flags are reset.
 */
export function toPersistedState(state: RootState) {
  const chats = state.chat.chatIds
    .map((id) => state.chat.chatsById[id])
    .filter((chat): chat is RootState['chat']['chatsById'][string] => Boolean(chat));

  const messages = state.chat.chatIds.flatMap((chatId) => {
    const ids = state.chat.messageIdsByChatId[chatId] ?? [];
    return ids
      .map((id) => state.chat.messagesById[id])
      .filter((message): message is RootState['chat']['messagesById'][string] =>
        Boolean(message)
      );
  });

  return {
    ui: {
      ...state.ui,
      engagementContext: null,
    },
    chat: {
      chats,
      messages,
    },
  };
}

export function serializePersistedState(state: RootState): string {
  return JSON.stringify(toPersistedState(state));
}
