import type { PriceAlert, CoinMarketData } from '../types/crypto';
import { deactivateAlert, getAlerts } from './storage';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title: string, body: string, icon?: string): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/vite.svg',
      badge: '/vite.svg',
    });
  }
};

export const checkPriceAlerts = (coins: CoinMarketData[]): PriceAlert[] => {
  const alerts = getAlerts();
  const triggeredAlerts: PriceAlert[] = [];

  alerts.forEach((alert) => {
    if (!alert.isActive) return;

    const coin = coins.find((c) => c.id === alert.coinId);
    if (!coin) return;

    const currentPrice = coin.current_price;
    let triggered = false;

    if (alert.condition === 'above' && currentPrice >= alert.targetPrice) {
      triggered = true;
    } else if (alert.condition === 'below' && currentPrice <= alert.targetPrice) {
      triggered = true;
    }

    if (triggered) {
      triggeredAlerts.push(alert);
      showNotification(
        `🚨 Price Alert: ${alert.coinName}`,
        `${coin.name} is now ${alert.condition === 'above' ? 'above' : 'below'} $${alert.targetPrice.toLocaleString()}! Current price: $${currentPrice.toLocaleString()}`
      );
      deactivateAlert(alert.id);
    }
  });

  return triggeredAlerts;
};
