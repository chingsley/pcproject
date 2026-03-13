import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { ICONS } from '../../../../constants/icons.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const Button = styled.button`
  width: ${SPACING.UPLOAD_BUTTON_SIZE};
  height: ${SPACING.UPLOAD_BUTTON_SIZE};
  border-radius: 50%;
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  background-color: ${COLORS.ACTION_BUTTON_BG};
  color: ${COLORS.ACTION_BUTTON_TEXT};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Icon = styled.img`
  width: ${FONTS.SIZE.XLARGE};
  height: ${FONTS.SIZE.XLARGE};
  object-fit: contain;
`;

const UploadButton = () => (
  <Button type="button" aria-label="Upload file">
    <Icon src={ICONS.CROSS_ICON} alt="" />
  </Button>
);

export default UploadButton;
