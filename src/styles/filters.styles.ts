import styled from 'styled-components';
import { devices } from './common.styles';



export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;

  @media ${devices.tablet} {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media ${devices.mobileL} {
    gap: 10px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  padding-left: 50px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
    background: rgba(255, 255, 255, 0.06);
  }

  @media ${devices.mobileL} {
    padding: 12px 18px;
    padding-left: 46px;
    font-size: 0.9rem;
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
  padding: 14px 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(99, 102, 241, 0.15) 100%);
    border-color: rgba(124, 58, 237, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media ${devices.mobileL} {
    padding: 12px 18px;
    font-size: 0.9rem;
  }
`;

export const FilterStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(124, 58, 237, 0.2);
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff 20%, #7c3aed 50%, #f472b6 80%, transparent);
  }

  @media ${devices.tablet} {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px;
  }

  @media ${devices.mobileL} {
    padding: 16px;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(124, 58, 237, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2);
  }

  @media ${devices.mobileL} {
    padding: 16px;
  }
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 700;
`;

export const StatValue = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;

  @media ${devices.mobileL} {
    font-size: 1.2rem;
  }
`;
