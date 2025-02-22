import { mockProducts } from './products';

let mockUseDelayedSearchState = {
  search: '',
  setSearch: vi.fn(),
  delayedSearch: '',
};

export const setMockUseDelayedSearchState = (
  newState: Partial<typeof mockUseDelayedSearchState>
) => {
  mockUseDelayedSearchState = { ...mockUseDelayedSearchState, ...newState };
};

export const mockUseDelayedSearch = () => ({ ...mockUseDelayedSearchState });

let mockUseScrollTopState = {
  showBackToTop: false,
  scrollToTop: vi.fn(),
};

export const setMockUseScrollTopState = (
  newState: Partial<typeof mockUseScrollTopState>
) => {
  mockUseScrollTopState = { ...mockUseScrollTopState, ...newState };
};

export const mockUseScrollTop = () => ({ ...mockUseScrollTopState });

let getProductsMockState = {
  data: mockProducts,
  isLoading: false,
  isError: false,
};

export const setMockUseGetProductsState = (
  newState: Partial<typeof getProductsMockState>
) => {
  getProductsMockState = { ...getProductsMockState, ...newState };
};

export const mockUseGetProducts = () => ({ ...getProductsMockState });
