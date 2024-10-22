import { useEffect, useState } from "react";

export const useMutation = <T>(
  url: string,
  options: { method: string; body?: any; headers: any }
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const asyncMutate = async (data: Record<string, string>) => {
    setIsLoading(true);
    let _options = options;
    if (data) {
      _options.body = JSON.stringify(data);
    }
    return fetch(url, _options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error in the response");
      })
      .then(async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    data,
    error,
    isLoading,
    asyncMutate,
  };
};
