import { useState, useCallback, useEffect } from 'react';
import type { WatchlistItem } from '../types/crypto';
import {
  getWatchlist,
  addToWatchlist as addToStorage,
  removeFromWatchlist as removeFromStorage,
  isInWatchlist as checkInWatchlist,
} from '../services/storage';

interface UseWatchlistReturn {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: Omit<WatchlistItem, 'addedAt'>) => void;
  removeFromWatchlist: (coinId: string) => void;
  isInWatchlist: (coinId: string) => boolean;
}

export const useWatchlist = (): UseWatchlistReturn => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const addToWatchlist = useCallback((item: Omit<WatchlistItem, 'addedAt'>) => {
    const updated = addToStorage(item);
    setWatchlist(updated);
  }, []);

  const removeFromWatchlist = useCallback((coinId: string) => {
    const updated = removeFromStorage(coinId);
    setWatchlist(updated);
  }, []);

  const isInWatchlist = useCallback((coinId: string) => {
    return checkInWatchlist(coinId);
  }, []);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
};
