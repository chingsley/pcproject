import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { useAppSelector } from '../../../../store/hooks';
import { selectGameProgress } from '../../../../store/selectors/chatSelectors';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderWrapper = styled.div`
  position: relative;
  width: calc(${LAYOUT.POINTS_LOADER_SIZE} + (${LAYOUT.POINTS_LOADER_GAP} * 2));
  height: calc(${LAYOUT.POINTS_LOADER_SIZE} + (${LAYOUT.POINTS_LOADER_GAP} * 2));
`;

const LoaderRingSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const InnerCircle = styled.div`
  position: absolute;
  top: ${LAYOUT.POINTS_LOADER_GAP};
  left: ${LAYOUT.POINTS_LOADER_GAP};
  width: ${LAYOUT.POINTS_LOADER_SIZE};
  height: ${LAYOUT.POINTS_LOADER_SIZE};
  border-radius: 50%;
  border: 1px solid ${COLORS.BORDER_SUBTLE};
  background-color: ${COLORS.INPUT_BG};
  color: ${COLORS.TEXT_PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PercentageGroup = styled.span`
  display: flex;
  align-items: baseline;
`;

const NumberPart = styled.span`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.XXLARGE};
  font-weight: ${FONTS.WEIGHT.THIN};
  color: ${COLORS.TEXT_PRIMARY};
`;

const PercentSign = styled.span`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.NORMAL};
  color: ${COLORS.TEXT_PRIMARY};
`;

const VIEWBOX_SIZE = 100;
const CENTER = VIEWBOX_SIZE / 2;
const RING_STROKE = 4;
const RING_RADIUS = 50 - RING_STROKE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const Points = () => {
  const { ringPercentage: percentage } = useAppSelector(selectGameProgress);
  const strokeDashoffset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <Wrapper>
      <LoaderWrapper>
        <LoaderRingSvg viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} aria-hidden>
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RING_RADIUS}
            fill="none"
            stroke={COLORS.TEXT_PRIMARY}
            strokeWidth={RING_STROKE}
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RING_RADIUS}
            fill="none"
            stroke={COLORS.LOADER_FILL}
            strokeWidth={RING_STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </LoaderRingSvg>
        <InnerCircle>
          <PercentageGroup>
            <NumberPart>{Math.round(percentage)}</NumberPart>
            <PercentSign>%</PercentSign>
          </PercentageGroup>
        </InnerCircle>
      </LoaderWrapper>
    </Wrapper>
  );
};

export default Points;