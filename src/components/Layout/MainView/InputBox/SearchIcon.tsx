import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';

const Svg = styled.svg`
  flex-shrink: 0;
  width: ${FONTS.SIZE.XLARGE};
  height: ${FONTS.SIZE.XLARGE};
  color: ${COLORS.MUTED_WHITE};
`;

const SearchIcon = () => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </Svg>
);

export default SearchIcon;
