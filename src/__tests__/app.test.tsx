import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { App } from '../app';
import { Providers } from '../providers';
import {
  mockProducts,
  mockUseDelayedSearch,
  mockUseGetProducts,
  mockUseScrollTop,
  setMockUseDelayedSearchState,
  setMockUseGetProductsState,
  setMockUseScrollTopState,
} from '../__mocks__';
import { useDelayedSearch } from '../modules/shared/hooks/useDelayedSearch';

vi.mock('../modules/shared/hooks/useDelayedSearch', () => ({
  useDelayedSearch: () => mockUseDelayedSearch(),
}));

vi.mock('../modules/shared/hooks/useScrollTop', () => ({
  useScrollTop: () => mockUseScrollTop(),
}));

vi.mock('../modules/products/hooks/useGetProducts', () => ({
  useGetProducts: () => mockUseGetProducts(),
}));

describe('App component', () => {
  beforeEach(() => {
    setMockUseGetProductsState({
      isLoading: false,
      isError: false,
      data: mockProducts,
    });
  });

  it('should render app with page title', () => {
    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    const title = screen.getByText(/products/i);

    expect(title).toBeVisible();
  });

  it('should render app with products', () => {
    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    const mockProduct = screen.getByText('Mock Product');

    expect(mockProduct).toBeVisible();
  });

  it('should show products length', () => {
    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    const mockProduct = screen.getByText('Products (2)');

    expect(mockProduct).toBeVisible();
  });

  it('should render loading state', () => {
    setMockUseGetProductsState({ isLoading: true });

    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    setMockUseGetProductsState({ isError: true });

    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Oops, Something went wrong.../i)
    ).toBeInTheDocument();
  });

  it('should render empty state', () => {
    setMockUseGetProductsState({ data: [] });

    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it('should show back to top button', () => {
    setMockUseScrollTopState({ showBackToTop: true });

    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    expect(screen.getByTestId('back-to-top-button')).toBeInTheDocument();
  });

  it('should be able to type on the search box', async () => {
    const user = userEvent.setup();

    const setSearch = vi.fn();

    setMockUseDelayedSearchState({ setSearch, search: '', delayedSearch: '' });

    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    const searchBox = screen.getByLabelText(
      'search-product'
    ) as HTMLInputElement;

    await user.type(searchBox, 'jacket');

    expect(setSearch).toHaveBeenNthCalledWith(1, 'j');
    expect(setSearch).toHaveBeenNthCalledWith(2, 'a');
    expect(setSearch).toHaveBeenNthCalledWith(3, 'c');
    expect(setSearch).toHaveBeenNthCalledWith(4, 'k');
    expect(setSearch).toHaveBeenNthCalledWith(5, 'e');
    expect(setSearch).toHaveBeenNthCalledWith(6, 't');
  });

  it('should open and close the view product details modal', () => {
    render(
      <MemoryRouter>
        <Providers>
          <App />
        </Providers>
      </MemoryRouter>
    );

    const viewDetailsButtons = screen.getAllByRole('button');
    fireEvent.click(viewDetailsButtons[0]);

    const productModal = screen.getByTestId('product-modal');

    expect(productModal).toBeVisible();

    const closeModalButton = screen.getByTestId('close-modal-button');
    fireEvent.click(closeModalButton);

    expect(productModal).not.toBeVisible();
  });
});
