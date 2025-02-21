import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductsEmpty } from '../products-empty';

describe('Products empty component', () => {
  it('should render products empty', () => {
    const emptyMessage = 'No products found';

    render(
      <MemoryRouter>
        <ProductsEmpty />
      </MemoryRouter>
    );

    const message = screen.getByText(emptyMessage);

    expect(message).toBeInTheDocument();
  });
});
