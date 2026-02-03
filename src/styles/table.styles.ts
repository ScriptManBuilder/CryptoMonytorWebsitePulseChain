import styled from 'styled-components';
import { devices } from './common.styles';

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), rgba(124, 58, 237, 0.4), transparent);
  }

  /* Custom scrollbar for table */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #7c3aed, #4f46e5);
    border-radius: 4px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media ${devices.tablet} {
    table-layout: auto;
  }
`;

export const TableHead = styled.thead`
  background: linear-gradient(180deg, rgba(124, 58, 237, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TableHeader = styled.th<{ $sortable?: boolean }>`
  padding: 18px 14px;
  text-align: left;
  font-weight: 700;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  white-space: nowrap;
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  user-select: none;
  transition: all 0.3s ease;
  position: relative;

  &:nth-child(1) { width: 60px; }      /* Rank */
  &:nth-child(2) { width: 180px; }     /* Coin Name */
  &:nth-child(3) { width: 120px; }     /* Price */
  &:nth-child(4) { width: 100px; }     /* 24h */
  &:nth-child(5) { width: 100px; }     /* 7d */
  &:nth-child(6) { width: 130px; }     /* Volume */
  &:nth-child(7) { width: 140px; }     /* Market Cap */
  &:nth-child(8) { width: 160px; }     /* Last 7 Days */
  &:nth-child(9) { width: 100px; }     /* Watchlist */

  ${({ $sortable }) =>
    $sortable &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #7c3aed, #00d4ff);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover::after {
      width: 80%;
    }
  `}

  &:hover {
    color: ${({ $sortable }) => ($sortable ? '#fff' : '#64748b')};
  }

  &:first-child {
    padding-left: 24px;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  transition: background 0.2s ease;
  
  &:hover {
    background: linear-gradient(90deg, rgba(124, 58, 237, 0.08) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%);
    transform: scale(1.002);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
`;

export const TableCell = styled.td`
  padding: 18px 14px;
  font-size: 0.9rem;
  vertical-align: middle;
  color: #e2e8f0;

  &:first-child {
    padding-left: 24px;
  }
`;

export const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const CoinImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  ${TableRow}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const CoinName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CoinNameText = styled.span`
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
  display: block;
  cursor: help;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }

  @media ${devices.laptopL} {
    max-width: 200px;
  }

  @media ${devices.laptop} {
    max-width: 180px;
  }

  @media ${devices.tablet} {
    max-width: 140px;
  }
`;

export const CoinSymbol = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PriceChange = styled.span<{ $positive: boolean }>`
  color: ${({ $positive }) => ($positive ? '#4ade80' : '#f87171')};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 8px;
  background: ${({ $positive }) =>
    $positive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  font-size: 0.85rem;
  width: fit-content;
`;

export const WatchlistButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ $active }) => ($active ? 'transparent' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 8px 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ $active }) => ($active ? '#1a1a2e' : '#64748b')};

  &:hover {
    transform: scale(1.15);
    box-shadow: ${({ $active }) =>
      $active ? '0 4px 20px rgba(251, 191, 36, 0.4)' : '0 4px 15px rgba(255, 255, 255, 0.1)'};
  }

  &:active {
    transform: scale(1);
  }
`;

export const SparklineContainer = styled.div`
  width: 140px;
  height: 45px;
  opacity: 0.9;
  transition: opacity 0.3s ease;

  ${TableRow}:hover & {
    opacity: 1;
  }
`;

export const RankBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 28px;
  padding: 0 10px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #a78bfa;
`;
