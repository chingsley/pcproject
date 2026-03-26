/**
 * Output delay (operant conditioning) for **0-point** prompts on main assistant replies only.
 * Does not apply to engagement responses (`isEngagementResponse`) or to scores 1–5.
 */
export const PASSIVE_PROMPT_OUTPUT_DELAY_MS_POINT_0 = 10_000;

/**
 * Length of the passive-quota window (ms). When elapsed since `windowStartMs`, the next 0-point
 * main reply starts a new window and the free passive quota resets.
 * Default: 24 hours.
 */
export const PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours 
// export const PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS = 1 * 60 * 60 * 1000 * 0.5 * 0.5 * 0.5 * 0.5; // 3.75 minutes

/**
 * How many **0-point** main assistant replies in the current window may appear **without** the
 * delay loader. Each further 0-point reply in the same window (until the window elapses) shows it.
 * Scores ≥1 do not reset the counter or the window (no “save a 2-point prompt” loophole).
 */
export const PASSIVE_ZERO_PROMPT_QUOTA_PER_WINDOW = 3;
