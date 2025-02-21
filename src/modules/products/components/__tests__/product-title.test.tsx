import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductTitle } from '../product-title';

describe('Product title component', () => {
  it('should render product title', () => {
    const title = 'Product Title';

    render(
      <MemoryRouter>
        <ProductTitle>{title}</ProductTitle>
      </MemoryRouter>
    );

    const productTitle = screen.getByText(title);

    expect(productTitle).toBeInTheDocument();
  });
});
