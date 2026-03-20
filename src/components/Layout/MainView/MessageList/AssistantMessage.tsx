import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { drawBorder } from '../../../../utils/playground';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearEngagementContext, setEngagementContext } from '../../../../store/slices/uiSlice';
import type { EngagementType } from '../../../../utils/engagementPrompt';
import { ALLOW_ENGAGEMENT_ON_PREVIOUS_MESSAGES } from '../../../../constants/engagement.constants';
import { shouldShowEngagementOptions } from '../../../../utils/engagementVisibility';
import QuizPanel from './QuizPanel';

const CanvaWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
`;

const Canva = styled.div`
  width: 100%;
  border-radius: ${SPACING.RADIUS_SMALL};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};
  color: ${COLORS.MUTED_WHITE};
  line-height: 1.5;
`;

const PlainAnimatedText = styled.div`
  white-space: pre-wrap;
`;

const MarkdownContent = styled.div`
  p {
    margin: 0 0 ${SPACING.BUTTON_PADDING_Y};
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${COLORS.TEXT_PRIMARY};
    margin: ${SPACING.BUTTON_PADDING_X} 0 ${SPACING.BUTTON_PADDING_Y};
    line-height: 1.3;
  }

  h1 {
    font-size: ${FONTS.SIZE.XLARGEPLUS};
  }

  h2 {
    font-size: ${FONTS.SIZE.XLARGE};
  }

  h3,
  h4 {
    font-size: ${FONTS.SIZE.LARGE};
  }

  ul,
  ol {
    margin: 0 0 ${SPACING.BUTTON_PADDING_X};
    padding-left: ${SPACING.FIXED_OFFSET};
  }

  li {
    margin-bottom: ${SPACING.BUTTON_PADDING_Y};
  }

  strong {
    color: ${COLORS.TEXT_PRIMARY};
    font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  }

  blockquote {
    margin: 0 0 ${SPACING.BUTTON_PADDING_X};
    padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
    border-left: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE_HOVER};
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
    border-radius: ${SPACING.RADIUS_SMALLER};
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    font-size: ${FONTS.SIZE.SMALL};
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
    border-radius: ${SPACING.RADIUS_SMALLER};
    padding: 0 ${SPACING.SHORTCUT_KEY_PADDING_X};
  }

  pre {
    margin: 0 0 ${SPACING.BUTTON_PADDING_X};
    padding: ${SPACING.BUTTON_PADDING_X};
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
    border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
    border-radius: ${SPACING.RADIUS_SMALLER};
    overflow-x: auto;
  }

  pre code {
    background: ${COLORS.TRANSPARENT};
    padding: 0;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_X};
  margin-top: ${SPACING.BUTTON_PADDING_Y};
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const ActionDivider = styled.div`
  width: ${SPACING.BORDER_WIDTH};
  height: ${SPACING.FIXED_OFFSET};
  background: ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_PILL};
`;

const EngageGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const EngageLabel = styled.span`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  color: ${COLORS.MUTED_WHITE};
`;

const ActionButton = styled.button<{ $disabled?: boolean }>`
  width: ${SPACING.UPLOAD_BUTTON_SIZE};
  height: ${SPACING.UPLOAD_BUTTON_SIZE};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border: ${drawBorder('red')};
  color: ${COLORS.ACTION_BUTTON_TEXT};
  padding: 0;
  cursor: pointer;
  opacity: ${(p) => (p.$disabled ? 0.5 : 1)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${(p) => (p.$disabled ? 0.65 : 0.9)};
    border-radius: ${SPACING.RADIUS_SMALLER};
    background: ${(p) => (p.$disabled ? COLORS.SURFACE_OVERLAY_LIGHT : COLORS.PRIMARY_BLUE_LIGHT)};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ActionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${FONTS.SIZE.XLARGE};
  border: ${drawBorder('blue')};
`;

const TYPEWRITER_MS_PER_CHAR = 5;

const EngageTypeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const QuizPanelWrapper = styled.div`
  margin-top: ${SPACING.BUTTON_PADDING_X};
`;

const EngageTypeButton = styled.button<{ $isActive: boolean; }>`
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALLER};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  background: ${(p) => (p.$isActive ? COLORS.SURFACE_OVERLAY_MEDIUM : COLORS.TRANSPARENT)};
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;

  &:hover,
  &:focus-visible {
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }

  &:active {
    transform: scale(0.99);
  }
`;

const ENGAGEMENT_TYPES: Array<{ type: EngagementType; label: string; }> = [
  { type: 'summarize', label: 'Summarize' },
  { type: 'paraphrase', label: 'Paraphrase' },
  { type: 'analyze', label: 'Analyze' },
];

export interface AssistantMessageProps {
  content: string;
  shouldAnimate?: boolean;
  onScrollToBottom?: () => void;
  onAnimationComplete?: () => void;
  assistantMessageId: string;
  chatId: string;
  isEngagementResponse?: boolean;
  isLastAssistantMessage?: boolean;
}

