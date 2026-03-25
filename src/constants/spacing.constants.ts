/**
 * Spacing values in rem for responsive scaling.
 */
export const SPACING = {
  BORDER_WIDTH: '0.0625rem', // 1px at 16px base
  RADIUS_SMALLER: '0.375rem', // 6px
  RADIUS_SMALL: '1rem', // 6px
  RADIUS_PILL: '2rem', // 20px - pill-shaped buttons
  BUTTON_PADDING_Y: '0.5rem', // 8px
  BUTTON_PADDING_X: '1rem', // 16px
  FIXED_OFFSET: '1.25rem', // 20px - for fixed-position elements
  UPLOAD_BUTTON_SIZE: '2.5rem', // 40px - circular upload button
  SUBMIT_BUTTON_WIDTH: '6.25rem', // 100px
  SUBMIT_BUTTON_HEIGHT: '2.5rem', // 40px
  SHORTCUT_KEY_RADIUS: '0.25rem', // 4px – rounded square for ⌘ K
  SHORTCUT_KEY_PADDING_X: '0.375rem', // 6px
  SHORTCUT_KEY_PADDING_Y: '0.25rem', // 4px
  SHORTCUT_KEY_GAP: '0.25rem', // 4px between ⌘ and K
  SHORTCUT_KEY_SIZE: '1.25rem', // 20px min height for ⌘ K keys
  TYPING_DOT_SIZE: '0.5rem', // 8px – typing loader dots
  MAIN_VIEW_BOTTOM_MARGIN: '1.25rem', // 20px
  /** Initial vertical offset for hidden “source” row before hover reveal */
  REVEAL_SOURCE_START_OFFSET: '2rem', // 12px at 16px base
  /** Message lift on hover (paired with source sliding down) */
  REVEAL_MESSAGE_LIFT: '0.5rem', // 8px at 16px base
  /** Max height for revealed source row animation */
  REVEAL_SOURCE_MAX_HEIGHT: '3.5rem', // 56px at 16px base
} as const;
