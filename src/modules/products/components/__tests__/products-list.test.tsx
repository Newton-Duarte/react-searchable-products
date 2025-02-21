import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductsList } from '../products-list';

const mockProducts = [...Array(5).keys()].map((n) => ({
  id: n,
  title: `Mock Product ${n}`,
  description: `Description ${n}`,
  category: `Category ${n}`,
  image: `https://mockproductimage${n}.com`,
  price: 60,
  rating: {
    count: 1,
    rate: n,
  },
}));

describe('Products list component', () => {
  it('should render products list', () => {
    render(
      <MemoryRouter>
        <ProductsList products={mockProducts} onViewDetails={vi.fn()} />
      </MemoryRouter>
    );

    const products = screen.getAllByText(/Mock Product/);

    expect(products.length).toBe(5);
  });

  it('should call on view details', () => {
    const onViewDetails = vi.fn();

    render(
      <MemoryRouter>
        <ProductsList products={mockProducts} onViewDetails={onViewDetails} />
      </MemoryRouter>
    );

    const onViewButton = screen.getAllByRole('button');
    expect(onViewButton.length).toBe(5);

    const targetMockProduct3 = onViewButton[2];
    const expectedMockProduct = mockProducts[2];

    fireEvent.click(targetMockProduct3);

    expect(onViewDetails).toHaveBeenCalledWith(expectedMockProduct);
  });
});
