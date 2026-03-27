import type { LeaderboardPanelTierLevel } from './leaderboard.constants';
import { getLeaderboardPanelTier } from './leaderboard.constants';

/** Default recipient name on certificates until a profile exists. */
export const CERTIFICATE_DISPLAY_NAME_DEFAULT = 'You';

export type CertificateLevel = LeaderboardPanelTierLevel;

export interface CertificateDefinition {
  level: CertificateLevel;
  certificateTitle: string;
  achievementLine: string;
  bodyLines: readonly string[];
}

export const CERTIFICATE_DEFINITIONS: readonly CertificateDefinition[] = [
  {
    level: 1,
    certificateTitle: 'Certificate for Explorer (1 Star)',
    achievementLine: 'Demonstrated awareness and desire to preserve critical thinking.',
    bodyLines: [
      'You engage with ideas deliberately, question easy answers, and treat AI as a partner in inquiry rather than a substitute for thought.',
      'This recognition celebrates your commitment to staying in charge of how you learn and reason.',
    ],
  },
  {
    level: 2,
    certificateTitle: 'Certificate for Thinker (2 Stars)',
    achievementLine: 'Consistently shows strong thinking and uses AI to refine and improve ideas.',
    bodyLines: [
      'You iterate on drafts, stress-test assumptions, and ask for critique, evidence, and alternatives.',
      'Your prompts show judgment: you steer the model toward depth, clarity, and intellectual honesty.',
    ],
  },
  {
    level: 3,
    certificateTitle: 'Certificate for Creator (3 Stars)',
    achievementLine: 'Builds original work and uses AI to amplify creative judgment.',
    bodyLines: [
      'You combine synthesis, structure, and voice so outputs remain recognisably your own.',
      'You use tools to explore variants without surrendering authorship or responsibility for the final result.',
    ],
  },
  {
    level: 4,
    certificateTitle: 'Certificate for Leader (4 Stars)',
    achievementLine: 'Models thoughtful direction and helps others raise the quality of inquiry.',
    bodyLines: [
      'You frame problems clearly, set standards for evidence and reasoning, and invite others into better habits.',
      'Your practice shows that leadership here means raising the bar for critical engagement with AI.',
    ],
  },
  {
    level: 5,
    certificateTitle: 'Certificate for Gatekeeper (5 Stars)',
    achievementLine: 'Upholds rigor, ethics, and discernment at the highest level of practice.',
    bodyLines: [
      'You weigh trade-offs, limits, and consequences, and you challenge both hype and lazy shortcuts.',
      'This tier honours sustained excellence in staying reflective, accountable, and in command.',
    ],
  },
] as const;

export function getCertificateDefinition(level: CertificateLevel): CertificateDefinition {
  const def = CERTIFICATE_DEFINITIONS.find((d) => d.level === level);
  if (!def) return CERTIFICATE_DEFINITIONS[0];
  return def;
}

export function getCertificateTierLabels(level: CertificateLevel) {
  return getLeaderboardPanelTier(level);
}

/** For demo purposes, enables left and right arrows to view all certificates */
export const DEMO_MODE_CERTIFICATE_NAVIGATION = true;
