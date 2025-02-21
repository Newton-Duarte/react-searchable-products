import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductRating } from '../product-rating';

describe('Product rating component', () => {
  it('should render product rating', () => {
    const ratingCount = 10;
    const rating = 4;

    render(
      <MemoryRouter>
        <ProductRating count={ratingCount} rating={rating} />
      </MemoryRouter>
    );

    const productRatingStars = screen.getAllByTestId('product-rating-svg');
    const productRatingCount = screen.getByText(`(${ratingCount})`);

    expect(productRatingCount).toBeInTheDocument();
    expect(productRatingStars.length).toBe(5);
  });
});
