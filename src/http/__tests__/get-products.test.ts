import { api } from '../api-client';
import { getProducts } from '../get-products';

const mockProducts = [
  { id: 1, title: 'Shirt', description: 'Cool', category: 'Clothing' },
  { id: 2, title: 'Laptop', description: 'Fast', category: 'Electronics' },
];

vi.mock('../api-client', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('getProducts', () => {
  it('fetches products correctly', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockProducts });

    const result = await getProducts({ search: '' });

    expect(result).toEqual(mockProducts);

    expect(api.get).toHaveBeenCalledWith('products');
  });

  it('fetches and filters products correctly', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockProducts });

    const result = await getProducts({ search: 'shirt' });

    expect(result).toEqual([mockProducts[0]]);

    expect(api.get).toHaveBeenCalledWith('products');
  });

  it('returns empty products array when there are not products found', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockProducts });

    const result = await getProducts({ search: 'not-found-products-search' });

    expect(result).toEqual([]);

    expect(api.get).toHaveBeenCalledWith('products');
  });

  it('returns empty array when the response data is undefined', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: undefined });

    const result = await getProducts({ search: '' });

    expect(result).toEqual([]);

    expect(api.get).toHaveBeenCalledWith('products');
  });
});
