import styled, { keyframes } from 'styled-components';
import { devices } from './common.styles';

// const shimmer = keyframes`
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// `;

export const WatchlistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;

  @media ${devices.laptop} {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  @media ${devices.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const WatchlistCard = styled.div`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
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
    background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.3), rgba(0, 212, 255, 0.3), transparent);
  }

  &:hover {
    border-color: rgba(124, 58, 237, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(124, 58, 237, 0.12);
  }

  @media ${devices.mobileL} {
    padding: 18px;
    border-radius: 18px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`;

export const CoinHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

export const CoinIcon = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  flex-shrink: 0;

  ${WatchlistCard}:hover & {
    transform: scale(1.08);
    box-shadow: 0 4px 20px rgba(124, 58, 237, 0.25);
  }

  @media ${devices.mobileL} {
    width: 34px;
    height: 34px;
  }
`;

export const CoinDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
`;

export const CoinTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
  transition: color 0.2s ease;

  &:hover {
    color: #c4b5fd;
  }

  @media ${devices.mobileL} {
    font-size: 0.95rem;
  }
`;

export const CoinTicker = styled.span`
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

export const RankBadge = styled.span`
  font-size: 0.6rem;
  font-weight: 700;
  color: #64748b;
  background: rgba(255, 255, 255, 0.04);
  padding: 2px 7px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  letter-spacing: 0.5px;
`;

export const RemoveButton = styled.button`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: #475569;
  cursor: pointer;
  padding: 6px 10px;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  flex-shrink: 0;

  &:hover {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
    transform: scale(1.08);
  }
`;

export const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
`;

export const CurrentPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  line-height: 1;

  @media ${devices.mobileL} {
    font-size: 1.35rem;
  }
`;

export const PriceChange24h = styled.span<{ $positive: boolean }>`
  font-size: 0.8rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  line-height: 1;
  background: ${({ $positive }) =>
    $positive ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)'};
  color: ${({ $positive }) => ($positive ? '#4ade80' : '#f87171')};
  flex-shrink: 0;
`;

export const PriceChanges = styled.div`
  display: flex;
  gap: 16px;

  @media ${devices.mobileL} {
    gap: 12px;
  }
`;

export const ChangeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ChangeLabel = styled.span`
  font-size: 0.6rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

export const ChangeValue = styled.span<{ $positive: boolean }>`
  font-size: 0.8rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${({ $positive }) =>
    $positive ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)'};
  color: ${({ $positive }) => ($positive ? '#4ade80' : '#f87171')};
`;

/* Price range bar (24h low → high) */
export const PriceRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
`;

export const PriceRangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceRangeText = styled.span`
  font-size: 0.65rem;
  color: #475569;
  font-weight: 600;
`;

export const PriceRangeBar = styled.div`
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

export const PriceRangeProgress = styled.div<{ $percent: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $percent }) => Math.max(2, Math.min(100, $percent))}%;
  background: linear-gradient(90deg, #f87171, #facc15, #4ade80);
  border-radius: 4px;
  transition: width 0.6s ease;
`;

export const PriceRangeDot = styled.div<{ $percent: number }>`
  position: absolute;
  left: ${({ $percent }) => Math.max(0, Math.min(100, $percent))}%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid rgba(124, 58, 237, 0.6);
  box-shadow: 0 0 8px rgba(124, 58, 237, 0.4);
  z-index: 1;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;

  @media ${devices.mobileL} {
    gap: 8px;
    padding-top: 12px;
  }
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.03);

  @media ${devices.mobileL} {
    padding: 8px;
  }
`;

export const StatTitle = styled.span`
  font-size: 0.58rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 600;
`;

export const StatData = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: #e2e8f0;
  letter-spacing: -0.2px;

  @media ${devices.mobileL} {
    font-size: 0.78rem;
  }
`;

/* ATH section */
export const AthSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  margin-top: 10px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.06) 0%, rgba(0, 212, 255, 0.04) 100%);
  border-radius: 10px;
  border: 1px solid rgba(124, 58, 237, 0.1);
  position: relative;
  z-index: 1;
`;

export const AthLabel = styled.span`
  font-size: 0.58rem;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
`;

export const AthValue = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  color: #a78bfa;
`;

export const AthChange = styled.span<{ $positive: boolean }>`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ $positive }) => ($positive ? '#4ade80' : '#f87171')};
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
