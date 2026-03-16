// Types for cryptocurrency data from CoinGecko API

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface WatchlistItem {
  id: string;
  name: string;
  symbol: string;
  addedAt: number;
}

export type AlertType = 'price' | 'percentage_change';
export type AlertCondition = 'above' | 'below';
export type AlertTimeframe = '1h' | '24h' | '7d';

export interface PriceAlert {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  alertType: AlertType;
  // For price alerts
  targetPrice: number;
  condition: AlertCondition;
  // For percentage change alerts
  percentageChange?: number;
  timeframe?: AlertTimeframe;
  // Common fields
  isActive: boolean;
  isRecurring: boolean;
  note?: string;
  createdAt: number;
  triggeredAt?: number;
  triggeredCount: number;
}

export interface SparklineDataPoint {
  value: number;
  index: number;
}

export type SortField = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h' | 'price_change_percentage_7d_in_currency' | 'total_volume' | 'market_cap';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
