import { useState, useMemo } from 'react';
import styled from 'styled-components';
import type { CoinMarketData, SortConfig, SortField } from './types/crypto';
import { useCryptoData } from './hooks/useCryptoData';
import { useWatchlist } from './hooks/useWatchlist';
import { useAlerts } from './hooks/useAlerts';
import { formatDate } from './utils/formatters';
import CryptoTable from './components/CryptoTable';
import MobileCryptoCard from './components/MobileCryptoCard';
import SearchFilters from './components/SearchFilters';
import WatchlistView from './components/WatchlistView';
import AlertsView from './components/AlertsView';
import {
  GlobalStyles,
  Container,
  Header,
  Logo,
  LastUpdated,
  TabContainer,
  Tab,
  Card,
  LoadingSpinner,
  ErrorMessage,
  devices,
  ItemsPerPageContainer,
  ItemsPerPageLabel,
  ItemsPerPageSelect,
  ResetButton,
  ShowItemsGroup,
} from './styles/common.styles';
import {
  FilterStats,
  StatItem,
  StatLabel,
  StatValue,
} from './styles/filters.styles';

// Responsive wrapper for table/cards
const DesktopOnly = styled.div`
  display: block;
  @media ${devices.tablet} {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media ${devices.tablet} {
    display: block;
  }
`;

type TabType = 'market' | 'watchlist' | 'alerts';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'market_cap_rank',
    direction: 'asc',
  });

  const { coins, loading, error, refetch, lastUpdated } = useCryptoData(300000);
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { alerts, addAlert, removeAlert, notificationsEnabled, enableNotifications } = useAlerts();

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleToggleWatchlist = (coin: CoinMarketData) => {
    if (isInWatchlist(coin.id)) {
      removeFromWatchlist(coin.id);
    } else {
      addToWatchlist({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
      });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setItemsPerPage(30);
    setSortConfig({
      field: 'market_cap_rank',
      direction: 'asc',
    });
  };

  const filteredAndSortedCoins = useMemo(() => {
    let result = [...coins];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
    }

    // Price filter
    switch (priceFilter) {
      case 'under1':
        result = result.filter((coin) => coin.current_price < 1);
        break;
      case '1to100':
        result = result.filter(
          (coin) => coin.current_price >= 1 && coin.current_price < 100
        );
        break;
      case '100to1000':
        result = result.filter(
          (coin) => coin.current_price >= 100 && coin.current_price < 1000
        );
        break;
      case 'over1000':
        result = result.filter((coin) => coin.current_price >= 1000);
        break;
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortConfig.field] ?? 0;
      const bValue = b[sortConfig.field] ?? 0;

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    return result.slice(0, itemsPerPage);
  }, [coins, searchQuery, priceFilter, sortConfig, itemsPerPage]);

  const totalMarketCap = useMemo(() => {
    return coins.reduce((acc, coin) => acc + coin.market_cap, 0);
  }, [coins]);

  const totalVolume = useMemo(() => {
    return coins.reduce((acc, coin) => acc + coin.total_volume, 0);
  }, [coins]);

  const formatLargeNumber = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <Logo>
            <span>📊</span> Crypto Pulse Dashboard
          </Logo>
          {lastUpdated && (
            <LastUpdated>
              🕐 Updates every 5 min · Last: {formatDate(lastUpdated)}
            </LastUpdated>
          )}
        </Header>

        <TabContainer>
          <Tab $active={activeTab === 'market'} onClick={() => setActiveTab('market')}>
            📈 Market
          </Tab>
          <Tab $active={activeTab === 'watchlist'} onClick={() => setActiveTab('watchlist')}>
            ⭐ Watchlist ({watchlist.length})
          </Tab>
          <Tab $active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')}>
            🔔 Alerts ({alerts.filter((a) => a.isActive).length})
          </Tab>
        </TabContainer>

        {activeTab === 'market' && (
          <>
            <FilterStats>
              <StatItem>
                <StatLabel>Total Coins</StatLabel>
                <StatValue>{filteredAndSortedCoins.length}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Total Market Cap</StatLabel>
                <StatValue>{formatLargeNumber(totalMarketCap)}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>24h Volume</StatLabel>
                <StatValue>{formatLargeNumber(totalVolume)}</StatValue>
              </StatItem>
            </FilterStats>

            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              priceFilter={priceFilter}
              onPriceFilterChange={setPriceFilter}
              onRefresh={refetch}
              isLoading={loading}
            />

            <ItemsPerPageContainer>
              <ShowItemsGroup>
                <ItemsPerPageLabel>Show:</ItemsPerPageLabel>
                <ItemsPerPageSelect 
                  value={itemsPerPage} 
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={5}>5 coins</option>
                  <option value={10}>10 coins</option>
                  <option value={30}>30 coins</option>
                  <option value={50}>50 coins</option>
                  <option value={100}>100 coins</option>
                </ItemsPerPageSelect>
              </ShowItemsGroup>
              <ResetButton onClick={handleResetFilters}>
                🔄 Reset Filters
              </ResetButton>
            </ItemsPerPageContainer>

            {loading && coins.length === 0 && <LoadingSpinner />}
            
            {error && (
              <ErrorMessage>
                ⚠️ Error loading data: {error}
                <br />
                <button onClick={refetch} style={{ marginTop: '10px' }}>
                  Try Again
                </button>
              </ErrorMessage>
            )}

            {!loading && !error && filteredAndSortedCoins.length === 0 && (
              <Card style={{ textAlign: 'center', padding: '40px' }}>
                No coins match your search criteria
              </Card>
            )}

            {filteredAndSortedCoins.length > 0 && (
              <>
                <DesktopOnly>
                  <CryptoTable
                    coins={filteredAndSortedCoins}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    isInWatchlist={isInWatchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                </DesktopOnly>
                <MobileOnly>
                  <MobileCryptoCard
                    coins={filteredAndSortedCoins}
                    isInWatchlist={isInWatchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                </MobileOnly>
              </>
            )}
          </>
        )}

        {activeTab === 'watchlist' && (
          <WatchlistView
            watchlist={watchlist}
            coins={coins}
            onRemove={removeFromWatchlist}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsView
            alerts={alerts}
            coins={coins}
            onAddAlert={addAlert}
            onRemoveAlert={removeAlert}
            notificationsEnabled={notificationsEnabled}
            onEnableNotifications={enableNotifications}
          />
        )}
      </Container>
    </>
  );
}

export default App;
