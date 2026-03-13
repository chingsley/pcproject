/**
 * Image assets: all non-icon images from src/assets/ must be imported here
 * and exported. Use IMAGES.* in components; do not import from assets directly.
 */
import heroImage from '../assets/hero.png';
import viteLogo from '../assets/vite.svg';

export const IMAGES = {
  HERO: heroImage,
  VITE_LOGO: viteLogo,
} as const;
