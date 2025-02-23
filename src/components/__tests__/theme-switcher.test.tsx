import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from '../theme-switcher';
import { MemoryRouter } from 'react-router';

describe('ThemeSwitcher component', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders with initial light theme', () => {
    render(
      <MemoryRouter>
        <ThemeSwitcher />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Switch to Dark Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles theme when clicked', () => {
    render(
      <MemoryRouter>
        <ThemeSwitcher />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Switch to Light Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(button);
    expect(button).toHaveTextContent('Switch to Dark Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('updates document class list when theme changes', () => {
    const classListToggleSpy = vi.spyOn(
      document.documentElement.classList,
      'toggle'
    );

    render(
      <MemoryRouter>
        <ThemeSwitcher />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(classListToggleSpy).toHaveBeenCalledWith('dark', true);

    fireEvent.click(button);
    expect(classListToggleSpy).toHaveBeenCalledWith('dark', false);
  });
});
