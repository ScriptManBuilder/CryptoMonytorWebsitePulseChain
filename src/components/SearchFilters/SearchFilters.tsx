import {
  FilterContainer,
  SearchWrapper,
  SearchInput,
  FilterSelect,
  RefreshButton,
  FilterActions,
} from '../../styles/filters.styles';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  onRefresh,
  isLoading,
}: SearchFiltersProps) => {
  return (
    <FilterContainer>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search by name or symbol..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SearchWrapper>
      
      <FilterActions>
        <FilterSelect
          value={priceFilter}
          onChange={(e) => onPriceFilterChange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under1">Under $1</option>
          <option value="1to100">$1 - $100</option>
          <option value="100to1000">$100 - $1,000</option>
          <option value="over1000">Over $1,000</option>
        </FilterSelect>

        <RefreshButton onClick={onRefresh} disabled={isLoading}>
          🔄 {isLoading ? 'Loading...' : 'Refresh'}
        </RefreshButton>
      </FilterActions>
    </FilterContainer>
  );
};

export default SearchFilters;
