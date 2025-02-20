import { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { useGetProducts } from './modules/products/hooks/useGetProducts';
import { Modal } from './components/modal';
import { ProductTitle } from './components/product/product-title';
import { ProductDescription } from './components/product/product-description';
import { ProductCard } from './components/product/product-card';
import { ProductImage } from './components/product/product-image';
import { Badge } from './components/badge';
import { ProductPrice } from './components/product/product-price';
import { formatCurrency } from './utils/format-currency';
import { ProductRating } from './components/product/product-rating';
import { FolderSearch, Search, ArrowUp } from 'lucide-react';
import { Loading } from './components/loading';
import { Error } from './components/error';
import { useSearchParams } from 'react-router';

export function App() {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get('q');

  const timeoutRef = useRef<number | null>(null);

  const { data, isLoading, isError } = useGetProducts({
    search: currentSearch,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleViewProductDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (currentSearch) {
      setSearch(currentSearch);
    }
  }, []);

  useEffect(() => {
    if (!search) {
      setSearchParams({});
      return;
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setSearchParams({ q: search });
    }, 400);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, setSearchParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container mx-auto max-w-7xl flex flex-col py-4 sm:py-8 min-h-dvh">
      <header className="pb-4 mb-4 border-b mx-4 border-gray-50 flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-3xl text-gray-200 font-bold">
          Products {data?.length ? `(${data.length})` : ''}
        </h1>
        <div className="sm:min-w-sm relative">
          <Search className="size-4 absolute top-1/2 left-4 transform -translate-x-1/2 -translate-y-1/2 text-gray-800" />
          <input
            id="search-product"
            type="search"
            className="border bg-gray-50 rounded outline-0 pl-8 py-2 pr-2 w-full text-gray-800"
            placeholder="Search products..."
            value={search}
            onChange={({ target }) => handleSearch(target.value)}
          />
        </div>
      </header>
      <main className="w-full pt-2 px-4">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : data?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewProductDetails}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100dvh_-_107px)] gap-4">
            <div className="rounded-full bg-gray-300 p-16">
              <FolderSearch className="size-32 text-gray-500" />
            </div>
            <p className="font-medium text-gray-50 text-lg">
              No products found
            </p>
            <p className="text-gray-50 text-sm">Try adjusting your search</p>
          </div>
        )}
      </main>
      <Modal isOpen={!!selectedProduct} onClose={handleCloseModal}>
        {selectedProduct && (
          <div className="flex flex-col">
            <div className="flex flex-col items-start p-6 gap-2">
              <ProductImage
                image={selectedProduct.image}
                alt={selectedProduct.title}
                className="h-96"
              />
              <div className="flex flex-col gap-2">
                <ProductTitle>{selectedProduct.title}</ProductTitle>
                <ProductDescription>
                  {selectedProduct.description}
                </ProductDescription>
              </div>
              <div className="flex flex-col sm:flex-row w-full items-start justify-between gap-2 sm:gap-0">
                <Badge>{selectedProduct.category}</Badge>
                <ProductRating
                  rating={selectedProduct.rating.rate}
                  count={selectedProduct.rating.count}
                />
              </div>
            </div>
            <div className="bg-gray-300 p-4 sm:p-6 flex justify-between">
              <ProductPrice>
                {formatCurrency(selectedProduct.price)}
              </ProductPrice>
            </div>
          </div>
        )}
      </Modal>

      <footer className="text-gray-50 text-center mt-4 sm:mt-8">
        Developed by{' '}
        <a
          href="https://github.com/newton-duarte"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Newton Duarte
        </a>
      </footer>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-4 right-4 p-2 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-500 transition"
        >
          <ArrowUp className="size-6" />
        </button>
      )}
    </div>
  );
}
