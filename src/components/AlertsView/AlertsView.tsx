import { useState } from 'react';
import type { CoinMarketData, PriceAlert } from '../../types/crypto';
import { formatPrice } from '../../utils/formatters';
import { Button, Input, Select } from '../../styles/common.styles';
import {
  AlertsContainer,
  AlertForm,
  FormGroup,
  Label,
  AlertsList,
  AlertItem,
  AlertInfo,
  AlertTitle,
  AlertCondition,
  AlertStatus,
  AlertActions,
  DeleteButton,
  EmptyAlerts,
  NotificationBanner,
  BannerText,
} from '../../styles/alerts.styles';

interface AlertsViewProps {
  alerts: PriceAlert[];
  coins: CoinMarketData[];
  onAddAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  onRemoveAlert: (alertId: string) => void;
  notificationsEnabled: boolean;
  onEnableNotifications: () => void;
}

const AlertsView = ({
  alerts,
  coins,
  onAddAlert,
  onRemoveAlert,
  notificationsEnabled,
  onEnableNotifications,
}: AlertsViewProps) => {
  const [selectedCoinId, setSelectedCoinId] = useState<string>('bitcoin');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const coin = coins.find((c) => c.id === selectedCoinId);
    if (!coin || !targetPrice) return;

    onAddAlert({
      coinId: selectedCoinId,
      coinName: coin.name,
      targetPrice: parseFloat(targetPrice),
      condition,
      isActive: true,
    });

    setTargetPrice('');
  };

  const selectedCoin = coins.find((c) => c.id === selectedCoinId);

  return (
    <AlertsContainer>
      <NotificationBanner $enabled={notificationsEnabled}>
        <BannerText>
          {notificationsEnabled ? (
            <>
              ✅ Notifications are enabled. You'll receive alerts when prices reach your targets.
            </>
          ) : (
            <>
              ⚠️ Enable browser notifications to receive price alerts
            </>
          )}
        </BannerText>
        {!notificationsEnabled && (
          <Button onClick={onEnableNotifications}>
            Enable Notifications
          </Button>
        )}
      </NotificationBanner>

      <AlertForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Coin</Label>
          <Select
            value={selectedCoinId}
            onChange={(e) => setSelectedCoinId(e.target.value)}
            style={{ minWidth: '180px' }}
          >
            {coins.slice(0, 50).map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Condition</Label>
          <Select
            value={condition}
            onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
          >
            <option value="above">Price goes above</option>
            <option value="below">Price goes below</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Target Price (USD)</Label>
          <Input
            type="number"
            step="any"
            min="0"
            placeholder={selectedCoin ? `Current: ${formatPrice(selectedCoin.current_price)}` : 'Enter price'}
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>&nbsp;</Label>
          <Button type="submit" disabled={!targetPrice}>
            ➕ Add Alert
          </Button>
        </FormGroup>
      </AlertForm>

      <AlertsList>
        {alerts.length === 0 ? (
          <EmptyAlerts>
            <p>🔔 No alerts set</p>
            <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              Create an alert to get notified when a coin reaches your target price
            </p>
          </EmptyAlerts>
        ) : (
          alerts.map((alert) => (
            <AlertItem key={alert.id} $active={alert.isActive}>
              <AlertInfo>
                <AlertTitle>{alert.coinName}</AlertTitle>
                <AlertCondition>
                  Alert when price goes {alert.condition} {formatPrice(alert.targetPrice)}
                </AlertCondition>
              </AlertInfo>
              <AlertActions>
                <AlertStatus $active={alert.isActive}>
                  {alert.isActive ? 'Active' : 'Triggered'}
                </AlertStatus>
                <DeleteButton
                  onClick={() => onRemoveAlert(alert.id)}
                  title="Delete alert"
                >
                  🗑️
                </DeleteButton>
              </AlertActions>
            </AlertItem>
          ))
        )}
      </AlertsList>
    </AlertsContainer>
  );
};

export default AlertsView;
