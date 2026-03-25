/**
 * Layout dimensions in rem for responsiveness (scales with root font size).
 * Breakpoints in px for viewport-based media queries.
 */
export const LAYOUT = {
  SIDEBAR_WIDTH: '20.25rem', // 260px at 16px base
  LAYOUT_CONTENT_PADDING: '0.6rem', // 20px at 16px base
  SIDEBAR_ITEM_X_PADDING: '0.8rem', // 9.6px at 16px base
  SIDEBAR_HEADER_HEIGHT: '6rem', // 96px
  HEADER_ROW_HEIGHT: '2.5rem', // 50px – header row (lightbulb + title | toggle)
  /** Vertical position of sidebar toggle / main view hamburger (same horizontal level) */
  SIDEBAR_TOGGLE_TOP: '4.25rem', // padding + (header - row)/2 + row - toggle height
  LIGHTBULB_ICON_HEIGHT: '3.125rem', // 50px
  SIDEBAR_TOGGLE_ICON_SIZE: '1.5625rem', // 25px
  NEW_CHAT_BUTTON_WIDTH: '16.75rem', // 268px
  NEW_CHAT_BUTTON_HEIGHT: '2.875rem', // 46px
  NEW_CHAT_BUTTON_RADIUS: '1.4375rem', // 23px, pill (half of height)
  SIDEBAR_POINTS_HEIGHT: '12rem', // 192px
  POINTS_LOADER_SIZE: '6.5rem',
  POINTS_LOADER_GAP: '1rem', // space between loader ring and inner circle
  INPUT_BOX_WIDTH: '48rem', // 768px
  INPUT_BOX_HEIGHT: '9.125rem', // 146px
  BREAKPOINTS: {
    SMALL: '480px',
    MEDIUM: '768px',
    LARGE: '1024px',
  },
  /** Fixed right collapsible panel (agent / tools rail), full viewport height */
  RIGHT_PANEL_WIDTH: '22rem', // ~352px at 16px base
  /** Duration for expand/collapse reveals (e.g. AIFactBlock) */
  REVEAL_TRANSITION_DURATION: '0.38s',
} as const;
