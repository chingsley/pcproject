import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const Button = styled.button`
  width: ${SPACING.SUBMIT_BUTTON_WIDTH};
  height: ${SPACING.SUBMIT_BUTTON_HEIGHT};
  border-radius: ${SPACING.RADIUS_PILL};
  border: 1px solid ${COLORS.BORDER_SUBTLE};
  background-color: ${COLORS.ACTION_BUTTON_BG};
  color: ${COLORS.ACTION_BUTTON_TEXT};
  cursor: pointer;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = ({ disabled }: { disabled?: boolean }) => (
  <Button type="submit" disabled={disabled}>
    Submit
  </Button>
);

export default SubmitButton;
