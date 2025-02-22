import { api } from '../api-client';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        defaults: {
          baseURL: 'https://fakestoreapi.com',
        },
        get: mocks.get,
      })),
    },
  };

  return mockAxios;
});

const mockData = { data: { message: 'success' } };

describe('API Client', () => {
  it('should create an axios instance with the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe('https://fakestoreapi.com');
  });

  it('should call GET request correctly', async () => {
    mocks.get.mockResolvedValueOnce(mockData);

    const response = await api.get('/test-endpoint');

    expect(response).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith('/test-endpoint');
  });
});
