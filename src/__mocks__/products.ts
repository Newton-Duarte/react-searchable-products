export const mockProduct: Product = {
  id: 1,
  title: 'Mock Product',
  description: 'Mock Product Description',
  category: 'Mock Product Category',
  image: 'https://mockproductimage.com',
  price: 60,
  rating: {
    count: 1,
    rate: 5,
  },
};

export const mockProducts: Product[] = [
  mockProduct,
  { ...mockProduct, id: 2, title: 'Mock Product 2' },
];
