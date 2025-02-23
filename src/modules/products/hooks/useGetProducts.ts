import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../http/get-products';

type UseGetProductsProps = {
  search: string | null;
};

export function useGetProducts({ search }: UseGetProductsProps) {
  return useQuery({
    queryKey: ['products', search],
    queryFn: () => getProducts({ search }),
    staleTime: 1000 * 60 * 1, // 1 minute,
    retry: 1,
  });
}
