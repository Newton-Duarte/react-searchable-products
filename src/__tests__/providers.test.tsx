import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Providers } from '../providers';

describe('Providers', () => {
  it('should render children inside QueryClientProvider', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Providers>
          <div data-testid="test-child">Child Component</div>
        </Providers>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
