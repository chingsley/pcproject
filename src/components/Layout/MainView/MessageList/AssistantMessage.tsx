import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const BubbleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
`;

const Bubble = styled.div`
  max-width: 70%;
  padding: ${SPACING.BUTTON_PADDING_X};
  background: ${COLORS.INPUT_BG};
  border-radius: ${SPACING.RADIUS_SMALL};
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  gap: ${SPACING.BUTTON_PADDING_Y};
  margin-top: ${SPACING.BUTTON_PADDING_Y};
`;

const ActionButton = styled.button`
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  background: ${COLORS.ACTION_BUTTON_BG};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_SMALLER};
  color: ${COLORS.ACTION_BUTTON_TEXT};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export interface AssistantMessageProps {
  content: string;
  answer?: string;
}

const AssistantMessage = ({ content, answer }: AssistantMessageProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer || content);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: answer || content,
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
    <BubbleWrapper>
      <div>
        <Bubble>{content}</Bubble>
        <Actions>
          <ActionButton onClick={handleCopy}>Copy</ActionButton>
          <ActionButton onClick={handleShare}>Share</ActionButton>
        </Actions>
      </div>
    </BubbleWrapper>
  );
};

export default AssistantMessage;
