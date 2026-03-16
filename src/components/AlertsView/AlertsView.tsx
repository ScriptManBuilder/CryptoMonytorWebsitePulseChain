import { useState, useMemo } from 'react';
import type { CoinMarketData, PriceAlert, AlertType, AlertCondition, AlertTimeframe } from '../../types/crypto';
import { formatPrice } from '../../utils/formatters';
import { Button, Input, Select } from '../../styles/common.styles';
import {
  AlertsContainer,
  AlertForm,
  FormGroup,
  FormGroupWide,
  FormRow,
  Label,
  NoteInput,
  CheckboxLabel,
  AlertTypeTabs,
  AlertTypeTab,
  SectionHeader,
  SectionTitle,
  AlertCount,
  AlertFilterBar,
  FilterChip,
  AlertsList,
  AlertItem,
  AlertInfo,
  AlertTitle,
  AlertTypeBadge,
  AlertCondition as AlertConditionText,
  AlertNote,
  AlertMeta,
  AlertMetaTag,
  AlertStatus,
  AlertActions,
  ToggleButton,
  DeleteButton,
  ClearButton,
  EmptyAlerts,
  NotificationBanner,
  BannerText,
  TriggeredBanner,
  HistorySection,
  HistoryItem,
} from '../../styles/alerts.styles';

type AlertFilter = 'all' | 'active' | 'triggered' | 'price' | 'percentage';

interface AlertsViewProps {
  alerts: PriceAlert[];
  activeAlerts: PriceAlert[];
  triggeredAlerts: PriceAlert[];
  coins: CoinMarketData[];
  onAddAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'triggeredCount'>) => void;
  onRemoveAlert: (alertId: string) => void;
  onToggleAlert: (alertId: string) => void;
  onClearTriggered: () => void;
  notificationsEnabled: boolean;
  onEnableNotifications: () => void;
  recentlyTriggered: PriceAlert[];
}

