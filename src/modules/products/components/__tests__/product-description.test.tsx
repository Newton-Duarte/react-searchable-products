import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductDescription } from '../product-description';

describe('Product description component', () => {
  it('should render product description', () => {
    const description = 'Product Description';

    render(
      <MemoryRouter>
        <ProductDescription>{description}</ProductDescription>
      </MemoryRouter>
    );

    const productDescription = screen.getByText(description);

    expect(productDescription).toBeInTheDocument();
  });
});
