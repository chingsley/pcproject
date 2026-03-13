import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import SearchIcon from './SearchIcon';
import UploadButton from './UploadButton';
import SubmitButton from './SubmitButton';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${SPACING.FIXED_OFFSET} 0;
  // border: 1px solid blue;
  width: 100%;
`;

const Box = styled.div`
  width: 100%;
  max-width: ${LAYOUT.INPUT_BOX_WIDTH};
  min-height: ${LAYOUT.INPUT_BOX_HEIGHT};
  background-color: ${COLORS.INPUT_BG};
  border-radius: ${SPACING.RADIUS_SMALL};
  display: flex;
  flex-direction: column;
  padding: ${SPACING.FIXED_OFFSET};
  border: 1px solid ${COLORS.BORDER_SUBTLE};
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.BUTTON_PADDING_X};
  flex: 1;
  min-height: 0;
`;

const TextArea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  resize: none;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  line-height: 1.5;

  &::placeholder {
    color: ${COLORS.MUTED_WHITE};
  }

  &:focus {
    outline: none;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${SPACING.BUTTON_PADDING_Y};
`;

const InputBox = () => {
  return (
    <Wrapper>
      <Box>
        <InputRow>
          <SearchIcon />
          <TextArea
            placeholder="Ask anything"
            rows={3}
            aria-label="Ask anything"
          />
        </InputRow>
        <Footer>
          <UploadButton />
          <SubmitButton />
        </Footer>
      </Box>
    </Wrapper>
  );
};

export default InputBox;
