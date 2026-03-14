import { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { ICONS } from '../../../../constants/icons.constants';

const SidebarFooterWrapper = styled.div`
  height: 4rem;
  border-top: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 0;
`;

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border: none;
  background: none;
  font-family: ${FONTS.FAMILY.PRIMARY};
  cursor: pointer;
  color: ${COLORS.FOOTER_SETTINGS_TEXT};

  &:hover {
    color: ${COLORS.TEXT_PRIMARY};
  }
`;

const SettingsIcon = styled.img`
  width: ${FONTS.SIZE.XLARGE};
  height: ${FONTS.SIZE.XLARGE};
  object-fit: contain;
`;

const SettingsLabel = styled.span`
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.NORMAL};
`;

const ProfilePill = styled.button<{ $isOpen: boolean; }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${COLORS.PROFILE_PILL_BORDER};
  border-radius: 0.5rem;
  background: ${COLORS.PROFILE_PILL_BG};
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: ${COLORS.BORDER_SUBTLE};
  }
`;

const ProfileAvatarIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
`;

const Chevron = styled.span<{ $pointUp: boolean; }>`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 0.35rem solid transparent;
  border-right: 0.35rem solid transparent;
  border-bottom: 0.4rem solid ${COLORS.FOOTER_SETTINGS_TEXT};
  transform: rotate(${(p) => (p.$pointUp ? '0deg' : '180deg')});
  transition: transform 0.2s ease;
`;

const SidebarFooter = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <SidebarFooterWrapper>
      <SettingsButton type="button" aria-label="Settings">
        <SettingsIcon src={ICONS.SETTINGS_ICON} alt="" />
        <SettingsLabel>Settings</SettingsLabel>
      </SettingsButton>
      <ProfilePill
        type="button"
        $isOpen={isProfileOpen}
        onClick={() => setIsProfileOpen((prev) => !prev)}
        aria-label="Profile"
        aria-expanded={isProfileOpen}
      >
        <ProfileAvatarIcon src={ICONS.PROFILE_ICON} alt="" />
        <Chevron $pointUp={isProfileOpen} aria-hidden />
      </ProfilePill>
    </SidebarFooterWrapper>
  );
};

export default SidebarFooter;
