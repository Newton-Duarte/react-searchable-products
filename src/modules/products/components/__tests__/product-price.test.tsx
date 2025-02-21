import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductPrice } from '../product-price';

describe('Product price component', () => {
  it('should render product price', () => {
    const price = 60;

    render(
      <MemoryRouter>
        <ProductPrice>{price}</ProductPrice>
      </MemoryRouter>
    );

    const productPrice = screen.getByText(price);

    expect(productPrice).toBeInTheDocument();
  });
});
