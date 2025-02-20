import { useCallback, useState } from 'react';
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

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, isError } = useGetProducts();

  const handleViewProductDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  return (
    <div className="container mx-auto max-w-7xl flex flex-col justify-center py-4">
      <header className="pb-4 mb-4 border-b mx-4 border-gray-50">
        <h1 className="text-3xl text-gray-200 font-bold">
          Products {data?.length ? `(${data.length})` : ''}
        </h1>
      </header>
      <main className="w-full pt-2 px-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error!</p>
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
          <p className="font-medium">No products found</p>
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
              <div className="flex w-full justify-between">
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
    </div>
  );
}
