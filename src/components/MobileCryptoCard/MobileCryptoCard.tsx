import { memo } from 'react';
import type { CoinMarketData } from '../../types/crypto';
import { formatPrice, formatLargeNumber, formatPercentage } from '../../utils/formatters';
import SparklineChart from '../SparklineChart';
import {
  MobileCardList,
  MobileCard,
  MobileCardHeader,
  MobileCoinInfo,
  MobileCoinImage,
  MobileCoinDetails,
  MobileCoinName,
  MobileCoinSymbol,
  MobileRank,
  MobilePriceRow,
  MobilePrice,
  MobileWatchlistButton,
  MobileStatsRow,
  MobileStat,
  MobileStatLabel,
  MobileStatValue,
  MobileSparkline,
} from '../../styles/mobileCard.styles';

interface MobileCryptoCardProps {
  coins: CoinMarketData[];
  isInWatchlist: (coinId: string) => boolean;
  onToggleWatchlist: (coin: CoinMarketData) => void;
}

const MobileCryptoCard = ({
  coins,
  isInWatchlist,
  onToggleWatchlist,
}: MobileCryptoCardProps) => {
  return (
    <MobileCardList>
      {coins.map((coin) => (
        <MobileCard key={coin.id}>
          <MobileCardHeader>
            <MobileCoinInfo>
              <MobileCoinImage src={coin.image} alt={coin.name} />
              <MobileCoinDetails>
                <MobileCoinName title={coin.name}>{coin.name}</MobileCoinName>
                <MobileCoinSymbol>{coin.symbol}</MobileCoinSymbol>
              </MobileCoinDetails>
            </MobileCoinInfo>
            <MobileRank>#{coin.market_cap_rank}</MobileRank>
          </MobileCardHeader>

          <MobilePriceRow>
            <MobilePrice>{formatPrice(coin.current_price)}</MobilePrice>
            <MobileWatchlistButton
              $active={isInWatchlist(coin.id)}
              onClick={() => onToggleWatchlist(coin)}
            >
              {isInWatchlist(coin.id) ? '★' : '☆'}
            </MobileWatchlistButton>
          </MobilePriceRow>

          <MobileStatsRow>
            <MobileStat>
              <MobileStatLabel>24h</MobileStatLabel>
              <MobileStatValue $positive={coin.price_change_percentage_24h >= 0}>
                {formatPercentage(coin.price_change_percentage_24h)}
              </MobileStatValue>
            </MobileStat>
            <MobileStat>
              <MobileStatLabel>7d</MobileStatLabel>
              <MobileStatValue 
                $positive={(coin.price_change_percentage_7d_in_currency ?? 0) >= 0}
              >
                {formatPercentage(coin.price_change_percentage_7d_in_currency)}
              </MobileStatValue>
            </MobileStat>
            <MobileStat>
              <MobileStatLabel>MCap</MobileStatLabel>
              <MobileStatValue>
                {formatLargeNumber(coin.market_cap).replace('$', '')}
              </MobileStatValue>
            </MobileStat>
          </MobileStatsRow>

          {coin.sparkline_in_7d?.price && (
            <MobileSparkline>
              <SparklineChart
                data={coin.sparkline_in_7d.price}
                isPositive={(coin.price_change_percentage_7d_in_currency ?? 0) >= 0}
              />
            </MobileSparkline>
          )}
        </MobileCard>
      ))}
    </MobileCardList>
  );
};

export default memo(MobileCryptoCard);
