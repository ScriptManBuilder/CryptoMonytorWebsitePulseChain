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
  RankBadge,
  RemoveButton,
  PriceSection,
  CurrentPrice,
  PriceChange24h,
  PriceChanges,
  ChangeItem,
  ChangeLabel,
  ChangeValue,
  PriceRangeContainer,
  PriceRangeLabels,
  PriceRangeText,
  PriceRangeBar,
  PriceRangeProgress,
  PriceRangeDot,
  StatsGrid,
  StatBox,
  StatTitle,
  StatData,
  AthSection,
  AthLabel,
  AthValue,
  AthChange,
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

  /** Calculate where the current price sits between 24h low and high (0–100%) */
  const getPriceRangePercent = (coin: CoinMarketData): number => {
    const range = coin.high_24h - coin.low_24h;
    if (range === 0) return 50;
    return ((coin.current_price - coin.low_24h) / range) * 100;
  };

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
      {watchlistCoins.map((coin) => {
        const rangePercent = getPriceRangePercent(coin);
        return (
          <WatchlistCard key={coin.id}>
            <CardHeader>
              <CoinHeader>
                <CoinIcon src={coin.image} alt={coin.name} />
                <CoinDetails>
                  <CoinTitle title={coin.name}>
                    {coin.name}
                  </CoinTitle>
                  <CoinTicker>
                    {coin.symbol}{' '}
                    <RankBadge>#{coin.market_cap_rank}</RankBadge>
                  </CoinTicker>
                </CoinDetails>
              </CoinHeader>
              <RemoveButton
                onClick={() => onRemove(coin.id)}
                title="Remove from watchlist"
              >
                ✕
              </RemoveButton>
            </CardHeader>

            {/* Price + inline 24h badge */}
            <PriceSection>
              <CurrentPrice>{formatPrice(coin.current_price)}</CurrentPrice>
              <PriceChange24h $positive={coin.price_change_percentage_24h >= 0}>
                {formatPercentage(coin.price_change_percentage_24h)}
              </PriceChange24h>
            </PriceSection>

            {/* 24h / 7d change pills */}
            <PriceChanges style={{ marginBottom: '14px' }}>
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

            {/* 24h price range bar */}
            <PriceRangeContainer>
              <PriceRangeLabels>
                <PriceRangeText>L: {formatPrice(coin.low_24h)}</PriceRangeText>
                <PriceRangeText>H: {formatPrice(coin.high_24h)}</PriceRangeText>
              </PriceRangeLabels>
              <PriceRangeBar>
                <PriceRangeProgress $percent={rangePercent} />
                <PriceRangeDot $percent={rangePercent} />
              </PriceRangeBar>
            </PriceRangeContainer>

            {/* Sparkline */}
            {coin.sparkline_in_7d?.price && (
              <SparklineContainer style={{ width: '100%', height: '50px', marginBottom: '14px' }}>
                <SparklineChart
                  data={coin.sparkline_in_7d.price}
                  isPositive={(coin.price_change_percentage_7d_in_currency ?? 0) >= 0}
                />
              </SparklineContainer>
            )}

            {/* Stats grid */}
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
                <StatTitle>Circulating</StatTitle>
                <StatData>
                  {coin.circulating_supply
                    ? `${(coin.circulating_supply / 1e6).toFixed(1)}M`
                    : 'N/A'}
                </StatData>
              </StatBox>
              <StatBox>
                <StatTitle>Vol/MCap</StatTitle>
                <StatData>
                  {coin.market_cap > 0
                    ? `${((coin.total_volume / coin.market_cap) * 100).toFixed(2)}%`
                    : 'N/A'}
                </StatData>
              </StatBox>
            </StatsGrid>

            {/* ATH section */}
            <AthSection>
              <AthLabel>ATH</AthLabel>
              <AthValue>{formatPrice(coin.ath)}</AthValue>
              <AthChange $positive={coin.ath_change_percentage >= 0}>
                {formatPercentage(coin.ath_change_percentage)}
              </AthChange>
            </AthSection>
          </WatchlistCard>
        );
      })}
    </WatchlistContainer>
  );
};

export default WatchlistView;
