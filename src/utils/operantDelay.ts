import { PASSIVE_PROMPT_OUTPUT_DELAY_MS_POINT_0 } from '../constants/operant.constants';

/**
 * Returns delay in ms for **0-point** prompts only; otherwise no delay.
 */
export function getPassiveOutputDelayMs(promptPoint: number): number | null {
  if (promptPoint === 0) return PASSIVE_PROMPT_OUTPUT_DELAY_MS_POINT_0;
  return null;
}
