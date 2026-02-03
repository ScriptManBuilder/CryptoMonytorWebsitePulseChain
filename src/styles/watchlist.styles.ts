import styled from 'styled-components';
import { devices } from './common.styles';

export const WatchlistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;

  @media ${devices.laptop} {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  @media ${devices.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const WatchlistCard = styled.div`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.4), rgba(0, 212, 255, 0.4), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    border-color: rgba(124, 58, 237, 0.3);
    transform: translateY(-6px);
    box-shadow: 0 8px 40px rgba(124, 58, 237, 0.15);
  }

  &:hover::after {
    opacity: 1;
  }

  @media ${devices.mobileL} {
    padding: 20px;
    border-radius: 20px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

export const CoinHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const CoinIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  ${WatchlistCard}:hover & {
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(124, 58, 237, 0.3);
  }

  @media ${devices.mobileL} {
    width: 42px;
    height: 42px;
  }
`;

export const CoinDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CoinTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  cursor: help;
  transition: color 0.2s ease;

  &:hover {
    color: #c4b5fd;
  }

  @media ${devices.laptop} {
    max-width: 220px;
  }

  @media ${devices.tablet} {
    max-width: 180px;
  }

  @media ${devices.mobileL} {
    font-size: 1.05rem;
    max-width: 160px;
  }

  @media ${devices.mobileM} {
    max-width: 140px;
  }
`;

export const CoinTicker = styled.span`
  font-size: 0.8rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

export const RemoveButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #64748b;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
    transform: scale(1.05);
  }
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

export const CurrentPrice = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;

  @media ${devices.mobileL} {
    font-size: 1.75rem;
  }
`;

export const PriceChanges = styled.div`
  display: flex;
  gap: 20px;

  @media ${devices.mobileL} {
    gap: 16px;
  }
`;

export const ChangeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ChangeLabel = styled.span`
  font-size: 0.65rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

export const ChangeValue = styled.span<{ $positive: boolean }>`
  font-size: 0.95rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 8px;
  background: ${({ $positive }) =>
    $positive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  color: ${({ $positive }) => ($positive ? '#4ade80' : '#f87171')};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  z-index: 1;

  @media ${devices.mobileL} {
    gap: 12px;
    padding-top: 16px;
  }
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.04);

  @media ${devices.mobileL} {
    padding: 10px;
  }
`;

export const StatTitle = styled.span`
  font-size: 0.65rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

export const StatData = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #e2e8f0;

  @media ${devices.mobileL} {
    font-size: 0.9rem;
  }
`;

export const EmptyWatchlist = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  border: 2px dashed rgba(255, 255, 255, 0.1);

  @media ${devices.mobileL} {
    padding: 60px 20px;
  }
`;

export const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.4;
  filter: grayscale(0.5);

  @media ${devices.mobileL} {
    font-size: 4rem;
  }
`;

export const EmptyTitle = styled.h3`
  font-size: 1.4rem;
  color: #94a3b8;
  margin-bottom: 12px;
  font-weight: 700;

  @media ${devices.mobileL} {
    font-size: 1.2rem;
  }
`;

export const EmptyText = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  max-width: 300px;
  margin: 0 auto;
  line-height: 1.6;

  @media ${devices.mobileL} {
    font-size: 0.9rem;
  }
`;
