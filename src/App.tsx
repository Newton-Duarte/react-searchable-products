import { useGetProducts } from './modules/products/hooks/useGetProducts';

export function App() {
  const { data, isLoading, isError } = useGetProducts();

  return (
    <div className="mx-auto max-w-7xl flex flex-col justify-center my-10">
      <header>
        <h1 className="text-3xl text-gray-200">Products</h1>
      </header>
      <main className="mt-5 flex justify-center flex-wrap gap-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error!</p>
        ) : data?.length ? (
          data.map((product) => (
            <div
              key={product.id}
              className="bg-white max-w-sm p-4 rounded flex flex-col justify-between min-h-40"
            >
              <div>
                <h2 className="text-lg font-medium">{product.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>
              </div>
              <div>Price: $ {product.price}</div>
            </div>
          ))
        ) : (
          <p className="font-medium">No products found</p>
        )}
      </main>
    </div>
  );
}
