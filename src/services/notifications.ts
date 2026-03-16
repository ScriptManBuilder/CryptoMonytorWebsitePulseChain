import type { PriceAlert, CoinMarketData } from '../types/crypto';
import { deactivateAlert, reactivateRecurringAlert, getAlerts } from './storage';

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

const checkPercentageAlert = (alert: PriceAlert, coin: CoinMarketData): boolean => {
  if (alert.alertType !== 'percentage_change' || !alert.percentageChange) return false;

  let actualChange: number | undefined;

  switch (alert.timeframe) {
    case '1h':
      // CoinGecko free API doesn't provide 1h change; approximate with 24h / 24
      actualChange = coin.price_change_percentage_24h
        ? coin.price_change_percentage_24h / 24
        : undefined;
      break;
    case '24h':
      actualChange = coin.price_change_percentage_24h;
      break;
    case '7d':
      actualChange = coin.price_change_percentage_7d_in_currency;
      break;
    default:
      actualChange = coin.price_change_percentage_24h;
  }

  if (actualChange === undefined || actualChange === null) return false;

  if (alert.condition === 'above') {
    return actualChange >= alert.percentageChange;
  } else {
    return actualChange <= -Math.abs(alert.percentageChange);
  }
};

const checkPriceTargetAlert = (alert: PriceAlert, coin: CoinMarketData): boolean => {
  const currentPrice = coin.current_price;

  if (alert.condition === 'above' && currentPrice >= alert.targetPrice) {
    return true;
  }
  if (alert.condition === 'below' && currentPrice <= alert.targetPrice) {
    return true;
  }
  return false;
};

const buildNotificationMessage = (alert: PriceAlert, coin: CoinMarketData): { title: string; body: string } => {
  if (alert.alertType === 'percentage_change') {
    const change = alert.timeframe === '7d'
      ? coin.price_change_percentage_7d_in_currency
      : coin.price_change_percentage_24h;
    return {
      title: `📊 % Change Alert: ${alert.coinName}`,
      body: `${coin.name} has changed ${change?.toFixed(2)}% (${alert.timeframe || '24h'}). Threshold: ${alert.condition === 'above' ? '+' : '-'}${alert.percentageChange}%. Current price: $${coin.current_price.toLocaleString()}`,
    };
  }

  return {
    title: `🚨 Price Alert: ${alert.coinName}`,
    body: `${coin.name} is now ${alert.condition === 'above' ? 'above' : 'below'} $${alert.targetPrice.toLocaleString()}! Current price: $${coin.current_price.toLocaleString()}${alert.note ? ` | Note: ${alert.note}` : ''}`,
  };
};

export const checkPriceAlerts = (coins: CoinMarketData[]): PriceAlert[] => {
  const alerts = getAlerts();
  const triggeredAlerts: PriceAlert[] = [];

  alerts.forEach((alert) => {
    if (!alert.isActive) return;

    const coin = coins.find((c) => c.id === alert.coinId);
    if (!coin) return;

    let triggered = false;

    if (alert.alertType === 'percentage_change') {
      triggered = checkPercentageAlert(alert, coin);
    } else {
      triggered = checkPriceTargetAlert(alert, coin);
    }

    if (triggered) {
      triggeredAlerts.push(alert);
      const { title, body } = buildNotificationMessage(alert, coin);
      showNotification(title, body, coin.image);
      deactivateAlert(alert.id);

      // If recurring, re-activate after a short delay so it fires on next data cycle
      if (alert.isRecurring) {
        setTimeout(() => {
          reactivateRecurringAlert(alert.id);
        }, 5000);
      }
    }
  });

  return triggeredAlerts;
};
