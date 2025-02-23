import { act, renderHook } from '@testing-library/react';
import { useScrollTop } from '../useScrollTop';

describe('useScrollTop Hook', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('should show back to top button after scrolling', () => {
    const { result } = renderHook(() => useScrollTop());

    expect(result.current.showBackToTop).toBe(false);

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 320,
        writable: true,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.showBackToTop).toBe(true);
  });

  it('should hide back to top button when scrolled to top', () => {
    const { result } = renderHook(() => useScrollTop());

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 320,
        writable: true,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.showBackToTop).toBe(true);

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 0,
        writable: true,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.showBackToTop).toBe(false);
  });

  it('should call scroll to top', () => {
    const spyScrollTo = vi.fn();

    Object.defineProperty(globalThis.window, 'scrollTo', {
      value: spyScrollTo,
    });

    const { result } = renderHook(() => useScrollTop());

    act(() => {
      result.current.scrollToTop();
    });

    expect(spyScrollTo).toHaveBeenCalled();
  });
});
