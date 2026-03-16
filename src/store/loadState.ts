const CURRENT_STATE_URL = '/src/data/dummy/currentState.json';
const LOAD_TIMEOUT_MS = 1500;

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
    const data = await res.json();
    return data as Record<string, unknown>;
  } catch {
    return undefined;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
