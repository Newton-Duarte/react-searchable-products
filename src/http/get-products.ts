import { normalizeStringForComparison } from '../utils/compare-string';
import { api } from './api-client';

type GetProductsRequest = {
  search: string | null;
};
type GetProductsResponse = Product[];

export const getProducts = async ({ search }: GetProductsRequest) => {
  const response = await api.get<GetProductsResponse>('products');

  const normalizedSearchTerm = normalizeStringForComparison(search || '');
  const products = response.data;

  await new Promise((resolve) => setTimeout(resolve, 200));

  return (
    products?.filter((product) => {
      const normalizedTitle = normalizeStringForComparison(product.title);
      const normalizedDescription = normalizeStringForComparison(
        product.description
      );
      const normalizedCategory = normalizeStringForComparison(product.category);

      return [normalizedTitle, normalizedDescription, normalizedCategory].some(
        (field) => field.includes(normalizedSearchTerm)
      );
    }) || []
  );
};
