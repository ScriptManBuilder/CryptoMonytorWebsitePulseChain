import { useState, useCallback, useEffect } from 'react';
import type { PriceAlert } from '../types/crypto';
import {
  getAlerts,
  addAlert as addToStorage,
  removeAlert as removeFromStorage,
} from '../services/storage';
import { requestNotificationPermission } from '../services/notifications';

interface UseAlertsReturn {
  alerts: PriceAlert[];
  addAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  removeAlert: (alertId: string) => void;
  notificationsEnabled: boolean;
  enableNotifications: () => Promise<void>;
}

export const useAlerts = (): UseAlertsReturn => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

  useEffect(() => {
    setAlerts(getAlerts());
    setNotificationsEnabled(Notification.permission === 'granted');
  }, []);

  const addAlert = useCallback((alert: Omit<PriceAlert, 'id' | 'createdAt'>) => {
    const updated = addToStorage(alert);
    setAlerts(updated);
  }, []);

  const removeAlert = useCallback((alertId: string) => {
    const updated = removeFromStorage(alertId);
    setAlerts(updated);
  }, []);

  const enableNotifications = useCallback(async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
  }, []);

  return {
    alerts,
    addAlert,
    removeAlert,
    notificationsEnabled,
    enableNotifications,
  };
};
