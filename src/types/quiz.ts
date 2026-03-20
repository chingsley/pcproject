/** Single multiple-choice question for quiz engagement */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

/** API response when generating quiz questions from assistant content */
export interface QuizQuestionsResponse {
  questions: QuizQuestion[];
}

/** User's answer submission for a question */
export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
}

/** API response when evaluating quiz answers */
export interface QuizEvaluationResponse {
  chatTitle: string;
  content: string;
  promptPoint: number;
  promptCategory: 'passive' | 'low' | 'moderate' | 'active';
  promptFeedback: string;
  correctCount: number;
  totalCount: number;
  timestamp?: string;
}
