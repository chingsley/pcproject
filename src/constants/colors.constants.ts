export const COLORS = {
  // Layout backgrounds
  SIDEBAR_BG: '#303030',
  MAIN_BG: '#1A1A1A',

  // Input box
  INPUT_BG: '#1E293B',

  // Text
  TEXT_PRIMARY: '#F1F5F9',
  MUTED_WHITE: '#C0C7D0', // placeholder & icon

  // Action buttons (upload, submit)
  ACTION_BUTTON_BG: '#2C3547',
  ACTION_BUTTON_TEXT: '#C0C7D0',

  // New chat button (sidebar)
  NEW_CHAT_BUTTON_BG: '#3A3E42',
  SHORTCUT_KEY_BG: '#4A4E52', // slightly lighter than button, for ⌘ K labels

  // Surfaces / overlays (buttons, hover states)
  SURFACE_OVERLAY_LIGHT: 'rgba(255, 255, 255, 0.1)',
  SURFACE_OVERLAY_MEDIUM: 'rgba(255, 255, 255, 0.15)',

  // Borders
  BORDER_SUBTLE: 'rgba(255, 255, 255, 0.2)',
  BORDER_SUBTLE_HOVER: 'rgba(255, 255, 255, 0.3)',

  // Points loader ring
  LOADER_FILL: '#14B8A6',

  // History item points badge – dynamic by tier (see HistoryItem)
  GLASS_GREEN: 'rgba(6, 95, 70, 0.5)', // #065F46, points > 80
  HISTORY_ITEM_POINTS_TEXT: '#6EE7B7', // green text
  GLASS_AMBER: 'rgba(180, 83, 9, 0.45)', // amber, points > 60
  HISTORY_ITEM_POINTS_AMBER_TEXT: '#FCD34D', // amber text
  POINTS_NEUTRAL_BG: '#334155', // points > 0 and <= 60
  POINTS_NEUTRAL_TEXT: '#94A3B8', // slate-400
  GLASS_RED: 'rgba(127, 29, 29, 0.5)', // red, points === 0
  HISTORY_ITEM_POINTS_RED_TEXT: '#FCA5A5', // red text

  // History item row states
  // HISTORY_ITEM_HOVER_BG: 'rgba(59, 130, 246, 0.25)', // glassy blue on hover
  HISTORY_ITEM_HOVER_BG: 'rgba(56, 56, 77, 0.5)', // glassy blue on hover
  HISTORY_ITEM_ACTIVE_BG: '#38384D', // selected item
} as const;
