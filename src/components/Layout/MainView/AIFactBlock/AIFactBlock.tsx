import type { ReactNode } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { drawBorder } from '../../../../utils/playground';

const REVEAL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const AIFactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  border: ${drawBorder('red')};
  margin-bottom: ${SPACING.MAIN_VIEW_BOTTOM_MARGIN};
`;

const AIFactMessage = styled.p`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: ${drawBorder('red')};
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  color: ${COLORS.MUTED_WHITE};
  margin: 0;
  text-align: center;
  transition: transform ${LAYOUT.REVEAL_TRANSITION_DURATION} ${REVEAL_EASE};
  transform: translateY(0);
`;

const AIFactContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  width: 100%;
  border: ${drawBorder('blue')};
  opacity: 0;
  transform: translateY(calc(-1 * ${SPACING.REVEAL_SOURCE_START_OFFSET}));
  max-height: ${SPACING.REVEAL_SOURCE_MAX_HEIGHT};
  overflow: hidden;
  margin-top: ${SPACING.BUTTON_PADDING_X};
  pointer-events: none;
  transition:
    opacity ${LAYOUT.REVEAL_TRANSITION_DURATION} ${REVEAL_EASE},
    transform ${LAYOUT.REVEAL_TRANSITION_DURATION} ${REVEAL_EASE};
`;

const AIFactRevealRoot = styled.div`
  max-width: ${LAYOUT.INPUT_BOX_WIDTH};
  // max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${drawBorder('green')};

  &:hover ${AIFactMessage},
  &:focus-within ${AIFactMessage} {
    transform: translateY(calc(-1 * ${SPACING.REVEAL_MESSAGE_LIFT}));
  }

  &:hover ${AIFactContent},
  &:focus-within ${AIFactContent} {
    opacity: 1;
    transform: translateY(calc(-1 * ${SPACING.REVEAL_MESSAGE_LIFT}));
    pointer-events: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    & ${AIFactMessage},
    & ${AIFactContent} {
      transition-duration: 0.5ms;
    }

    & ${AIFactContent} {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }

    & ${AIFactMessage} {
      transform: none;
    }
  }
`;

const AIFactSource = styled.a`
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: ${drawBorder('red')};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  color: ${COLORS.TEXT_PRIMARY};
  text-decoration: none;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
  &:focus-visible {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

export interface AIFactBlockProps {
  message?: ReactNode;
  sourceHref?: string;
  sourceLabel?: ReactNode;
}

const DEFAULT_MESSAGE = '"In these moments, scholarly responsibility is weakened not because a tool was used, but because judgement was sidelined."';

const AIFactBlock = ({
  message = DEFAULT_MESSAGE,
  sourceHref = 'https://www.timeshighereducation.com/campus/yes-genai-can-make-academic-writing-easier-without-making-us-less-scholarly',
  sourceLabel = 'Brownlie, Nicole. (2026)',
}: AIFactBlockProps) => (
  <AIFactContainer>
    <AIFactRevealRoot>
      <AIFactMessage>{message}</AIFactMessage>
      <AIFactContent>
        <AIFactSource href={sourceHref} target="_blank" rel="noopener noreferrer">
          {sourceLabel}
        </AIFactSource>
      </AIFactContent>
    </AIFactRevealRoot>
  </AIFactContainer>
);

export default AIFactBlock;
