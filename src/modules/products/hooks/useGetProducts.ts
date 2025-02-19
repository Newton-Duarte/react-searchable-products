import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../http/get-products';

export function useGetProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}
