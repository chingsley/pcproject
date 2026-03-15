import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const Dot = styled.div<{ $delay: number }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${COLORS.ACTION_BUTTON_BG};
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s;
`;

const LoaderText = styled.span`
  color: ${COLORS.MUTED_WHITE};
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

const TypingLoader = () => {
  return (
    <LoaderContainer>
      <Dot $delay={0} />
      <Dot $delay={0.2} />
      <Dot $delay={0.4} />
      <LoaderText>AI is thinking...</LoaderText>
    </LoaderContainer>
  );
};

export default TypingLoader;
