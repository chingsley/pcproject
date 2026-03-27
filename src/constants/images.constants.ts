/**
 * Image assets: import non-icon images here and export on `IMAGES`.
 * Use IMAGES.* in components; do not import asset paths directly in components.
 * Certificate art: project `IMG/` (01_explorer … 05_gatekeeper → levels 1–5).
 */
import heroImage from '../assets/hero.png';
import viteLogo from '../assets/vite.svg';
import certExplorer from '../assets/certificates/01_explorer.png';
import certThinker from '../assets/certificates/02_thinker.png';
import certCreator from '../assets/certificates/03_creator.png';
import certLeader from '../assets/certificates/04_leader.png';
import certGatekeeper from '../assets/certificates/05_gatekeeper.png';

export const IMAGES = {
  HERO: heroImage,
  VITE_LOGO: viteLogo,
  CERT_EXPLORER: certExplorer,
  CERT_THINKER: certThinker,
  CERT_CREATOR: certCreator,
  CERT_LEADER: certLeader,
  CERT_GATEKEEPER: certGatekeeper,
} as const;
