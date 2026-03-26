import {
  PASSIVE_ZERO_PROMPT_QUOTA_PER_WINDOW,
  PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS,
} from '../constants/operant.constants';
import type { PassiveZeroPromptQuotaState } from './operantDelayState';

export interface OperantQuotaDisplayState {
  passivePromptsLeft: number;
  delayActive: boolean;
  windowResetAtMs: number | null;
  msUntilReset: number;
}

function isWindowActive(windowStartMs: number | null, nowMs: number): boolean {
  if (windowStartMs == null) return false;
  return nowMs - windowStartMs < PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS;
}

export function getOperantQuotaDisplayState(
  quota: PassiveZeroPromptQuotaState | undefined,
  nowMs: number
): OperantQuotaDisplayState {
  const safeCount = Math.max(0, quota?.zeroPointCountInWindow ?? 0);
  const active = isWindowActive(quota?.windowStartMs ?? null, nowMs);

  if (!active) {
    return {
      passivePromptsLeft: PASSIVE_ZERO_PROMPT_QUOTA_PER_WINDOW,
      delayActive: false,
      windowResetAtMs: null,
      msUntilReset: 0,
    };
  }

  const windowResetAtMs = (quota?.windowStartMs ?? nowMs) + PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS;
  const msUntilReset = Math.max(0, windowResetAtMs - nowMs);
  const passivePromptsLeft = Math.max(0, PASSIVE_ZERO_PROMPT_QUOTA_PER_WINDOW - safeCount);

  return {
    passivePromptsLeft,
    delayActive: passivePromptsLeft === 0,
    windowResetAtMs,
    msUntilReset,
  };
}

export function formatDurationCompact(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
