import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${SPACING.BUTTON_PADDING_Y};
  width: 100%;
  max-width: none;
  padding: ${SPACING.BUTTON_PADDING_Y} 0;
  border-radius: ${SPACING.RADIUS_SMALLER};
  // border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  // background: ${COLORS.TRANSPARENT};
  box-sizing: border-box;
`;

const MessageText = styled.p`
  margin: 0;
  padding: 0 ${SPACING.BUTTON_PADDING_X};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.SMALL};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.MUTED_WHITE};
  text-align: center;
  line-height: 1.45;
`;

const Track = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: stretch;
  width: 100%;
  height: ${SPACING.OPERANT_SYRINGE_TRACK_HEIGHT};
  border-radius: ${SPACING.RADIUS_PILL};
  // background: ${COLORS.SURFACE_OVERLAY_MEDIUM};
  background: ${COLORS.TEXT_PRIMARY_MUTED};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  overflow: hidden;
  box-sizing: border-box;
`;

const Fill = styled.div<{ $fillRatio: number; }>`
  height: 100%;
  width: ${(p) => `${Math.max(0, Math.min(100, p.$fillRatio * 100))}%`};
  flex-shrink: 0;
  border-radius: inherit;
  // background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  background: ${COLORS.PRIMARY_BLUE};
  transform-origin: right center;
  transition: width 100ms linear;
`;

const TimerRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${SPACING.BUTTON_PADDING_X};
`;

const TimerText = styled.span`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.SEMIBOLD};
  font-variant-numeric: tabular-nums;
  color: ${COLORS.TEXT_PRIMARY};
  letter-spacing: 0.04em;
`;

export interface PassiveOutputDelayLoaderProps {
  /** Total delay duration (ms) */
  totalMs: number;
  /** Remaining time (ms), updated by parent timer */
  remainingMs: number;
}

function formatClock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// const WAIT_MESSAGE = "You're waiting because your prompt is passive.";
const WAIT_MESSAGE = "Use active prompts for faster responses.";

const PassiveOutputDelayLoader = ({ totalMs, remainingMs }: PassiveOutputDelayLoaderProps) => {
  const fillRatio = totalMs <= 0 ? 0 : Math.min(1, Math.max(0, remainingMs / totalMs));

  return (
    <Shell
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${WAIT_MESSAGE} ${formatClock(remainingMs)} remaining. Zero prompt score.`}
    >
      <MessageText>{WAIT_MESSAGE}</MessageText>
      <Track aria-hidden>
        <Fill $fillRatio={fillRatio} />
      </Track>
      <TimerRow>
        <TimerText>{formatClock(remainingMs)}</TimerText>
      </TimerRow>
    </Shell>
  );
};

export default PassiveOutputDelayLoader;
