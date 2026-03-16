import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { devices } from '../../styles/common.styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  padding: 6px 16px 6px 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #fff;

  &:hover {
    background: rgba(124, 58, 237, 0.15);
    border-color: rgba(124, 58, 237, 0.4);
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.2);
  }

  @media ${devices.mobileL} {
    padding: 6px 10px 6px 6px;
    gap: 6px;
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #00d4ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed, #00d4ff, #f472b6);
    z-index: -1;
    opacity: 0.5;
  }
`;

const UserLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: #94a3b8;

  @media ${devices.mobileL} {
    display: none;
  }
`;

const Dropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 360px;
  background: rgba(15, 15, 35, 0.98);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(124, 58, 237, 0.25);
  border-radius: 20px;
  overflow: hidden;
  z-index: 1000;
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  animation: ${slideIn} 0.25s ease-out;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(124, 58, 237, 0.1);

  @media ${devices.tablet} {
    width: 320px;
    right: -10px;
  }

  @media ${devices.mobileL} {
    width: calc(100vw - 32px);
    right: -60px;
  }
`;

const DropdownHeader = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(0, 212, 255, 0.08));
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
`;

const DropdownTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
`;

const DropdownSubtitle = styled.p`
  font-size: 0.8rem;
  color: #64748b;
`;

const FormContainer = styled.div`
  padding: 24px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const TabRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 4px;
`;

const FormTab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 10px;
  background: ${({ $active }) =>
    $active ? 'linear-gradient(135deg, #7c3aed, #6366f1)' : 'transparent'};
  border: none;
  border-radius: 10px;
  color: ${({ $active }) => ($active ? '#fff' : '#64748b')};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: #fff;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 14px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 6px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.25s ease;

  &::placeholder {
    color: #475569;
  }

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
    background: rgba(255, 255, 255, 0.06);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 6px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
  color: #475569;
  font-size: 0.75rem;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
`;

const ProfileAuth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formMode, setFormMode] = useState<'login' | 'signup'>('login');

  return (
    <ProfileWrapper>
      <AvatarButton onClick={() => setIsOpen(!isOpen)}>
        <Avatar>👤</Avatar>
        <UserLabel>Sign In</UserLabel>
      </AvatarButton>

      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}

      <Dropdown $open={isOpen}>
        <DropdownHeader>
          <DropdownTitle>Welcome to Crypto Pulse</DropdownTitle>
          <DropdownSubtitle>Track, analyze, and manage your portfolio</DropdownSubtitle>
        </DropdownHeader>

        <FormContainer>
          <TabRow>
            <FormTab $active={formMode === 'login'} onClick={() => setFormMode('login')}>
              Sign In
            </FormTab>
            <FormTab $active={formMode === 'signup'} onClick={() => setFormMode('signup')}>
              Sign Up
            </FormTab>
          </TabRow>

          {formMode === 'login' ? (
            <>
              <InputGroup>
                <InputLabel>Email</InputLabel>
                <StyledInput type="email" placeholder="your@email.com" />
              </InputGroup>
              <InputGroup>
                <InputLabel>Password</InputLabel>
                <StyledInput type="password" placeholder="••••••••" />
              </InputGroup>
              <SubmitButton type="button">Sign In</SubmitButton>
            </>
          ) : (
            <>
              <InputGroup>
                <InputLabel>Username</InputLabel>
                <StyledInput type="text" placeholder="cryptotrader" />
              </InputGroup>
              <InputGroup>
                <InputLabel>Email</InputLabel>
                <StyledInput type="email" placeholder="your@email.com" />
              </InputGroup>
              <InputGroup>
                <InputLabel>Password</InputLabel>
                <StyledInput type="password" placeholder="••••••••" />
              </InputGroup>
              <SubmitButton type="button">Create Account</SubmitButton>
            </>
          )}

          <Divider>or continue with</Divider>

          <SocialButtons>
            <SocialButton type="button">
              <span>🌐</span> Google
            </SocialButton>
            <SocialButton type="button">
              <span>🐙</span> GitHub
            </SocialButton>
            <SocialButton type="button">
              <span>💼</span> Wallet
            </SocialButton>
          </SocialButtons>
        </FormContainer>
      </Dropdown>
    </ProfileWrapper>
  );
};

export default ProfileAuth;
