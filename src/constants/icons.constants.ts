/**
 * Icon assets: all *.icon.png (and icon assets) from src/assets/ must be
 * imported here and exported. Use ICONS.* in components; do not import from assets directly.
 */
import crossIcon from '../assets/cross.icon.png';
import lightbulbIcon from '../assets/lightbulb.icon.png';
import sidebarToggleIcon from '../assets/sidbartoggle.icon.png';
import newChatIcon from '../assets/newchat.icon.png';
import historyCaptionIcon from '../assets/historycpation.icon.png';

export const ICONS = {
  CROSS_ICON: crossIcon,
  LIGHTBULB_ICON: lightbulbIcon,
  SIDEBAR_TOGGLE_ICON: sidebarToggleIcon,
  NEW_CHAT_ICON: newChatIcon,
  HISTORY_CAPTION_ICON: historyCaptionIcon,
} as const;
