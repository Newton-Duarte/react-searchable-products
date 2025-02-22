import { api } from '../api-client';

vi.mock('../api-client', () => ({
  api: {
    defaults: {
      baseURL: 'https://fakestoreapi.com',
    },
    get: vi.fn(),
  },
}));

describe('API Client', () => {
  it('should create an axios instance with the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe('https://fakestoreapi.com');
  });

  it('should call GET request correctly', async () => {
    const mockData = { data: { message: 'success' } };

    vi.spyOn(api, 'get').mockResolvedValueOnce(mockData);

    const response = await api.get('/test-endpoint');

    expect(response).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith('/test-endpoint');
  });
});
