import { useCallback, useEffect, useState } from 'react';

const SCROLL_Y_THRESHOLD = 300;

export function useScrollTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > SCROLL_Y_THRESHOLD) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    showBackToTop,
    setShowBackToTop,
    scrollToTop,
  };
}
