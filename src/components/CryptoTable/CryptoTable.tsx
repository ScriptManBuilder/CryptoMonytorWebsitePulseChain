import { memo } from 'react';
import type { CoinMarketData, SortConfig, SortField } from '../../types/crypto';
import { formatPrice, formatLargeNumber, formatPercentage } from '../../utils/formatters';
import SparklineChart from '../SparklineChart';
import {
  TableWrapper,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  CoinInfo,
  CoinImage,
  CoinName,
  CoinNameText,
  CoinSymbol,
  PriceChange,
  WatchlistButton,
  RankBadge,
} from '../../styles/table.styles';

interface CryptoTableProps {
  coins: CoinMarketData[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  isInWatchlist: (coinId: string) => boolean;
  onToggleWatchlist: (coin: CoinMarketData) => void;
}

const CryptoTable = ({
  coins,
  sortConfig,
  onSort,
  isInWatchlist,
  onToggleWatchlist,
}: CryptoTableProps) => {
  const getSortIndicator = (field: SortField) => {
    if (sortConfig.field !== field) return '';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  const renderPriceChange = (value: number | undefined) => {
    if (value === undefined || value === null) return <span>N/A</span>;
    return (
      <PriceChange $positive={value >= 0}>
        {value >= 0 ? '▲' : '▼'} {formatPercentage(value)}
      </PriceChange>
    );
  };

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Coin</TableHeader>
            <TableHeader
              $sortable
              onClick={() => onSort('current_price')}
            >
              Price{getSortIndicator('current_price')}
            </TableHeader>
            <TableHeader
              $sortable
              onClick={() => onSort('price_change_percentage_24h')}
            >
              24h{getSortIndicator('price_change_percentage_24h')}
            </TableHeader>
            <TableHeader
              $sortable
              onClick={() => onSort('price_change_percentage_7d_in_currency')}
            >
              7d{getSortIndicator('price_change_percentage_7d_in_currency')}
            </TableHeader>
            <TableHeader
              $sortable
              onClick={() => onSort('total_volume')}
            >
              Volume (24h){getSortIndicator('total_volume')}
            </TableHeader>
            <TableHeader
              $sortable
              onClick={() => onSort('market_cap')}
            >
              Market Cap{getSortIndicator('market_cap')}
            </TableHeader>
            <TableHeader>Last 7 Days</TableHeader>
            <TableHeader>Watchlist</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell>
                <RankBadge>{coin.market_cap_rank}</RankBadge>
              </TableCell>
              <TableCell>
                <CoinInfo>
                  <CoinImage src={coin.image} alt={coin.name} />
                  <CoinName>
                    <CoinNameText title={coin.name}>{coin.name}</CoinNameText>
                    <CoinSymbol>{coin.symbol}</CoinSymbol>
                  </CoinName>
                </CoinInfo>
              </TableCell>
              <TableCell>{formatPrice(coin.current_price)}</TableCell>
              <TableCell>
                {renderPriceChange(coin.price_change_percentage_24h)}
              </TableCell>
              <TableCell>
                {renderPriceChange(coin.price_change_percentage_7d_in_currency)}
              </TableCell>
              <TableCell>{formatLargeNumber(coin.total_volume)}</TableCell>
              <TableCell>{formatLargeNumber(coin.market_cap)}</TableCell>
              <TableCell>
                {coin.sparkline_in_7d?.price && (
                  <SparklineChart
                    data={coin.sparkline_in_7d.price}
                    isPositive={(coin.price_change_percentage_7d_in_currency ?? 0) >= 0}
                  />
                )}
              </TableCell>
              <TableCell>
                <WatchlistButton
                  $active={isInWatchlist(coin.id)}
                  onClick={() => onToggleWatchlist(coin)}
                  title={isInWatchlist(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  {isInWatchlist(coin.id) ? '★' : '☆'}
                </WatchlistButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default memo(CryptoTable);
