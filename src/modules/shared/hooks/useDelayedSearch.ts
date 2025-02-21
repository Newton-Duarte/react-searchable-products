import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';

export function useDelayedSearch() {
  const [search, setSearch] = useState('');

  const timeoutRef = useRef<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const delayedSearch = searchParams.get('q') ?? '';

  useEffect(() => {
    if (delayedSearch) {
      setSearch(delayedSearch);
    }
  }, []);

  useEffect(() => {
    if (!search) {
      setSearchParams({});
      return;
    }

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setSearchParams({ q: search });
    }, 400);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, setSearchParams]);

  return {
    search,
    setSearch,
    searchParams,
    setSearchParams,
    delayedSearch,
  };
}
