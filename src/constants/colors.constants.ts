export const COLORS = {
  TRANSPARENT: 'transparent',

  // Layout backgrounds
  SIDEBAR_BG: '#303030',
  MAIN_BG: '#1A1A1A',

  // Input, user message, etc
  PRIMARY_BLUE: '#1E293B',
  // Hover and select colors
  PRIMARY_BLUE_LIGHT: '#2C3547',

  // Text
  TEXT_PRIMARY: '#F1F5F9',
  TEXT_PRIMARY_MUTED: '#f1f5f9de',
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
  // USER_MESSAGE_BG: '#2f325c69',
  USER_MESSAGE_BG: '#2C3547',

  // Borders
  BORDER_SUBTLE: 'rgba(255, 255, 255, 0.2)',
  BORDER_SUBTLE_HOVER: 'rgba(255, 255, 255, 0.3)',

  // Points loader ring
  LOADER_FILL: '#14B8A6',

  // Stars / achievements
  STAR_ACCENT: '#FCD34D', // amber-gold for star display

  // Leaderboard podium
  LEADERBOARD_GOLD: '#FCD34D', // 1st place
  LEADERBOARD_SILVER: '#94A3B8', // 2nd place
  LEADERBOARD_BRONZE: '#D97706', // 3rd place

  // Modal overlay
  MODAL_BACKDROP: 'rgba(0, 0, 0, 0.65)',
  MODAL_SHADOW: 'rgba(0, 0, 0, 0.5)',
  MODAL_SHADOW_SOFT: 'rgba(0, 0, 0, 0.3)',

  // Typing loader dots (oscillating)
  TYPING_DOT_GREEN: '#14B8A6', // teal, matches LOADER_FILL
  TYPING_DOT_AMBER: '#FCD34D', // amber
  TYPING_DOT_BLUE: '#60A5FA', // soft blue

  // glassy green
  GLASS_GREEN: 'rgba(6, 95, 70, 0.5)', // #065F46, points > 80
  HISTORY_ITEM_POINTS_TEXT: '#6EE7B7', // green text

  // glassy amber
  GLASS_AMBER: 'rgba(180, 83, 9, 0.45)', // amber, points > 60
  HISTORY_ITEM_POINTS_AMBER_TEXT: '#FCD34D', // amber text

  // glassy neutral (try chainging it to glassy blue)
  POINTS_NEUTRAL_BG: '#334155', // points > 0 and <= 60
  POINTS_NEUTRAL_TEXT: '#94A3B8', // slate-400

  // glassy blue
  // POINTS_BLUE_BG: '#214276', // points > 0 and <= 60
  // POINTS_BLUE_TEXT: '#2B7FFF', // slate-400

  // glassy red
  GLASS_RED: 'rgba(127, 29, 29, 0.5)', // red, points === 0
  HISTORY_ITEM_POINTS_RED_TEXT: '#FCA5A5', // red text

  // Sidebar footer
  FOOTER_BG: '#2B2A31',
  FOOTER_SETTINGS_TEXT: '#C0C7D0', // light grey for Settings label
  PROFILE_PILL_BG: '#38383D', // dark grey rounded container
  PROFILE_PILL_BORDER: 'rgba(255, 255, 255, 0.12)',
  PROFILE_AVATAR_GRADIENT: 'linear-gradient(180deg, #A78BFA 0%, #7C3AED 100%)', // purple

  /** Header control that opens the right agent-style panel */
  AGENT_PANEL_TRIGGER_BUTTON_BG: '#0a0a0a',
} as const;
