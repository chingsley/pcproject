import { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiCheck, FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { useAppDispatch } from '../../../../store/hooks';
import { submitQuizAnswers } from '../../../../store/slices/chatSlice';
import { generateQuizQuestions } from '../../../../config/chatApi';
import type { QuizQuestion } from '../../../../types/quiz';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinningIcon = styled(FiLoader)`
  animation: ${spin} 0.8s linear infinite;
  flex-shrink: 0;
`;

const Panel = styled.div`
  width: 100%;
  margin-top: ${SPACING.BUTTON_PADDING_X};
  padding: ${SPACING.FIXED_OFFSET};
  // background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_SMALL};
`;

const PanelTitle = styled.h3`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  margin-bottom: 0.5rem;
  color: ${COLORS.TEXT_PRIMARY};
  // color: ${COLORS.MUTED_WHITE}; 
`;

const PanelInfo = styled.p`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
  color: ${COLORS.MUTED_WHITE}; 
  font-style: italic;
`;

const QuestionBlock = styled.div`
  margin-bottom: ${SPACING.FIXED_OFFSET};
`;

const QuestionText = styled.p`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  margin: 0 0 ${SPACING.BUTTON_PADDING_Y};
  line-height: 1.4;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const OptionButton = styled.button<{ $isSelected: boolean; }>`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  width: 100%;
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  background: ${(p) => (p.$isSelected ? COLORS.SURFACE_OVERLAY_MEDIUM : COLORS.TRANSPARENT)};
  border: ${SPACING.BORDER_WIDTH} solid
    ${(p) => (p.$isSelected ? COLORS.BORDER_SUBTLE_HOVER : COLORS.BORDER_SUBTLE)};
  border-radius: ${SPACING.RADIUS_SMALLER};
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  text-align: left;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;

  &:hover {
    background: ${COLORS.SURFACE_OVERLAY_MEDIUM};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
    // background-color: ${COLORS.PRIMARY_BLUE_LIGHT};
  }

  &:active {
    transform: scale(0.99);
  }
`;

const OptionLetter = styled.span`
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${COLORS.PRIMARY_BLUE_LIGHT};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${SPACING.FIXED_OFFSET};
  padding-top: ${SPACING.BUTTON_PADDING_X};
  border-top: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  gap: ${SPACING.BUTTON_PADDING_X};
`;

const NavButton = styled.button<{ $disabled?: boolean; }>`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  background: ${COLORS.PRIMARY_BLUE_LIGHT};
  color: ${COLORS.TEXT_PRIMARY};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_SMALLER};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  cursor: ${(p) => (p.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(p) => (p.$disabled ? 0.5 : 1)};
  transition: opacity 160ms ease;

  &:hover:not(:disabled) {
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }
`;

const QuestionCounter = styled.span`
  color: ${COLORS.MUTED_WHITE};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
`;

const SubmitButton = styled.button<{ $disabled?: boolean; }>`
  display: inline-flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  background: ${COLORS.LOADER_FILL};
  color: ${COLORS.MAIN_BG};
  border: none;
  border-radius: ${SPACING.RADIUS_SMALLER};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  cursor: ${(p) => (p.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(p) => (p.$disabled ? 0.6 : 1)};
  transition: opacity 160ms ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_X};
  color: ${COLORS.MUTED_WHITE};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
`;

const ErrorState = styled.div`
  color: ${COLORS.HISTORY_ITEM_POINTS_RED_TEXT};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
`;

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export interface QuizPanelProps {
  assistantResponse: string;
  assistantMessageId: string;
  chatId: string;
}

const QuizPanel = ({
  assistantResponse,
  assistantMessageId,
  chatId,
}: QuizPanelProps) => {
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [loading, setLoading] = useState(true); // starts true, set false when fetch completes
  const [error, setError] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    // Reset state when starting a new fetch (e.g. user switched to different message).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reset before async fetch
    setLoading(true);
    setError(null);
    generateQuizQuestions(assistantResponse)
      .then((res) => {
        if (!cancelled) {
          setQuestions(res.questions ?? []);
          setCurrentIndex(0);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setQuestions(null);
          setError(err instanceof Error ? err.message : 'Failed to load questions');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [assistantResponse]);

  const handleSelectOption = useCallback((questionId: string, optionIndex: number) => {
    setSelections((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, []);

  const allAnswered =
    questions && questions.length > 0 && questions.every((q) => selections[q.id] !== undefined);

  const handleSubmit = useCallback(() => {
    if (!questions || !allAnswered || submitting) return;
    setSubmitting(true);
    const userAnswers = questions.map((q) => ({
      questionId: q.id,
      selectedIndex: selections[q.id] ?? 0,
    }));
    dispatch(
      submitQuizAnswers({
        chatId,
        assistantMessageId,
        assistantResponse,
        userAnswers,
        questions,
      })
    )
      .unwrap()
      .catch(() => {
        setSubmitting(false);
      });
  }, [chatId, assistantMessageId, assistantResponse, questions, selections, allAnswered, submitting, dispatch]);

  if (loading) {
    return (
      <Panel>
        <LoadingState>
          <SpinningIcon />
          Generating questions...
        </LoadingState>
      </Panel>
    );
  }

  if (error) {
    return (
      <Panel>
        <ErrorState>{error}</ErrorState>
      </Panel>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Panel>
        <ErrorState>No questions could be generated for this response.</ErrorState>
      </Panel>
    );
  }

  const q = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  return (
    <Panel>
      <PanelTitle>Test your understanding</PanelTitle>
      {/* <p style={{ margin: '0 0 1rem',  }}>
        Answer the questions to earn bonus points and enable the copy button.
      </p> */}
      <PanelInfo>
        Answer the questions to earn bonus points and enable the copy button.
      </PanelInfo>
      <QuestionBlock>
        <QuestionText>{q.question}</QuestionText>
        <OptionsList>
          {q.options.map((opt, idx) => (
            <OptionButton
              key={idx}
              type="button"
              $isSelected={selections[q.id] === idx}
              onClick={() => handleSelectOption(q.id, idx)}
            >
              <OptionLetter>{OPTION_LETTERS[idx] ?? String(idx + 1)}</OptionLetter>
              {opt}
            </OptionButton>
          ))}
        </OptionsList>
      </QuestionBlock>
      <NavRow>
        <NavButton
          type="button"
          $disabled={isFirst}
          disabled={isFirst}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          <FiChevronLeft />
          Back
        </NavButton>
        <QuestionCounter>
          Question {currentIndex + 1} of {questions.length}
        </QuestionCounter>
        {isLast ? (
          <SubmitButton
            type="button"
            $disabled={!allAnswered || submitting}
            disabled={!allAnswered || submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <>
                <SpinningIcon />
                Submitting...
              </>
            ) : (
              <>
                <FiCheck />
                Submit answers
              </>
            )}
          </SubmitButton>
        ) : (
          <NavButton
            type="button"
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          >
            Next
            <FiChevronRight />
          </NavButton>
        )}
      </NavRow>
    </Panel>
  );
};

export default QuizPanel;
