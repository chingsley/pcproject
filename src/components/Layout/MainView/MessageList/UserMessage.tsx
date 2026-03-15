import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const BubbleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
`;

const Bubble = styled.div`
  max-width: 70%;
  padding: ${SPACING.BUTTON_PADDING_X};
  // background: ${COLORS.ACTION_BUTTON_BG};
  // background: #2f3e5c;
  background: #2f325c69;
  border-radius: ${SPACING.RADIUS_SMALL};
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  line-height: 1.5;
`;

export interface UserMessageProps {
  content: string;
}

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <BubbleWrapper>
      <Bubble>{content}</Bubble>
    </BubbleWrapper>
  );
};

export default UserMessage;
