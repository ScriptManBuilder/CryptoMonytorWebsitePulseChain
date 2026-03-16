import { useState, useCallback, useEffect, useRef } from 'react';
import type { PriceAlert, CoinMarketData } from '../types/crypto';
import {
  getAlerts,
  addAlert as addToStorage,
  removeAlert as removeFromStorage,
  toggleAlert as toggleInStorage,
  clearTriggeredAlerts as clearTriggeredInStorage,
} from '../services/storage';
import { requestNotificationPermission, checkPriceAlerts } from '../services/notifications';

interface UseAlertsReturn {
  alerts: PriceAlert[];
  activeAlerts: PriceAlert[];
  triggeredAlerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'triggeredCount'>) => void;
  removeAlert: (alertId: string) => void;
  toggleAlert: (alertId: string) => void;
  clearTriggered: () => void;
  notificationsEnabled: boolean;
  enableNotifications: () => Promise<void>;
  checkAlerts: (coins: CoinMarketData[]) => void;
  recentlyTriggered: PriceAlert[];
}

export const useAlerts = (): UseAlertsReturn => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [recentlyTriggered, setRecentlyTriggered] = useState<PriceAlert[]>([]);
  const previouslyTriggeredIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    setAlerts(getAlerts());
    setNotificationsEnabled(
      typeof Notification !== 'undefined' && Notification.permission === 'granted'
    );
  }, []);

  const activeAlerts = alerts.filter((a) => a.isActive);
  const triggeredAlerts = alerts.filter((a) => !a.isActive && a.triggeredAt);

  const addAlert = useCallback((alert: Omit<PriceAlert, 'id' | 'createdAt' | 'triggeredCount'>) => {
    const updated = addToStorage(alert);
    setAlerts(updated);
  }, []);

  const removeAlert = useCallback((alertId: string) => {
    const updated = removeFromStorage(alertId);
    setAlerts(updated);
    previouslyTriggeredIds.current.delete(alertId);
  }, []);

  const toggleAlert = useCallback((alertId: string) => {
    const updated = toggleInStorage(alertId);
    setAlerts(updated);
  }, []);

  const clearTriggered = useCallback(() => {
    const updated = clearTriggeredInStorage();
    setAlerts(updated);
    setRecentlyTriggered([]);
    previouslyTriggeredIds.current.clear();
  }, []);

  const enableNotifications = useCallback(async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
  }, []);

  const checkAlerts = useCallback((coins: CoinMarketData[]) => {
    const triggered = checkPriceAlerts(coins);
    if (triggered.length > 0) {
      // Filter out already-notified alerts to avoid duplicates
      const newTriggers = triggered.filter(
        (t) => !previouslyTriggeredIds.current.has(t.id)
      );
      if (newTriggers.length > 0) {
        newTriggers.forEach((t) => previouslyTriggeredIds.current.add(t.id));
        setRecentlyTriggered((prev) => [...prev, ...newTriggers]);
      }
      // Refresh alerts from storage to get updated state
      setAlerts(getAlerts());
    }
  }, []);

  return {
    alerts,
    activeAlerts,
    triggeredAlerts,
    addAlert,
    removeAlert,
    toggleAlert,
    clearTriggered,
    notificationsEnabled,
    enableNotifications,
    checkAlerts,
    recentlyTriggered,
  };
};
