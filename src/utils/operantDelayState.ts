import {
  PASSIVE_ZERO_PROMPT_QUOTA_PER_WINDOW,
  PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS,
} from '../constants/operant.constants';

/** Global (app-wide) quota for 0-point main replies — not per chat. */
export interface PassiveZeroPromptQuotaState {
  /** Start of the current quota window; null until the first 0-point main reply. */
  windowStartMs: number | null;
  /** Number of 0-point main replies already counted in the current window. */
  zeroPointCountInWindow: number;
}

export const DEFAULT_PASSIVE_ZERO_PROMPT_QUOTA_STATE: PassiveZeroPromptQuotaState = {
  windowStartMs: null,
  zeroPointCountInWindow: 0,
};

function isWindowExpired(windowStartMs: number | null, nowMs: number): boolean {
  if (windowStartMs == null) return true;
  return nowMs - windowStartMs >= PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS;
}

/**
 * Apply after recording a **0-point** main assistant message at `nowMs`.
 */
export function applyPassiveZeroQuotaAfterZeroPointMessage(
  prev: PassiveZeroPromptQuotaState | undefined,
  nowMs: number
): PassiveZeroPromptQuotaState {
  const base = prev ?? DEFAULT_PASSIVE_ZERO_PROMPT_QUOTA_STATE;
  if (isWindowExpired(base.windowStartMs, nowMs)) {
    return { windowStartMs: nowMs, zeroPointCountInWindow: 1 };
  }
  return {
    windowStartMs: base.windowStartMs,
    zeroPointCountInWindow: base.zeroPointCountInWindow + 1,
  };
}

/**
 * Whether **this** main assistant message should run the operant delay UI, from quota state
 * **before** the message is recorded (same transition as `recordMainAssistantOperantScore` for 0-point).
 */
export function shouldApplyOperantDelayForMessage(
  prev: PassiveZeroPromptQuotaState | undefined,
  promptPoint: number,
  nowMs: number
): boolean {
  if (promptPoint !== 0) return false;
  const base = prev ?? DEFAULT_PASSIVE_ZERO_PROMPT_QUOTA_STATE;
  const countBefore = isWindowExpired(base.windowStartMs, nowMs)
    ? 0
    : base.zeroPointCountInWindow;
  return countBefore >= PASSIVE_ZERO_PROMPT_QUOTA_PER_WINDOW;
}
