import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${SPACING.BUTTON_PADDING_X};
`;

const LoaderInner = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  padding: ${SPACING.BUTTON_PADDING_X};
`;

const Dot = styled.div<{ $color: string; $delay: number; }>`
  width: ${SPACING.TYPING_DOT_SIZE};
  height: ${SPACING.TYPING_DOT_SIZE};
  border-radius: 50%;
  background-color: ${(p) => p.$color};
  box-shadow: 0 0 0.5rem ${(p) => p.$color};
  animation: ${bounce} 1.4s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay}s;
`;

const LoaderText = styled.span`
  color: ${COLORS.MUTED_WHITE};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  margin-left: ${SPACING.BUTTON_PADDING_Y};
`;

const TypingLoader = () => {
  return (
    <LoaderWrapper>
      <LoaderInner>
        <Dot $color={COLORS.TYPING_DOT_GREEN} $delay={0} />
        <Dot $color={COLORS.TYPING_DOT_AMBER} $delay={0.2} />
        <Dot $color={COLORS.TYPING_DOT_BLUE} $delay={0.4} />
        <LoaderText>Thinking...</LoaderText>
      </LoaderInner>
    </LoaderWrapper>
  );
};

export default TypingLoader;
