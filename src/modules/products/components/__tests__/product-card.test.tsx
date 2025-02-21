import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductCard } from '../product-card';
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

describe('Product card component', () => {
  it('should render a product card', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onViewDetails={vi.fn()} />
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

  it('should call on view details passing the product', () => {
    const viewDetails = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onViewDetails={viewDetails} />
      </MemoryRouter>
    );

    const productViewDetailsButton = screen.getByRole('button');
    fireEvent.click(productViewDetailsButton);

    expect(viewDetails).toHaveBeenLastCalledWith(mockProduct);
  });
});
