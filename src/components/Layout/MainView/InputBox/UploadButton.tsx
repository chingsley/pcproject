import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const Button = styled.button`
  width: ${SPACING.UPLOAD_BUTTON_SIZE};
  height: ${SPACING.UPLOAD_BUTTON_SIZE};
  border-radius: 50%;
  border: none;
  background-color: ${COLORS.ACTION_BUTTON_BG};
  color: ${COLORS.ACTION_BUTTON_TEXT};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${FONTS.SIZE.XLARGE};
  line-height: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const UploadButton = () => <Button type="button" aria-label="Upload file">+</Button>;

export default UploadButton;
