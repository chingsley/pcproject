/**
 * Layout dimensions in rem for responsiveness (scales with root font size).
 * Breakpoints in px for viewport-based media queries.
 */
export const LAYOUT = {
  SIDEBAR_WIDTH: '20.25rem', // 260px at 16px base
  PANEL_PADDING: '1.25rem', // 20px at 16px base
  INPUT_BOX_WIDTH: '48rem', // 768px
  INPUT_BOX_HEIGHT: '9.125rem', // 146px
  BREAKPOINTS: {
    SMALL: '480px',
    MEDIUM: '768px',
    LARGE: '1024px',
  },
} as const;
