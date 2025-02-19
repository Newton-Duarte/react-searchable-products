import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
