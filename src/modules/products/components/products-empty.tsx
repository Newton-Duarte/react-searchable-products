import { FolderSearch } from 'lucide-react';

export function ProductsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh_-_107px)] gap-4">
      <div className="rounded-full bg-gray-300 p-16">
        <FolderSearch className="size-32 text-gray-500" />
      </div>
      <p className="font-medium text-gray-50 text-lg">No products found</p>
      <p className="text-gray-50 text-sm">Try adjusting your search</p>
    </div>
  );
}
