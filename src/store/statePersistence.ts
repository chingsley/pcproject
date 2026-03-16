import type { RootState } from './index';

export const PERSIST_DEBOUNCE_MS = 300;

/**
 * Persist only durable data. Runtime/transient flags are reset.
 */
export function toPersistedState(state: RootState) {
  return {
    ui: state.ui,
    points: state.points,
    user: state.user,
    chat: {
      ...state.chat,
      activeChatId: null,
      sendingMessageChatId: null,
      sendError: null,
      lastAddedAssistantMessageId: null,
    },
  };
}

export function serializePersistedState(state: RootState): string {
  return JSON.stringify(toPersistedState(state));
}
