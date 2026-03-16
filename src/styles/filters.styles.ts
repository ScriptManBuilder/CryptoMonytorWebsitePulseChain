import styled, { keyframes } from 'styled-components';
import { devices } from './common.styles';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;


export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  margin-bottom: 16px;
  align-items: center;

  @media ${devices.tablet} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 13px 20px;
  padding-left: 48px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: #475569;
  }

  &:focus {
    border-color: rgba(124, 58, 237, 0.5);
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1), 0 0 20px rgba(124, 58, 237, 0.05);
    background: rgba(255, 255, 255, 0.05);
  }

  @media ${devices.mobileL} {
    padding: 11px 18px;
    padding-left: 44px;
    font-size: 0.85rem;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;

  &::before {
    content: '🔍';
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.1rem;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  &:focus-within::before {
    opacity: 1;
  }

  @media ${devices.mobileL} {
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  padding: 14px 40px 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  min-width: 140px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237c3aed' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
  }

  &:hover {
    border-color: rgba(124, 58, 237, 0.5);
    background: rgba(255, 255, 255, 0.06);
  }

  option {
    background: #1a1a3e;
    color: #fff;
    padding: 12px;
  }

  @media ${devices.tablet} {
    width: 100%;
  }

  @media ${devices.mobileL} {
    padding: 12px 36px 12px 16px;
    font-size: 0.9rem;
  }
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media ${devices.tablet} {
    width: 100%;
    
    > * {
      flex: 1;
    }
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 10px;
  }
`;

export const RefreshButton = styled.button`
  padding: 13px 24px;
  border: 1px solid rgba(124, 58, 237, 0.25);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(99, 102, 241, 0.06) 100%);
  color: #c4b5fd;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.22) 0%, rgba(99, 102, 241, 0.12) 100%);
    border-color: rgba(124, 58, 237, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(124, 58, 237, 0.25);
    color: #fff;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  @media ${devices.mobileL} {
    padding: 11px 18px;
    font-size: 0.85rem;
  }
`;

export const FilterStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  position: relative;

  @media ${devices.tablet} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border-radius: 18px;
  border: 1px solid rgba(124, 58, 237, 0.12);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #7c3aed, #00d4ff, #f472b6);
    background-size: 200% 100%;
    animation: ${shimmer} 3s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(20px, -20px);
    pointer-events: none;
  }

  &:hover {
    background: rgba(124, 58, 237, 0.06);
    border-color: rgba(124, 58, 237, 0.25);
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);
  }

  &:nth-child(2)::after {
    background: radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%);
  }

  &:nth-child(3)::after {
    background: radial-gradient(circle, rgba(244, 114, 182, 0.08) 0%, transparent 70%);
  }

  @media ${devices.mobileL} {
    padding: 18px;
  }
`;

export const StatIcon = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${({ $color }) => $color || 'rgba(124, 58, 237, 0.15)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-bottom: 2px;
`;

export const StatLabel = styled.span`
  font-size: 0.72rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
`;

export const StatValue = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  line-height: 1;

  @media ${devices.mobileL} {
    font-size: 1.3rem;
  }
`;