const AssistantMessage = ({
  content,
  shouldAnimate = false,
  onScrollToBottom,
  onAnimationComplete,
  assistantMessageId,
  chatId,
  isEngagementResponse = false,
  isLastAssistantMessage = false,
}: AssistantMessageProps) => {
  const [visibleContent, setVisibleContent] = useState(() =>
    shouldAnimate ? '' : content
  );
  const dispatch = useAppDispatch();
  const engagementContext = useAppSelector((state) => state.ui.engagementContext);
  const quizPassedAssistantMessageIds = useAppSelector(
    (state) => state.ui.quizPassedAssistantMessageIds ?? []
  );
  const selectedEngagement = engagementContext?.active
    ? engagementContext.engagementType
    : null;

  const hasEngagementOptions =
    shouldShowEngagementOptions(content) &&
    (isLastAssistantMessage || ALLOW_ENGAGEMENT_ON_PREVIOUS_MESSAGES);
  const copyShareEnabled =
    !hasEngagementOptions || quizPassedAssistantMessageIds.includes(assistantMessageId);

  useEffect(() => {
    if (!shouldAnimate) return;
    // This is a deliberate typewriter animation that updates local UI state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleContent('');
    let index = 0;
    const fullText = content;
    const interval = setInterval(() => {
      index += 1;
      if (index >= fullText.length) {
        setVisibleContent(fullText);
        clearInterval(interval);
        onAnimationComplete?.();
        return;
      }
      setVisibleContent(fullText.slice(0, index));
    }, TYPEWRITER_MS_PER_CHAR);
    return () => clearInterval(interval);
  }, [content, shouldAnimate, onAnimationComplete]);

  useEffect(() => {
    if (shouldAnimate && visibleContent && onScrollToBottom) {
      const id = requestAnimationFrame(() => onScrollToBottom());
      return () => cancelAnimationFrame(id);
    }
  }, [shouldAnimate, visibleContent, onScrollToBottom]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: content,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    } else {
      await handleCopy();
    }
  };

  const handleCopyClick = () => {
    if (copyShareEnabled) {
      handleCopy();
    } else {
      dispatch(
        setEngagementContext({
          active: true,
          chatId,
          assistantMessageId,
          assistantResponse: content,
          engagementType: 'ask_questions',
        })
      );
    }
  };

  const handleShareClick = () => {
    if (copyShareEnabled) {
      handleShare();
    } else {
      dispatch(
        setEngagementContext({
          active: true,
          chatId,
          assistantMessageId,
          assistantResponse: content,
          engagementType: 'ask_questions',
        })
      );
    }
  };

  const displayContent = shouldAnimate ? visibleContent : content;
  const isAnimating = shouldAnimate && visibleContent.length < content.length;

  return (
    <CanvaWrapper>
      <div>
        <Canva>
          {isAnimating ? (
            <PlainAnimatedText>{displayContent}</PlainAnimatedText>
          ) : (
            <MarkdownContent>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayContent}</ReactMarkdown>
            </MarkdownContent>
          )}
        </Canva>
        {!isEngagementResponse && (
          <>
            <ActionRow>
              <ActionGroup>
                <ActionButton
                  type="button"
                  onClick={handleCopyClick}
                  $disabled={!copyShareEnabled}
                  aria-label={copyShareEnabled ? 'Copy message' : 'Complete quiz to enable copy'}
                  title={copyShareEnabled ? 'Copy' : 'Complete quiz to enable copy'}
                >
                  <ActionIcon>
                    <FiCopy />
                  </ActionIcon>
                </ActionButton>
                <ActionButton
                  type="button"
                  onClick={handleShareClick}
                  $disabled={!copyShareEnabled}
                  aria-label={copyShareEnabled ? 'Share message' : 'Complete quiz to enable share'}
                  title={copyShareEnabled ? 'Share' : 'Complete quiz to enable share'}
                >
                  <ActionIcon>
                    <FiShare2 />
                  </ActionIcon>
                </ActionButton>
              </ActionGroup>
              {hasEngagementOptions && (
                  <>
                    <ActionDivider />
                    <EngageGroup>
                      <EngageLabel>Engage for bonus points</EngageLabel>
                      <EngageTypeRow>
                        {ENGAGEMENT_TYPES.map((item) => (
                          <EngageTypeButton
                            key={item.type}
                            type='button'
                            $isActive={
                              engagementContext?.active === true &&
                              engagementContext.assistantMessageId === assistantMessageId &&
                              selectedEngagement === item.type
                            }
                            onClick={() => {
                              if (
                                engagementContext?.active &&
                                engagementContext.assistantMessageId === assistantMessageId &&
                                engagementContext.engagementType === item.type
                              ) {
                                dispatch(clearEngagementContext());
                                return;
                              }

                              dispatch(
                                setEngagementContext({
                                  active: true,
                                  chatId,
                                  assistantMessageId,
                                  assistantResponse: content,
                                  engagementType: item.type,
                                })
                              );
                            }}
                          >
                            {item.label}
                          </EngageTypeButton>
                        ))}
                      </EngageTypeRow>
                    </EngageGroup>
                  </>
                )}
            </ActionRow>
            {hasEngagementOptions &&
              engagementContext?.active &&
              engagementContext.assistantMessageId === assistantMessageId &&
              engagementContext.engagementType === 'ask_questions' && (
                <QuizPanelWrapper>
                  <QuizPanel
                    assistantResponse={content}
                    assistantMessageId={assistantMessageId}
                    chatId={chatId}
                  />
                </QuizPanelWrapper>
              )}
          </>
        )}
      </div>
    </CanvaWrapper>
  );
};

export default AssistantMessage;
