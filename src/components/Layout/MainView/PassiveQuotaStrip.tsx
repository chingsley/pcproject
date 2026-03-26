import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { LAYOUT } from '../../../constants/layout.constants';
import { SPACING } from '../../../constants/spacing.constants';
import { useAppSelector } from '../../../store/hooks';
import {
  formatDurationCompact,
  getOperantQuotaDisplayState,
} from '../../../utils/operantQuotaDisplay';

const Strip = styled.div`
   max-width: ${LAYOUT.INPUT_BOX_WIDTH};
  align-self: flex-start;
  margin-bottom: 0.5rem;
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  border-radius: ${SPACING.RADIUS_SMALLER};
  background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  box-sizing: border-box;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // gap: ${SPACING.BUTTON_PADDING_X};
`;

const Text = styled.span`
  display: block;
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  line-height: 1.4;
  text-align: left;
`;

const Badge = styled.span<{ $alert: boolean; }>`
  flex-shrink: 0;
  border: ${SPACING.BORDER_WIDTH} solid
    ${(props) => (props.$alert ? COLORS.STAR_ACCENT : COLORS.BORDER_SUBTLE_HOVER)};
  border-radius: ${SPACING.RADIUS_PILL};
  padding: ${SPACING.SHORTCUT_KEY_PADDING_Y} ${SPACING.SHORTCUT_KEY_PADDING_X};
  color: ${(props) => (props.$alert ? COLORS.STAR_ACCENT : COLORS.TEXT_PRIMARY)};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  letter-spacing: 0.02em;
`;

const PassiveQuotaStrip = () => {
  const passiveZeroPromptQuota = useAppSelector((state) => state.ui.passiveZeroPromptQuota);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1_000);
    return () => window.clearInterval(id);
  }, []);

  const quotaState = useMemo(
    () => getOperantQuotaDisplayState(passiveZeroPromptQuota, nowMs),
    [passiveZeroPromptQuota, nowMs]
  );

  const bodyText = quotaState.delayActive
    ? `Passive prompt limit reached. Further passive prompts will be delayed.`
    : `${quotaState.passivePromptsLeft} passive prompt${quotaState.passivePromptsLeft === 1 ? '' : 's'
    } left before delays.`;

  const badgeText = quotaState.delayActive
    ? `Resets in ${formatDurationCompact(quotaState.msUntilReset)}`
    : 'No delay';

  return (
    <Strip role="status" aria-live="polite" aria-atomic="true">
      <Text>{bodyText}</Text>
      <Badge $alert={quotaState.delayActive}>{badgeText}</Badge>{/* DO NOT REMOVE THIS BADGE FEATURE */}
    </Strip>
  );
};

export default PassiveQuotaStrip;
