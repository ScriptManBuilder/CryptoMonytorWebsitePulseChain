import type { WatchlistItem, PriceAlert } from '../types/crypto';

const WATCHLIST_KEY = 'crypto_pulse_watchlist';
const ALERTS_KEY = 'crypto_pulse_alerts';

// Watchlist functions
export const getWatchlist = (): WatchlistItem[] => {
  try {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addToWatchlist = (item: Omit<WatchlistItem, 'addedAt'>): WatchlistItem[] => {
  const watchlist = getWatchlist();
  const exists = watchlist.some((w) => w.id === item.id);
  
  if (!exists) {
    const newItem: WatchlistItem = {
      ...item,
      addedAt: Date.now(),
    };
    const updated = [...watchlist, newItem];
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    return updated;
  }
  
  return watchlist;
};

export const removeFromWatchlist = (coinId: string): WatchlistItem[] => {
  const watchlist = getWatchlist();
  const updated = watchlist.filter((w) => w.id !== coinId);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  return updated;
};

export const isInWatchlist = (coinId: string): boolean => {
  const watchlist = getWatchlist();
  return watchlist.some((w) => w.id === coinId);
};

// Price alerts functions
export const getAlerts = (): PriceAlert[] => {
  try {
    const data = localStorage.getItem(ALERTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addAlert = (alert: Omit<PriceAlert, 'id' | 'createdAt'>): PriceAlert[] => {
  const alerts = getAlerts();
  const newAlert: PriceAlert = {
    ...alert,
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
  };
  const updated = [...alerts, newAlert];
  localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
  return updated;
};

export const removeAlert = (alertId: string): PriceAlert[] => {
  const alerts = getAlerts();
  const updated = alerts.filter((a) => a.id !== alertId);
  localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
  return updated;
};

export const deactivateAlert = (alertId: string): PriceAlert[] => {
  const alerts = getAlerts();
  const updated = alerts.map((a) =>
    a.id === alertId ? { ...a, isActive: false } : a
  );
  localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
  return updated;
};
