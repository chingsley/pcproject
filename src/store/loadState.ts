const CURRENT_STATE_URL = '/src/data/dummy/currentState.json';
const LOAD_TIMEOUT_MS = 1500;

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
    if (chat && chat.chatsById && chat.chatIds) {
      chat.activeChatId = getMostRecentChatId(
        chat.chatsById as Record<string, { createdAt: string }>,
        chat.chatIds as string[]
      );
    }
    return data;
  } catch {
    return undefined;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
