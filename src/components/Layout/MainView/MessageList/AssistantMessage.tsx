import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiCopy, FiShare2 } from 'react-icons/fi';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

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

const Actions = styled.div`
  display: flex;
  gap: ${SPACING.BUTTON_PADDING_Y};
  margin-top: ${SPACING.BUTTON_PADDING_Y};
`;

const ActionButton = styled.button`
  width: ${SPACING.UPLOAD_BUTTON_SIZE};
  height: ${SPACING.UPLOAD_BUTTON_SIZE};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.ACTION_BUTTON_BG};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_SMALLER};
  color: ${COLORS.ACTION_BUTTON_TEXT};
  padding: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ActionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${FONTS.SIZE.LARGE};
  line-height: 1;
`;

const TYPEWRITER_MS_PER_CHAR = 5;

export interface AssistantMessageProps {
  content: string;
  shouldAnimate?: boolean;
  onScrollToBottom?: () => void;
  onAnimationComplete?: () => void;
}

const AssistantMessage = ({
  content,
  shouldAnimate = false,
  onScrollToBottom,
  onAnimationComplete,
}: AssistantMessageProps) => {
  const [visibleContent, setVisibleContent] = useState(() =>
    shouldAnimate ? '' : content
  );

  useEffect(() => {
    if (!shouldAnimate) {
      setVisibleContent(content);
      return;
    }
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

  return (
    <CanvaWrapper>
      <div>
        <Canva>{visibleContent}</Canva>
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
      </div>
    </CanvaWrapper>
  );
};

export default AssistantMessage;
