/**
 * When true, engagement options appear on all assistant messages (except engagement responses).
 * When false, only the last assistant (non-engagement) message shows engagement options.
 * Engagement responses (isEngagementResponse) never show engagement options.
 */
export const ALLOW_ENGAGEMENT_ON_PREVIOUS_MESSAGES = true;

/**
 * Minimum character length for an assistant response to show engagement options.
 * Short replies (e.g. "Hello, how can I help you today") are excluded.
 *
 * Alternatives: MIN_RESPONSE_LENGTH_FOR_ENGAGEMENT, ENGAGEMENT_MIN_RESPONSE_LENGTH,
 * MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS_OPTIONS, ENGAGEMENT_RESPONSE_MIN_CHARS,
 * MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS, MIN_CHARS_FOR_ENGAGEMENT
 */
export const MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS = 100;
