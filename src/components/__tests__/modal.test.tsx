import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Modal } from '../modal';

describe('Modal component', () => {
  it('should render a modal with a title', () => {
    render(
      <MemoryRouter>
        <Modal isOpen onClose={vi.fn()}>
          <h1>My modal</h1>
        </Modal>
      </MemoryRouter>
    );

    const title = screen.getByText(/my modal/i);

    expect(title).toBeInTheDocument();
  });

  it('should call on close on the modal', () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <Modal isOpen onClose={onClose}>
          <h1>My modal</h1>
        </Modal>
      </MemoryRouter>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
