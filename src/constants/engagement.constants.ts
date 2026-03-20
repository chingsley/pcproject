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

/**
 * Minimum number of sentences for engagement options.
 * One-sentence definitions or greetings are excluded.
 */
export const MIN_SENTENCES_FOR_ENGAGEMENT = 2;

/**
 * Bonus points awarded when user answers all quiz questions correctly.
 * All-or-nothing: 0 points if any answer is wrong.
 */
export const QUIZ_BONUS_POINTS = 5;

/**
 * Message shown when user answers all quiz questions correctly.
 * Used for both demo and live API (Cohere, Gemini, etc.) responses.
 */
export const QUIZ_SUCCESS_MESSAGE = `Good job! You've earned ${QUIZ_BONUS_POINTS} quiz points, the copy button is now enabled.`;

/**
 * Message shown when user does not answer all quiz questions correctly.
 */
export const QUIZ_FAIL_MESSAGE = 'Not all correct. Please read the output carefully and try again. You need to pass all questions to enable the copy button.';

/**
 * Patterns that indicate a simple greeting or trivial response.
 * Responses matching these (case-insensitive) are excluded from engagement.
 */
export const SIMPLE_GREETING_PATTERNS = [
  /^hello[,!]?\s*(how can i help|what can i do|there)?\s*[.!]?$/i,
  /^hi[,!]?\s*(there|how can i help)?\s*[.!]?$/i,
  /^hey[,!]?\s*(there|how can i help)?\s*[.!]?$/i,
  /^how can i help you\s*(today)?\s*[.!]?$/i,
  /^what can i help you with\s*(today)?\s*[.!]?$/i,
  /^greetings[,!]?\s*[.!]?$/i,
  /^good (morning|afternoon|evening)[,!]?\s*[.!]?$/i,
];
