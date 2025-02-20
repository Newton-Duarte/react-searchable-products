import { ProductDescription } from './product-description';
import { ProductImage } from './product-image';
import { ProductPrice } from './product-price';
import { ProductTitle } from './product-title';
import { formatCurrency } from '../../utils/format-currency';
import { ProductRating } from './product-rating';
import { Badge } from '../badge';

type ProductCardProps = {
  product: Product;
  onViewDetails: (product: Product) => void;
};

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="bg-white rounded flex flex-col justify-between shadow-2xs"
    >
      <div className="p-4 sm:p-6">
        <div className="rounded mb-4">
          <ProductImage image={product.image} alt={product.title} />
        </div>
        <div className="flex flex-col gap-2">
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
          <div className="flex justify-between">
            <Badge>{product.category}</Badge>
            <ProductRating
              rating={product.rating.rate}
              count={product.rating.count}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-300 p-4 sm:p-6 flex justify-between">
        <ProductPrice>{formatCurrency(product.price)}</ProductPrice>
        <button
          type="button"
          className="border px-4 py-2 font-medium cursor-pointer min-w-24 hover:bg-gray-800 hover:text-gray-50 transition-colors"
          onClick={() => onViewDetails(product)}
        >
          Details
        </button>
      </div>
    </div>
  );
}
