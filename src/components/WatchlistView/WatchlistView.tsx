import type { CoinMarketData, WatchlistItem } from '../../types/crypto';
import { formatPrice, formatLargeNumber, formatPercentage } from '../../utils/formatters';
import SparklineChart from '../SparklineChart';
import {
  WatchlistContainer,
  WatchlistCard,
  CardHeader,
  CoinHeader,
  CoinIcon,
  CoinDetails,
  CoinTitle,
  CoinTicker,
  RemoveButton,
  PriceSection,
  CurrentPrice,
  PriceChanges,
  ChangeItem,
  ChangeLabel,
  ChangeValue,
  StatsGrid,
  StatBox,
  StatTitle,
  StatData,
  EmptyWatchlist,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
} from '../../styles/watchlist.styles';
import { SparklineContainer } from '../../styles/table.styles';

interface WatchlistViewProps {
  watchlist: WatchlistItem[];
  coins: CoinMarketData[];
  onRemove: (coinId: string) => void;
}

const WatchlistView = ({ watchlist, coins, onRemove }: WatchlistViewProps) => {
  const getWatchlistCoins = (): CoinMarketData[] => {
    return watchlist
      .map((item) => coins.find((coin) => coin.id === item.id))
      .filter((coin): coin is CoinMarketData => coin !== undefined);
  };

  const watchlistCoins = getWatchlistCoins();

  if (watchlistCoins.length === 0) {
    return (
      <WatchlistContainer>
        <EmptyWatchlist>
          <EmptyIcon>⭐</EmptyIcon>
          <EmptyTitle>Your watchlist is empty</EmptyTitle>
          <EmptyText>
            Add coins to your watchlist by clicking the star icon in the market table
          </EmptyText>
        </EmptyWatchlist>
      </WatchlistContainer>
    );
  }

  return (
    <WatchlistContainer>
      {watchlistCoins.map((coin) => (
        <WatchlistCard key={coin.id}>
          <CardHeader>
            <CoinHeader>
              <CoinIcon src={coin.image} alt={coin.name} />
              <CoinDetails>
                <CoinTitle title={coin.name}>{coin.name}</CoinTitle>
                <CoinTicker>{coin.symbol}</CoinTicker>
              </CoinDetails>
            </CoinHeader>
            <RemoveButton
              onClick={() => onRemove(coin.id)}
              title="Remove from watchlist"
            >
              ✕
            </RemoveButton>
          </CardHeader>

          <PriceSection>
            <CurrentPrice>{formatPrice(coin.current_price)}</CurrentPrice>
            <PriceChanges>
              <ChangeItem>
                <ChangeLabel>24h</ChangeLabel>
                <ChangeValue $positive={coin.price_change_percentage_24h >= 0}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </ChangeValue>
              </ChangeItem>
              <ChangeItem>
                <ChangeLabel>7d</ChangeLabel>
                <ChangeValue
                  $positive={(coin.price_change_percentage_7d_in_currency ?? 0) >= 0}
                >
                  {formatPercentage(coin.price_change_percentage_7d_in_currency)}
                </ChangeValue>
              </ChangeItem>
            </PriceChanges>
          </PriceSection>

          {coin.sparkline_in_7d?.price && (
            <SparklineContainer style={{ width: '100%', height: '60px', marginBottom: '16px' }}>
              <SparklineChart
                data={coin.sparkline_in_7d.price}
                isPositive={(coin.price_change_percentage_7d_in_currency ?? 0) >= 0}
              />
            </SparklineContainer>
          )}

          <StatsGrid>
            <StatBox>
              <StatTitle>Market Cap</StatTitle>
              <StatData>{formatLargeNumber(coin.market_cap)}</StatData>
            </StatBox>
            <StatBox>
              <StatTitle>Volume (24h)</StatTitle>
              <StatData>{formatLargeNumber(coin.total_volume)}</StatData>
            </StatBox>
            <StatBox>
              <StatTitle>24h High</StatTitle>
              <StatData>{formatPrice(coin.high_24h)}</StatData>
            </StatBox>
            <StatBox>
              <StatTitle>24h Low</StatTitle>
              <StatData>{formatPrice(coin.low_24h)}</StatData>
            </StatBox>
          </StatsGrid>
        </WatchlistCard>
      ))}
    </WatchlistContainer>
  );
};

export default WatchlistView;
