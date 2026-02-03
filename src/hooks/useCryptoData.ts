import { useState, useEffect, useCallback } from 'react';
import type { CoinMarketData } from '../types/crypto';
import { fetchTopCoins } from '../services/api';
import { checkPriceAlerts } from '../services/notifications';

interface UseCryptoDataReturn {
  coins: CoinMarketData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export const useCryptoData = (autoRefreshInterval: number = 300000): UseCryptoDataReturn => {
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTopCoins(1, 100, 'usd');
      setCoins(data);
      setLastUpdated(new Date());
      
      // Check price alerts
      if (data.length > 0) {
        checkPriceAlerts(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Auto-refresh
    const interval = setInterval(fetchData, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, autoRefreshInterval]);

  return {
    coins,
    loading,
    error,
    refetch: fetchData,
    lastUpdated,
  };
};
