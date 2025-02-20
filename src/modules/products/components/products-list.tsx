import { ProductCard } from './product-card';

type ProductsListProps = {
  products: Product[];
  onViewDetails: (product: Product) => void;
};

export function ProductsList({ products, onViewDetails }: ProductsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
