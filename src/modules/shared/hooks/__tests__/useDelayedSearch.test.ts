import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router';
import { useDelayedSearch } from '../useDelayedSearch';

vi.mock('react-router', async (importActual) => {
  const actual = await importActual<typeof import('react-router')>();
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

describe('useDelayedSearch Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  it('should initialize with empty search', () => {
    const { result } = renderHook(() => useDelayedSearch(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.search).toBe('');
    expect(result.current.delayedSearch).toBe('');
  });

  it('should update search state immediately', () => {
    const { result } = renderHook(() => useDelayedSearch(), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.setSearch('laptop');
    });

    expect(result.current.search).toBe('laptop');
  });

  it('should update searchParams after a delay', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useDelayedSearch(), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.setSearch('phone');
    });

    // The hook clears the searchParams if search is falsy
    // so it's get called with an empty object
    expect(mockSetSearchParams).toHaveBeenCalledWith({});

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(mockSetSearchParams).toHaveBeenCalledTimes(2);
    expect(mockSetSearchParams).toHaveBeenCalledWith({ q: 'phone' });

    vi.useRealTimers();
  });

  it('should clear searchParams when search is empty', async () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useDelayedSearch(), {
      wrapper: MemoryRouter,
    });

    act(() => {
      result.current.setSearch('');
    });

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({});

    vi.useRealTimers();
  });

  it('should initialize search from query params', () => {
    const searchParams = new URLSearchParams({ q: 'tablet' });

    vi.mocked(useSearchParams).mockReturnValue([
      searchParams,
      mockSetSearchParams,
    ]);

    const { result } = renderHook(() => useDelayedSearch(), {
      wrapper: MemoryRouter,
    });

    expect(result.current.search).toBe('tablet');
  });
});
