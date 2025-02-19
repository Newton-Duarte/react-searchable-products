import { api } from './api-client';

interface GetProductsResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getProducts = async () => {
  const response = await api.get<GetProductsResponse[]>('products');

  return response.data;
};
