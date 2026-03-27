/**
 * Image assets: all non-icon images from src/assets/ must be imported here
 * and exported. Use IMAGES.* in components; do not import from assets directly.
 */
import heroImage from '../assets/hero.png';
import viteLogo from '../assets/vite.svg';
import certExplorer from '../assets/certificates/cert_explorer.png';
import certThinker from '../assets/certificates/cert_thinker.png';
import certCreator from '../assets/certificates/cert_creator.png';
import certLeader from '../assets/certificates/cert_leader.png';
import certGatekeeper from '../assets/certificates/cert_gatekeeper.png';

export const IMAGES = {
  HERO: heroImage,
  VITE_LOGO: viteLogo,
  CERT_EXPLORER: certExplorer,
  CERT_THINKER: certThinker,
  CERT_CREATOR: certCreator,
  CERT_LEADER: certLeader,
  CERT_GATEKEEPER: certGatekeeper,
} as const;
