import { Badge } from '../../../components/badge';
import { Modal } from '../../../components/modal';
import { formatCurrency } from '../../../utils/format-currency';
import { ProductDescription } from './product-description';
import { ProductImage } from './product-image';
import { ProductPrice } from './product-price';
import { ProductRating } from './product-rating';
import { ProductTitle } from './product-title';

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
};

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {product && (
        <div className="flex flex-col">
          <div className="flex flex-col items-start p-6 gap-2">
            <ProductImage
              image={product.image}
              alt={product.title}
              className="h-96"
            />
            <div className="flex flex-col gap-2">
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
            </div>
            <div className="flex flex-col sm:flex-row w-full items-start justify-between gap-2 sm:gap-0">
              <Badge>{product.category}</Badge>
              <ProductRating
                rating={product.rating.rate}
                count={product.rating.count}
              />
            </div>
          </div>
          <div className="bg-gray-300 p-4 sm:p-6 flex justify-between">
            <ProductPrice>{formatCurrency(product.price)}</ProductPrice>
          </div>
        </div>
      )}
    </Modal>
  );
}
