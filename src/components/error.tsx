import { CircleAlert } from 'lucide-react';
import { useCallback } from 'react';

export function Error() {
  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh_-_107px)] gap-4">
      <div className="rounded-full bg-red-100 p-16">
        <CircleAlert className="size-32 text-red-700" />
      </div>
      <p className="font-medium text-gray-50 text-lg">
        Oops, Something went wrong...
      </p>
      <p className="text-gray-50 text-sm">Try to refresh the page.</p>
      <button
        type="button"
        className="border px-4 py-2 font-medium cursor-pointer min-w-24 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800 transition-colors"
        onClick={refreshPage}
      >
        Try again?
      </button>
    </div>
  );
}
