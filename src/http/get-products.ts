import { api } from './api-client';

type GetProductsResponse = Product[];

export const getProducts = async () => {
  const response = await api.get<GetProductsResponse>('products');

  return response.data;
};
