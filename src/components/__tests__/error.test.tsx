import { render, screen, fireEvent } from '@testing-library/react';
import { Error } from '../error';
import { MemoryRouter } from 'react-router';

vi.stubGlobal('location', { ...window.location, reload: vi.fn() });

describe('Error component', () => {
  it('renders the error and triggers click event', () => {
    const reloadMock = vi
      .spyOn(window.location, 'reload')
      .mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    const title = screen.getByText('Oops, Something went wrong...');
    const tryAgainButton = screen.getByRole('button', { name: /try again\?/i });

    expect(title).toBeInTheDocument();

    fireEvent.click(tryAgainButton);

    expect(reloadMock).toHaveBeenCalledTimes(1);

    reloadMock.mockRestore();
  });
});
