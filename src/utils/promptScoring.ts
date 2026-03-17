import type { PromptCategory } from '../types/chat';

const ACTIVE_PROMPT_PATTERNS = [
  /\banaly[sz]e\b/i,
  /\bcritique\b/i,
  /\bquestion\b/i,
  /\bassumption(s)?\b/i,
  /\bevidence\b/i,
  /\bchallenge\b/i,
  /\balign(ment)?\b/i,
  /\bcounter\s?argument(s)?\b/i,
  /\blimitation(s)?\b/i,
];

const MODERATE_PROMPT_PATTERNS = [
  /\boutline\b/i,
  /\bstructure\b/i,
  /\borgani[sz]e\b/i,
  /\bclarify\b/i,
  /\bimprove\b/i,
  /\brevise\b/i,
  /\bedit\b/i,
];

const PASSIVE_PROMPT_PATTERNS = [
  /\bwrite\b/i,
  /\bdraft\b/i,
  /\bcompose\b/i,
  /\bgenerate\b/i,
  /\bcomplete\b/i,
  /\bdo\s+my\b/i,
  /\bfinish\s+my\b/i,
];

export interface PromptScoringInput {
  promptText: string;
  providerPoint?: unknown;
  providerCategory?: unknown;
  providerFeedback?: unknown;
}

export interface PromptScoringResult {
  promptPoint: number;
  promptCategory: PromptCategory;
  promptFeedback: string;
}

export function getPromptCategoryFromPoint(point: number): PromptCategory {
  if (point <= 0) return 'passive';
  if (point <= 2) return 'low';
  if (point === 3) return 'moderate';
  return 'active';
}

export function getFallbackFeedback(category: PromptCategory): string {
  if (category === 'active') {
    return 'Strong prompt: it invites analysis and keeps you in charge of the reasoning.';
  }
  if (category === 'moderate') {
    return 'Good direction: add critique or evidence-focused follow-ups for deeper engagement.';
  }
  if (category === 'low') {
    return 'Solid start: ask the AI to evaluate assumptions or challenge your reasoning next.';
  }
  return 'This prompt leans on substitution. Reframe it to analyse, critique, or question.';
}

function isPromptCategory(value: unknown): value is PromptCategory {
  return (
    value === 'passive' ||
    value === 'low' ||
    value === 'moderate' ||
    value === 'active'
  );
}

export function scorePromptFromText(promptText: string): number {
  const normalizedPrompt = promptText.trim();

  if (!normalizedPrompt) {
    return 0;
  }

  if (PASSIVE_PROMPT_PATTERNS.some((pattern) => pattern.test(normalizedPrompt))) {
    return 0;
  }

  if (ACTIVE_PROMPT_PATTERNS.some((pattern) => pattern.test(normalizedPrompt))) {
    return 5;
  }

  if (MODERATE_PROMPT_PATTERNS.some((pattern) => pattern.test(normalizedPrompt))) {
    return 3;
  }

  return 2;
}

export function normalizePromptPoint(value: unknown, promptText: string): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.min(5, Math.round(value)));
  }

  return scorePromptFromText(promptText);
}

export function normalizePromptScoring({
  promptText,
  providerPoint,
  providerCategory,
  providerFeedback,
}: PromptScoringInput): PromptScoringResult {
  const promptPoint = normalizePromptPoint(providerPoint, promptText);
  const promptCategory = isPromptCategory(providerCategory)
    ? providerCategory
    : getPromptCategoryFromPoint(promptPoint);
  const promptFeedback =
    typeof providerFeedback === 'string' && providerFeedback.trim()
      ? providerFeedback.trim()
      : getFallbackFeedback(promptCategory);

  return {
    promptPoint,
    promptCategory,
    promptFeedback,
  };
}
