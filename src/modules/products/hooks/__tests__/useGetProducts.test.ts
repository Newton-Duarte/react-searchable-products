import { renderHook, waitFor } from '@testing-library/react';
import { mockProducts } from '../../../../__mocks__';
import { api } from '../../../../http/api-client';
import { Providers } from '../../../../providers';
import { useGetProducts } from '../useGetProducts';

vi.mock('../../http/api-client', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('useGetProducts Hook', () => {
  it('should fetch products successfully', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockProducts });

    const { result } = renderHook(() => useGetProducts({ search: '' }), {
      wrapper: Providers,
    });

    await waitFor(() => expect(result.current.data).toEqual(mockProducts));
  });

  it('should handle errors', async () => {
    vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useGetProducts({ search: '' }), {
      wrapper: Providers,
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    expect(api.get).toHaveBeenCalled();
  });
});
