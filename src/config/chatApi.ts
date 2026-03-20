import type { ApiChatResponse, ChatApiProvider } from '../types/chat';
import type { QuizEvaluationResponse, QuizQuestionsResponse } from '../types/quiz';
import { QUIZ_BONUS_POINTS, QUIZ_FAIL_MESSAGE, QUIZ_SUCCESS_MESSAGE } from '../constants/engagement.constants';
import { geminiProvider } from './providers/gemini';
import { cohereProvider } from './providers/cohere';
import { simulatedAIChatProvider } from './providers/simulation';
import { buildQuizQuestionsPrompt, buildQuizEvaluationPrompt } from '../utils/quizPrompt';
import { sanitizeJsonForParse } from '../utils/jsonParse';

const PROVIDER_MAP: Record<string, ChatApiProvider> = {
  gemini: geminiProvider,
  cohere: cohereProvider,
  simulation: simulatedAIChatProvider,
};

function getProvider(): ChatApiProvider {
  const providerName = import.meta.env.VITE_CHAT_PROVIDER || 'cohere';
  const provider = PROVIDER_MAP[providerName];

  if (!provider) {
    throw new Error(`Unknown chat provider: ${providerName}`);
  }

  return provider;
}

export async function generateChatResponse(
  prompt: string,
  options?: { temperature?: number; systemMessage?: string }
): Promise<ApiChatResponse> {
  const provider = getProvider();
  return provider.generateChatResponse(prompt, options);
}

const QUIZ_SYSTEM_MESSAGE = `You are a helpful assistant. Return ONLY valid JSON. No markdown code blocks, no extra text.`;

async function getRawJsonResponse(
  prompt: string,
  options: { temperature?: number }
): Promise<string> {
  const provider = getProvider();
  if (provider.generateRawResponse) {
    return provider.generateRawResponse(prompt, {
      temperature: options.temperature ?? 0.5,
      systemMessage: QUIZ_SYSTEM_MESSAGE,
    });
  }
  const response = await generateChatResponse(prompt, {
    temperature: options.temperature ?? 0.5,
    systemMessage: QUIZ_SYSTEM_MESSAGE,
  });
  return response.content;
}

/** Generate multiple-choice questions from assistant response content */
export async function generateQuizQuestions(
  assistantResponse: string
): Promise<QuizQuestionsResponse> {
  const prompt = buildQuizQuestionsPrompt(assistantResponse);
  const jsonText = await getRawJsonResponse(prompt, { temperature: 0.5 });
  const sanitized = sanitizeJsonForParse(jsonText);
  const parsed = JSON.parse(sanitized);

  if (parsed?.questions && Array.isArray(parsed.questions)) {
    return parsed as QuizQuestionsResponse;
  }
  if (typeof parsed?.content === 'string') {
    return JSON.parse(parsed.content) as QuizQuestionsResponse;
  }
  throw new Error('Invalid quiz questions response format');
}

/** Evaluate quiz answers and return scoring for bonus points */
export async function generateQuizEvaluation(
  assistantResponse: string,
  questions: QuizQuestionsResponse['questions'],
  userAnswers: Array<{ questionId: string; selectedIndex: number }>
): Promise<QuizEvaluationResponse> {
  const prompt = buildQuizEvaluationPrompt(assistantResponse, questions, userAnswers);
  const jsonText = await getRawJsonResponse(prompt, { temperature: 0.3 });
  const sanitized = sanitizeJsonForParse(jsonText);
  const parsed = JSON.parse(sanitized) as QuizEvaluationResponse;

  const totalCount = questions.length;
  const correctCount = userAnswers.filter((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    return q && q.correctIndex === a.selectedIndex;
  }).length;
  const allCorrect = correctCount === totalCount && totalCount > 0;

  return {
    ...parsed,
    content: allCorrect ? QUIZ_SUCCESS_MESSAGE : QUIZ_FAIL_MESSAGE,
    promptPoint: allCorrect ? QUIZ_BONUS_POINTS : 0,
    promptCategory: allCorrect ? 'active' : 'passive',
    promptFeedback: allCorrect
      ? `Great job! You earned ${QUIZ_BONUS_POINTS} bonus points.`
      : 'Click Ask Questions again to retry with a new set of questions.',
    correctCount,
    totalCount,
    timestamp: parsed.timestamp ?? new Date().toISOString(),
  };
}