const AlertsView = ({
  alerts,
  activeAlerts,
  triggeredAlerts,
  coins,
  onAddAlert,
  onRemoveAlert,
  onToggleAlert,
  onClearTriggered,
  notificationsEnabled,
  onEnableNotifications,
  recentlyTriggered,
}: AlertsViewProps) => {
  // Form state
  const [alertType, setAlertType] = useState<AlertType>('price');
  const [selectedCoinId, setSelectedCoinId] = useState<string>('bitcoin');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [condition, setCondition] = useState<AlertCondition>('above');
  const [percentageChange, setPercentageChange] = useState<string>('');
  const [timeframe, setTimeframe] = useState<AlertTimeframe>('24h');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');

  // Filters
  const [filter, setFilter] = useState<AlertFilter>('all');

  const selectedCoin = coins.find((c) => c.id === selectedCoinId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const coin = coins.find((c) => c.id === selectedCoinId);
    if (!coin) return;

    if (alertType === 'price' && !targetPrice) return;
    if (alertType === 'percentage_change' && !percentageChange) return;

    onAddAlert({
      coinId: selectedCoinId,
      coinName: coin.name,
      coinSymbol: coin.symbol.toUpperCase(),
      alertType,
      targetPrice: alertType === 'price' ? parseFloat(targetPrice) : coin.current_price,
      condition,
      percentageChange: alertType === 'percentage_change' ? parseFloat(percentageChange) : undefined,
      timeframe: alertType === 'percentage_change' ? timeframe : undefined,
      isActive: true,
      isRecurring,
      note: note.trim() || undefined,
    });

    // Reset form
    setTargetPrice('');
    setPercentageChange('');
    setNote('');
    setIsRecurring(false);
  };

  const filteredAlerts = useMemo(() => {
    switch (filter) {
      case 'active':
        return alerts.filter((a) => a.isActive);
      case 'triggered':
        return alerts.filter((a) => !a.isActive);
      case 'price':
        return alerts.filter((a) => a.alertType === 'price' || !a.alertType);
      case 'percentage':
        return alerts.filter((a) => a.alertType === 'percentage_change');
      default:
        return alerts;
    }
  }, [alerts, filter]);

  const formatAlertDescription = (alert: PriceAlert): string => {
    if (alert.alertType === 'percentage_change' && alert.percentageChange) {
      const dir = alert.condition === 'above' ? 'rises' : 'drops';
      return `Alert when price ${dir} by ${alert.percentageChange}% (${alert.timeframe || '24h'})`;
    }
    return `Alert when price goes ${alert.condition} ${formatPrice(alert.targetPrice)}`;
  };

  const formatTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getCurrentPrice = (coinId: string): string => {
    const coin = coins.find((c) => c.id === coinId);
    return coin ? formatPrice(coin.current_price) : 'N/A';
  };

  return (
    <AlertsContainer>
      {/* Notification permission banner */}
      <NotificationBanner $enabled={notificationsEnabled}>
        <BannerText>
          {notificationsEnabled ? (
            <>✅ Notifications enabled — you'll receive alerts when prices reach targets.</>
          ) : (
            <>⚠️ Enable browser notifications to receive price alerts</>
          )}
        </BannerText>
        {!notificationsEnabled && (
          <Button onClick={onEnableNotifications}>Enable Notifications</Button>
        )}
      </NotificationBanner>

      {/* Recently triggered banner */}
      {recentlyTriggered.length > 0 && (
        <TriggeredBanner>
          🔔 <span>{recentlyTriggered.length} alert(s) just triggered!</span>
          {recentlyTriggered.map((a) => a.coinName).join(', ')}
        </TriggeredBanner>
      )}

      {/* Alert type tabs */}
      <AlertTypeTabs>
        <AlertTypeTab $active={alertType === 'price'} onClick={() => setAlertType('price')}>
          💰 Price Target
        </AlertTypeTab>
        <AlertTypeTab $active={alertType === 'percentage_change'} onClick={() => setAlertType('percentage_change')}>
          📊 % Change
        </AlertTypeTab>
      </AlertTypeTabs>

      {/* Create alert form */}
      <AlertForm onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label>Coin</Label>
            <Select
              value={selectedCoinId}
              onChange={(e) => setSelectedCoinId(e.target.value)}
              style={{ minWidth: '180px' }}
            >
              {coins.slice(0, 100).map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()}) — {formatPrice(coin.current_price)}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Condition</Label>
            <Select
              value={condition}
              onChange={(e) => setCondition(e.target.value as AlertCondition)}
            >
              {alertType === 'price' ? (
                <>
                  <option value="above">Price goes above</option>
                  <option value="below">Price goes below</option>
                </>
              ) : (
                <>
                  <option value="above">Rises by</option>
                  <option value="below">Drops by</option>
                </>
              )}
            </Select>
          </FormGroup>

          {alertType === 'price' ? (
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
          ) : (
            <>
              <FormGroup>
                <Label>% Change</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder="e.g. 5"
                  value={percentageChange}
                  onChange={(e) => setPercentageChange(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Timeframe</Label>
                <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value as AlertTimeframe)}>
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                </Select>
              </FormGroup>
            </>
          )}

          <FormGroup>
            <Label>&nbsp;</Label>
            <Button
              type="submit"
              disabled={alertType === 'price' ? !targetPrice : !percentageChange}
            >
              ➕ Add Alert
            </Button>
          </FormGroup>
        </FormRow>

        {/* Advanced options row */}
        <FormRow>
          <FormGroupWide>
            <Label>Note (optional)</Label>
            <NoteInput
              type="text"
              placeholder="Add a note to remember why you set this alert..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={100}
            />
          </FormGroupWide>
        </FormRow>

        <FormRow>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
            />
            🔁 Recurring alert (re-activates after triggering)
          </CheckboxLabel>
        </FormRow>
      </AlertForm>

      {/* Active Alerts Section */}
      <SectionHeader>
        <SectionTitle>
          🔔 Your Alerts <AlertCount>{activeAlerts.length} active / {alerts.length} total</AlertCount>
        </SectionTitle>
        <AlertFilterBar>
          {(['all', 'active', 'triggered', 'price', 'percentage'] as AlertFilter[]).map((f) => (
            <FilterChip key={f} $active={filter === f} onClick={() => setFilter(f)}>
              {f === 'all' && 'All'}
              {f === 'active' && '🟢 Active'}
              {f === 'triggered' && '🔴 Triggered'}
              {f === 'price' && '💰 Price'}
              {f === 'percentage' && '📊 % Change'}
            </FilterChip>
          ))}
        </AlertFilterBar>
      </SectionHeader>

      <AlertsList>
        {filteredAlerts.length === 0 ? (
          <EmptyAlerts>
            <p>🔔 {filter === 'all' ? 'No alerts set' : `No ${filter} alerts`}</p>
            <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              {filter === 'all'
                ? 'Create an alert to get notified when a coin reaches your target price or changes by a percentage'
                : 'Try changing the filter to see more alerts'}
            </p>
          </EmptyAlerts>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertItem key={alert.id} $active={alert.isActive}>
              <AlertInfo>
                <AlertTitle>
                  {alert.coinName}
                  <AlertTypeBadge $type={alert.alertType || 'price'}>
                    {alert.alertType === 'percentage_change' ? '% CHANGE' : 'PRICE'}
                  </AlertTypeBadge>
                  {alert.isRecurring && (
                    <AlertTypeBadge $type="percentage_change">🔁 RECURRING</AlertTypeBadge>
                  )}
                </AlertTitle>
                <AlertConditionText>
                  {formatAlertDescription(alert)}
                </AlertConditionText>
                {alert.note && <AlertNote>📝 {alert.note}</AlertNote>}
                <AlertMeta>
                  <AlertMetaTag>
                    📈 Now: {getCurrentPrice(alert.coinId)}
                  </AlertMetaTag>
                  <AlertMetaTag>
                    🕐 Created: {formatTimeAgo(alert.createdAt)}
                  </AlertMetaTag>
                  {alert.triggeredAt && (
                    <AlertMetaTag>
                      ⚡ Triggered: {formatTimeAgo(alert.triggeredAt)}
                    </AlertMetaTag>
                  )}
                  {alert.triggeredCount > 0 && (
                    <AlertMetaTag>
                      🔢 Triggered {alert.triggeredCount}x
                    </AlertMetaTag>
                  )}
                </AlertMeta>
              </AlertInfo>
              <AlertActions>
                <AlertStatus $active={alert.isActive}>
                  {alert.isActive ? 'Active' : 'Triggered'}
                </AlertStatus>
                <ToggleButton
                  $active={alert.isActive}
                  onClick={() => onToggleAlert(alert.id)}
                  title={alert.isActive ? 'Pause alert' : 'Re-activate alert'}
                >
                  {alert.isActive ? '⏸' : '▶️'}
                </ToggleButton>
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

      {/* Triggered History */}
      {triggeredAlerts.length > 0 && (
        <HistorySection>
          <SectionHeader>
            <SectionTitle>📜 Triggered History</SectionTitle>
            <ClearButton onClick={onClearTriggered}>
              🗑️ Clear History
            </ClearButton>
          </SectionHeader>
          <AlertsList style={{ marginTop: '14px' }}>
            {triggeredAlerts.map((alert) => (
              <HistoryItem key={alert.id}>
                <AlertInfo>
                  <AlertTitle>
                    {alert.coinName}
                    <AlertTypeBadge $type={alert.alertType || 'price'}>
                      {alert.alertType === 'percentage_change' ? '% CHANGE' : 'PRICE'}
                    </AlertTypeBadge>
                  </AlertTitle>
                  <AlertConditionText>
                    {formatAlertDescription(alert)}
                  </AlertConditionText>
                  {alert.triggeredAt && (
                    <AlertMetaTag>
                      ⚡ Triggered {formatTimeAgo(alert.triggeredAt)}
                      {alert.triggeredCount > 1 && ` (${alert.triggeredCount} times)`}
                    </AlertMetaTag>
                  )}
                </AlertInfo>
                <DeleteButton
                  onClick={() => onRemoveAlert(alert.id)}
                  title="Remove from history"
                >
                  🗑️
                </DeleteButton>
              </HistoryItem>
            ))}
          </AlertsList>
        </HistorySection>
      )}
    </AlertsContainer>
  );
};

export default AlertsView;
