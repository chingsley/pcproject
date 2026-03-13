import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { useAppSelector } from '../../../../store/hooks';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid red;
`;

const InnerCircle = styled.div`
  width: 7rem;
  height: 7rem;
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

const Points = () => {
  const percentage = useAppSelector((state) => state.points.percentage);

  return (
    <Wrapper>
      <InnerCircle>
        <PercentageGroup>
          <NumberPart>{Math.round(percentage)}</NumberPart>
          <PercentSign>%</PercentSign>
        </PercentageGroup>
      </InnerCircle>
    </Wrapper>
  );
};

export default Points;