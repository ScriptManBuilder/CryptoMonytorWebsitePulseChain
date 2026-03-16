import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Breakpoints for responsive design
export const breakpoints = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const devices = {
  mobileS: `(max-width: ${breakpoints.mobileS})`,
  mobileM: `(max-width: ${breakpoints.mobileM})`,
  mobileL: `(max-width: ${breakpoints.mobileL})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  laptopL: `(max-width: ${breakpoints.laptopL})`,
};

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;



const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: #060612;
    background-image:
      radial-gradient(ellipse at 20% 0%, rgba(124, 58, 237, 0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 100%, rgba(0, 212, 255, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 50%, rgba(15, 15, 35, 1) 0%, #060612 100%);
    background-attachment: fixed;
    min-height: 100vh;
    color: #ffffff;
    overflow-x: hidden;
  }

  /* Animated grid background */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(124, 58, 237, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124, 58, 237, 0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: -1;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 80%);
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(15, 15, 35, 0.8);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #7c3aed 0%, #4f46e5 100%);
    border-radius: 5px;
    border: 2px solid rgba(15, 15, 35, 0.8);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #8b5cf6 0%, #6366f1 100%);
  }

  ::selection {
    background: rgba(124, 58, 237, 0.4);
    color: #fff;
  }
`;

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px 24px;
  position: relative;

  @media ${devices.laptopL} {
    padding: 0 30px 24px;
  }

  @media ${devices.laptop} {
    padding: 0 24px 20px;
  }

  @media ${devices.tablet} {
    padding: 0 16px 16px;
  }

  @media ${devices.mobileL} {
    padding: 0 12px 12px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding: 18px 32px;
  background: rgba(10, 10, 30, 0.7);
  backdrop-filter: blur(30px);
  border-bottom: 1px solid rgba(124, 58, 237, 0.12);
  position: sticky;
  top: 0;
  z-index: 100;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 5%;
    right: 5%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), rgba(124, 58, 237, 0.6), rgba(244, 114, 182, 0.4), transparent);
  }

  @media ${devices.tablet} {
    flex-wrap: wrap;
    gap: 12px;
    padding: 14px 20px;
    margin-bottom: 24px;
  }

  @media ${devices.mobileL} {
    padding: 12px 16px;
    gap: 10px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media ${devices.tablet} {
    gap: 12px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media ${devices.tablet} {
    gap: 10px;
  }
`;

export const LogoIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c3aed, #00d4ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  position: relative;
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 14px;
    padding: 1px;
    background: linear-gradient(135deg, #00d4ff, #7c3aed, #f472b6);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  @media ${devices.mobileL} {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    font-size: 1rem;
  }
`;

export const Logo = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #f472b6 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 5s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 14px;
  letter-spacing: -0.5px;
  cursor: default;
  user-select: none;

  @media ${devices.tablet} {
    font-size: 1.3rem;
  }

  @media ${devices.mobileL} {
    font-size: 1.1rem;
    gap: 10px;
  }

  @media ${devices.mobileM} {
    font-size: 0.95rem;
  }
`;

export const LastUpdated = styled.div`
  font-size: 0.8rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  background: rgba(34, 197, 94, 0.06);
  border-radius: 30px;
  border: 1px solid rgba(34, 197, 94, 0.15);
  
  &::before {
    content: '';
    width: 7px;
    height: 7px;
    background: #22c55e;
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite;
    box-shadow: 0 0 10px #22c55e;
  }

  @media ${devices.mobileL} {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
`;

export const ItemsPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(124, 58, 237, 0.02) 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);\n  flex-wrap: wrap;

  @media ${devices.tablet} {
    justify-content: center;
  }

  @media ${devices.mobileL} {
    gap: 12px;
    padding: 14px 16px;
    flex-direction: column;
  }
`;

export const ShowItemsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media ${devices.mobileL} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ItemsPerPageLabel = styled.label`
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;

  @media ${devices.mobileL} {
    font-size: 0.85rem;
  }
`;

export const ItemsPerPageSelect = styled.select`
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 10px;
  color: white;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(124, 58, 237, 0.2);
    border-color: rgba(124, 58, 237, 0.5);
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
  }
  
  option {
    background: #1a1a2e;
    color: white;
    padding: 8px;
  }

  @media ${devices.mobileL} {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
`;

export const ResetButton = styled.button`
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  color: #f87171;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media ${devices.mobileL} {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  padding: 5px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: fit-content;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 17px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0, 212, 255, 0.1), rgba(244, 114, 182, 0.1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  @media ${devices.tablet} {
    width: 100%;
    justify-content: center;
  }

  @media ${devices.mobileL} {
    gap: 4px;
    padding: 4px;
  }
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.2px;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%)'
      : 'transparent'};
  color: ${({ $active }) => ($active ? '#fff' : '#64748b')};
  box-shadow: ${({ $active }) =>
    $active ? '0 4px 24px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    color: #fff;
    background: ${({ $active }) =>
      $active
        ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6366f1 100%)'
        : 'rgba(124, 58, 237, 0.1)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media ${devices.tablet} {
    padding: 10px 20px;
    font-size: 0.85rem;
  }

  @media ${devices.mobileL} {
    padding: 9px 14px;
    font-size: 0.78rem;
    border-radius: 10px;
  }

  @media ${devices.mobileM} {
    padding: 8px 12px;
    font-size: 0.72rem;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 24px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.3), transparent);
  }

  @media ${devices.tablet} {
    padding: 20px;
    border-radius: 16px;
  }

  @media ${devices.mobileL} {
    padding: 16px;
    border-radius: 14px;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  ${({ $variant = 'primary' }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%);
          color: #fff;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
          &:hover { 
            box-shadow: 0 6px 25px rgba(124, 58, 237, 0.5);
            transform: translateY(-2px); 
          }
          &:active { transform: translateY(0); }
        `;
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          &:hover { 
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(124, 58, 237, 0.5);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #fff;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
          &:hover { 
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  @media ${devices.mobileL} {
    padding: 10px 18px;
    font-size: 0.85rem;
  }
`;

export const Input = styled.input`
  padding: 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: #475569;
  }

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.15), 0 0 20px rgba(124, 58, 237, 0.1);
    background: rgba(255, 255, 255, 0.05);
  }

  @media ${devices.mobileL} {
    padding: 12px 14px;
    font-size: 0.9rem;
  }
`;

export const Select = styled.select`
  padding: 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
  
  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.15);
  }

  option {
    background: #1a1a3e;
    color: #fff;
    padding: 10px;
  }

  @media ${devices.mobileL} {
    padding: 12px 14px;
    font-size: 0.9rem;
    padding-right: 36px;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px;
  gap: 20px;
  
  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 3px solid rgba(124, 58, 237, 0.2);
    border-top-color: #7c3aed;
    border-right-color: #00d4ff;
    border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  &::before {
    content: 'Loading market data...';
    color: #64748b;
    font-size: 0.9rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  color: #fca5a5;

  button {
    margin-top: 16px;
    padding: 10px 24px;
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 10px;
    color: #fca5a5;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(239, 68, 68, 0.3);
    }
  }
`;

export const Badge = styled.span<{ $variant?: 'success' | 'warning' | 'info' }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ $variant = 'info' }) => {
    switch ($variant) {
      case 'success':
        return `
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.3);
        `;
      case 'warning':
        return `
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(234, 179, 8, 0.1) 100%);
          color: #facc15;
          border: 1px solid rgba(234, 179, 8, 0.3);
        `;
      case 'info':
        return `
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
    }
  }}
`;
