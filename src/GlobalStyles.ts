import { createGlobalStyle } from 'styled-components';
import { COLORS } from './constants/colors.constants';
import { FONTS } from './constants/fonts.constants';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 100%; /* 16px default; rem scales with user preferences */
  }

  body {
    font-family: ${FONTS.FAMILY.PRIMARY};
    font-size: ${FONTS.SIZE.MEDIUM};
    font-weight: ${FONTS.WEIGHT.NORMAL};
    background-color: ${COLORS.MAIN_BG};
    color: ${COLORS.TEXT_PRIMARY};
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
  }
`;
