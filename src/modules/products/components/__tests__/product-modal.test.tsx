import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductModal } from '../product-modal';
import { formatCurrency } from '../../../../utils/format-currency';

const mockProduct: Product = {
  id: 1,
  title: 'Mock Product',
  description: 'Mock Product Description',
  category: 'Mock Product Category',
  image: 'https://mockproductimage.com',
  price: 60,
  rating: {
    count: 1,
    rate: 5,
  },
};

describe('Product modal component', () => {
  it('should render a product modal', () => {
    render(
      <MemoryRouter>
        <ProductModal isOpen onClose={vi.fn()} product={mockProduct} />
      </MemoryRouter>
    );

    const productTitle = screen.getByText(mockProduct.title);
    const productDescription = screen.getByText(mockProduct.description);
    const productCategory = screen.getByText(mockProduct.category);
    const productImage = screen.getByRole('img');
    const productPrice = screen.getByText(formatCurrency(mockProduct.price));
    const productRatingCount = screen.getByText(
      `(${mockProduct.rating.count})`
    );
    const productRatingRate = screen.getAllByTestId('product-rating-svg');
    const productViewDetailsButton = screen.getByRole('button');

    expect(productTitle).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(productCategory).toBeInTheDocument();
    expect(productImage).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productRatingCount).toBeInTheDocument();
    expect(productRatingRate.length).toBe(5);
    expect(productViewDetailsButton).toBeInTheDocument();
  });

  it('should close the product modal', () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <ProductModal isOpen product={mockProduct} onClose={onClose} />
      </MemoryRouter>
    );

    const onCloseModalButton = screen.getByRole('button');
    fireEvent.click(onCloseModalButton);

    expect(onClose).toHaveBeenCalled();
  });
});
