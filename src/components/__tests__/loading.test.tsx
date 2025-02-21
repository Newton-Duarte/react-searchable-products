import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Loading } from '../loading';

describe('Loading component', () => {
  it('should render loading dots', () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );

    const srOnlyLoadingText = screen.getByText(/loading.../i);

    expect(srOnlyLoadingText).toBeInTheDocument();
  });
});
