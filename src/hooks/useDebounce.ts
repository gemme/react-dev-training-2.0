import { useEffect, useRef, useState } from "react";

const useDebounce = (_query: string, delay = TIME_OUT) => {
  const [query, setQuery] = useState(_query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(_query);
    }, delay);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [_query]);

  return { query };
};

export default useDebounce;

const TIME_OUT = 200; /* milliseconds */
