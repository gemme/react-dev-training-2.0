import { useEffect, useRef, useState } from 'react';

const useDebounce = (_query: string, delay = TIME_OUT) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [query, setQuery] = useState(_query);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setQuery(_query);

      timeout.current = null;
    }, delay);
  }, [_query]);

  return { query };
};

export default useDebounce;

const TIME_OUT = 500; /* milliseconds */
