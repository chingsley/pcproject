import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { FiLogIn } from 'react-icons/fi';
import { COLORS } from '../../../constants/colors.constants';
import { FONTS } from '../../../constants/fonts.constants';
import { SPACING } from '../../../constants/spacing.constants';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/slices/userSlice';
import { drawBorder } from '../../../utils/playground';

const LoginCard = styled.div`
  width: 100%;
  width: 60%;
  height: 60%;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-bottom: 5rem;
  padding-top: 3rem;
  border-radius: ${SPACING.RADIUS_SMALL};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  background: ${COLORS.PRIMARY_BLUE};
  box-sizing: border-box;
  border: ${drawBorder('white', true)};
`;

const Title = styled.h1`
  margin: 0 0 ${SPACING.FIXED_OFFSET};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.XLARGEPLUS};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.FIXED_OFFSET};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.BUTTON_PADDING_Y};
  text-align: left;
`;

const Label = styled.label`
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALLER};
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  background: ${COLORS.SURFACE_OVERLAY_LIGHT};
  color: ${COLORS.TEXT_PRIMARY};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};

  &::placeholder {
    color: ${COLORS.MUTED_WHITE};
  }

  &:focus {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

const headerActionStyles = `
  background: transparent;
  border: ${SPACING.BORDER_WIDTH} solid ${COLORS.BORDER_SUBTLE};
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.LARGE};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  border-radius: ${SPACING.RADIUS_SMALLER};
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${COLORS.SURFACE_OVERLAY_LIGHT};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }

  &:focus-visible {
    outline: ${SPACING.BORDER_WIDTH} solid ${COLORS.STAR_ACCENT};
    outline-offset: 0.125rem;
  }
`;

const SubmitButton = styled.button`
  ${headerActionStyles}
  width: 100%;
  height: 3rem;
  background: ${COLORS.PRIMARY_BLUE};
    &:hover {
    background: ${COLORS.PRIMARY_BLUE};
    border-color: ${COLORS.BORDER_SUBTLE_HOVER};
  }
`;

const DemoAccountInfo = styled.p`

  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  font-weight: ${FONTS.WEIGHT.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY_MUTED};
  text-align: center;
  padding-bottom: 3rem;
  border: ${drawBorder('red')};
`;

const MainLoginForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setPassword('');
  };

  return (
    <LoginCard>
      <DemoAccountInfo>This is a demo version. just click the sign in button to login.</DemoAccountInfo>
      <Title id="main-login-title">Sign in</Title>
      <Form onSubmit={handleSubmit} aria-labelledby="main-login-title">
        <Field>
          <Label htmlFor="main-login-email">Email</Label>
          <Input
            id="main-login-email"
            name="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </Field>
        <Field>
          <Label htmlFor="main-login-password">Password</Label>
          <Input
            id="main-login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </Field>
        <SubmitButton type="submit">
          <FiLogIn aria-hidden />
          Sign in
        </SubmitButton>
      </Form>
    </LoginCard>
  );
};

export default MainLoginForm;
