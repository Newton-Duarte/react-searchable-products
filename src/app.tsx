import { useState } from 'react';
import { useGetProducts } from './modules/products/hooks/useGetProducts';
import { Search, ArrowUp } from 'lucide-react';
import { Loading } from './components/loading';
import { Error } from './components/error';
import { useDelayedSearch } from './modules/shared/hooks/useDelayedSearch';
import { useScrollTop } from './modules/shared/hooks/useScrollTop';
import { ProductModal } from './modules/products/components/product-modal';
import { ProductsList } from './modules/products/components/products-list';
import { ProductsEmpty } from './modules/products/components/products-empty';
import { ThemeSwitcher } from './components/theme-switcher';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { search, setSearch, delayedSearch } = useDelayedSearch();

  const { showBackToTop, scrollToTop } = useScrollTop();

  const { data, isLoading, isError } = useGetProducts({
    search: delayedSearch,
  });

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl flex flex-col py-4 sm:py-8 min-h-dvh">
        <header className="pb-4 mb-4 border-b mx-4 border-gray-700 dark:border-gray-600 flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-3xl text-gray-900 dark:text-gray-200 font-bold">
            Products {data?.length ? `(${data.length})` : ''}
          </h1>
          <div className="flex gap-4">
            <ThemeSwitcher />
            <div className="sm:min-w-sm relative">
              <Search className="size-4 absolute top-1/2 left-4 transform -translate-x-1/2 -translate-y-1/2 text-gray-800 dark:text-gray-200" />
              <input
                id="search-product"
                type="search"
                className="border bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded outline-0 pl-8 py-2 pr-2 w-full focus:ring focus:ring-gray-50/50 dark:focus:ring-gray-700/50 disabled:cursor-not-allowed disabled:bg-gray-400 dark:border-gray-700"
                placeholder="Search products..."
                value={search}
                disabled={isLoading}
                onChange={({ target }) => setSearch(target.value)}
                data-testid="search-product"
                aria-label="search-product"
              />
            </div>
          </div>
        </header>
        <main className="w-full pt-2 px-4">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error />
          ) : data?.length ? (
            <ProductsList products={data} onViewDetails={setSelectedProduct} />
          ) : (
            <ProductsEmpty />
          )}
        </main>
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct!}
        />

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="cursor-pointer fixed bottom-4 right-4 p-2 bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-500 transition"
            data-testid="back-to-top-button"
          >
            <ArrowUp className="size-6" />
          </button>
        )}
      </div>
    </div>
  );
}
