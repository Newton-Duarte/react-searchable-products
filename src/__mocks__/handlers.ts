import { http, HttpResponse } from 'msw';
import { mockProducts } from './products';

export const handlers = [
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json(mockProducts);
  }),
];
