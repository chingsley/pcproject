import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiLogOut } from 'react-icons/fi';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { ICONS } from '../../../../constants/icons.constants';
import { drawBorder } from '../../../../utils/playground';
import { LAYOUT } from '../../../../constants/layout.constants';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectIsAuthenticated } from '../../../../store/selectors/userSelectors';
import { logout } from '../../../../store/slices/userSlice';

const SidebarFooterWrapper = styled.div`
  height: 4rem;
  border-top: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem ${LAYOUT.SIDEBAR_ITEM_X_PADDING};
  border: ${drawBorder('orange')};
  gap: ${SPACING.BUTTON_PADDING_X};
`;

const FooterButton = styled.button`
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

const ButtonIcon = styled.img`
  width: ${FONTS.SIZE.XLARGE};
  height: ${FONTS.SIZE.XLARGE};
  object-fit: contain;
`;

const ButtonLabel = styled.span`
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.NORMAL};
`;

const ProfileWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const ProfilePill = styled.button<{ $isOpen: boolean; $interactive: boolean; }>`
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  padding: ${SPACING.BUTTON_PADDING_Y};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.PROFILE_PILL_BORDER};
  border-radius: ${SPACING.RADIUS_SMALLER};
  background: ${COLORS.PROFILE_PILL_BG};
  cursor: ${(p) => (p.$interactive ? 'pointer' : 'default')};
  box-shadow: 0 ${SPACING.BORDER_WIDTH} ${SPACING.SHORTCUT_KEY_PADDING_X} ${COLORS.MODAL_SHADOW_SOFT};

  &:hover {
    border-color: ${COLORS.BORDER_SUBTLE};
  }

  &:disabled {
    opacity: 0.65;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  right: 0;
  bottom: 100%;
  margin-bottom: ${SPACING.BUTTON_PADDING_Y};
  min-width: 10rem;
  padding: ${SPACING.BUTTON_PADDING_Y};
  border-radius: ${SPACING.RADIUS_SMALLER};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  background: ${COLORS.FOOTER_BG};
  box-shadow: 0 ${SPACING.BUTTON_PADDING_Y} ${SPACING.FIXED_OFFSET} ${COLORS.MODAL_SHADOW};
  box-sizing: border-box;
  z-index: 1;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${SPACING.BUTTON_PADDING_Y};
  width: 100%;
  margin: 0;
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border: none;
  border-radius: ${SPACING.RADIUS_SMALLER};
  background: transparent;
  cursor: pointer;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.FOOTER_SETTINGS_TEXT};
  text-align: left;

  &:hover {
    color: ${COLORS.TEXT_PRIMARY};
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  }

  &:focus-visible {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

const LogoutIcon = styled(FiLogOut)`
  flex-shrink: 0;
  width: ${FONTS.SIZE.LARGE};
  height: ${FONTS.SIZE.LARGE};
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
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = profileWrapRef.current;
      if (el && !el.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isProfileOpen]);

  const handleProfileClick = () => {
    if (!isAuthenticated) return;
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
  };

  return (
    <SidebarFooterWrapper>
      <FooterButton type="button" aria-label="Settings">
        <ButtonIcon src={ICONS.SETTINGS_ICON} alt="" />
        <ButtonLabel>Settings</ButtonLabel>
      </FooterButton>
      <ProfileWrap ref={profileWrapRef}>
        {isProfileOpen && isAuthenticated ? (
          <ProfileMenu role="menu" aria-label="Profile menu">
            <LogoutButton type="button" role="menuitem" onClick={handleLogout}>
              <LogoutIcon aria-hidden />
              Log out
            </LogoutButton>
          </ProfileMenu>
        ) : null}
        <ProfilePill
          type="button"
          $isOpen={isProfileOpen}
          $interactive={isAuthenticated}
          onClick={handleProfileClick}
          aria-label="Profile"
          aria-expanded={isAuthenticated ? isProfileOpen : undefined}
          aria-haspopup={isAuthenticated ? 'menu' : undefined}
          disabled={!isAuthenticated}
        >
          <ProfileAvatarIcon src={ICONS.PROFILE_ICON} alt="" />
          <Chevron $pointUp={isProfileOpen} aria-hidden />
        </ProfilePill>
      </ProfileWrap>
    </SidebarFooterWrapper>
  );
};

export default SidebarFooter;
