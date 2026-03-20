import {
  MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS,
  MIN_SENTENCES_FOR_ENGAGEMENT,
  SIMPLE_GREETING_PATTERNS,
} from '../constants/engagement.constants';

/**
 * Counts sentences (split by . ! ?).
 */
function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const parts = trimmed.split(/[.!?]+/).filter((p) => p.trim().length > 0);
  return parts.length;
}

/**
 * Returns true if the AI response is substantial enough to show engagement options.
 * Excludes simple greetings, one-sentence definitions, and very short replies.
 */
export function shouldShowEngagementOptions(content: string): boolean {
  const trimmed = content.trim();
  if (trimmed.length < MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS) {
    return false;
  }
  if (countSentences(trimmed) < MIN_SENTENCES_FOR_ENGAGEMENT) {
    return false;
  }
  if (SIMPLE_GREETING_PATTERNS.some((re) => re.test(trimmed))) {
    return false;
  }
  return true;
}
