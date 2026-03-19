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
import {
  ALLOW_ENGAGEMENT_ON_PREVIOUS_MESSAGES,
  MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS,
} from '../../../../constants/engagement.constants';

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

const Actions = styled.div`
  display: flex;
  // gap: ${SPACING.BUTTON_PADDING_Y};
  // margin-top: ${SPACING.BUTTON_PADDING_Y};
`;

const ActionButton = styled.button`
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
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    border-radius: 0.5rem;
    background: ${COLORS.PRIMARY_BLUE_LIGHT};
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

const EngageWrapper = styled.div`
  width: 100%;
  margin-top: ${SPACING.BUTTON_PADDING_Y};
`;

const EngageTitle = styled.div`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  color: ${COLORS.MUTED_WHITE};
  margin-bottom: ${SPACING.BUTTON_PADDING_Y};
`;

const EngageTypeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.BUTTON_PADDING_Y};
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
  { type: 'ask_questions', label: 'Ask Questions' },
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
  const selectedEngagement = engagementContext?.active
    ? engagementContext.engagementType
    : null;

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
      // Fallback: copy to clipboard
      await handleCopy();
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
        <Actions>
          <ActionButton onClick={handleCopy} aria-label="Copy message" title="Copy">
            <ActionIcon>
              <FiCopy />
            </ActionIcon>
          </ActionButton>
          <ActionButton onClick={handleShare} aria-label="Share message" title="Share">
            <ActionIcon>
              <FiShare2 />
            </ActionIcon>
          </ActionButton>
        </Actions>

        {!isEngagementResponse &&
          content.length >= MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS &&
          (isLastAssistantMessage || ALLOW_ENGAGEMENT_ON_PREVIOUS_MESSAGES) && (
            <EngageWrapper>
              <EngageTitle>Engage for bonus points</EngageTitle>
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
            </EngageWrapper>
          )}
      </div>
    </CanvaWrapper>
  );
};

export default AssistantMessage;
