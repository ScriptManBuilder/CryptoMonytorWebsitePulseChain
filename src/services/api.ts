import axios from 'axios';
import type { CoinMarketData } from '../types/crypto';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

const api = axios.create({
  baseURL: COINGECKO_BASE_URL,
  timeout: 10000,
});

export const fetchTopCoins = async (
  page: number = 1,
  perPage: number = 100,
  currency: string = 'usd'
): Promise<CoinMarketData[]> => {
  try {
    const response = await api.get<CoinMarketData[]>('/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: true,
        price_change_percentage: '24h,7d',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top coins:', error);
    throw error;
  }
};

export const searchCoins = async (query: string): Promise<CoinMarketData[]> => {
  try {
    const response = await api.get('/search', {
      params: { query },
    });
    return response.data.coins.slice(0, 10);
  } catch (error) {
    console.error('Error searching coins:', error);
    throw error;
  }
};
