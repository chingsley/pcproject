import type { PromptCategory } from '../types/chat';

const ACTIVE_PROMPT_PATTERNS = [
  /\bmy\s+draft\b/i,
  /\bhere\s+is\s+my\s+draft\b/i,
  /\banaly[sz]e\b/i,
  /\bcritique\b/i,
  /\bstrength(s)?\b/i,
  /\bweakness(es)?\b/i,
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
    return 'Great job! You led with your own thinking and asked for critique to improve your work.';
  }
  if (category === 'moderate') {
    return 'Good progress. Add critique and evidence checks to show deeper critical thinking.';
  }
  if (category === 'low') {
    return 'Nice start. Add your own view and ask for critique or evidence gaps next.';
  }
  return 'Thanks for trying. Share your own draft or ideas and ask for critique to earn more points.';
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
