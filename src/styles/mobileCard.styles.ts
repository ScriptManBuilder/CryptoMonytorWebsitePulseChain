import styled from 'styled-components';
import { devices } from './common.styles';

export const MobileCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MobileCard = styled.div`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 18px;
  transition: all 0.3s ease;
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

  &:active {
    transform: scale(0.98);
    background: rgba(124, 58, 237, 0.05);
  }
`;

export const MobileCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const MobileCoinInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MobileCoinImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

export const MobileCoinDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MobileCoinName = styled.span`
  font-weight: 700;
  color: #fff;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  cursor: help;
  transition: color 0.2s ease;

  &:hover {
    color: #c4b5fd;
  }

  @media ${devices.mobileL} {
    max-width: 160px;
  }

  @media ${devices.mobileM} {
    max-width: 140px;
  }

  @media ${devices.mobileS} {
    max-width: 120px;
  }
`;

export const MobileCoinSymbol = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MobileRank = styled.span`
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #a78bfa;
`;

export const MobilePriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const MobilePrice = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const MobileWatchlistButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 10px 14px;
  transition: all 0.3s ease;
  color: ${({ $active }) => ($active ? '#1a1a2e' : '#64748b')};
`;

export const MobileStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const MobileStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
`;

export const MobileStatLabel = styled.span`
  font-size: 0.65rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MobileStatValue = styled.span<{ $positive?: boolean }>`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $positive }) => 
    $positive === undefined ? '#e2e8f0' : $positive ? '#4ade80' : '#f87171'};
  padding: ${({ $positive }) => ($positive !== undefined ? '4px 8px' : '0')};
  border-radius: 6px;
  background: ${({ $positive }) =>
    $positive === undefined
      ? 'transparent'
      : $positive
      ? 'rgba(34, 197, 94, 0.1)'
      : 'rgba(239, 68, 68, 0.1)'};
`;

export const MobileSparkline = styled.div`
  margin-top: 12px;
  height: 50px;
  width: 100%;
`;
