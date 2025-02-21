import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductImage } from '../product-image';

describe('Product image component', () => {
  it('should render product image', () => {
    const image = 'https://productimage.com.br';
    const altText = 'product image alt text';

    render(
      <MemoryRouter>
        <ProductImage image={image} alt={altText} />
      </MemoryRouter>
    );

    const productImage = screen.getByRole('img');

    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('alt', altText);
  });
});
