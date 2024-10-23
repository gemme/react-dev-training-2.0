import { useEffect, useState, useCallback } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const callApi = useCallback(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error in the response");
      })
      .then(async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  useEffect(() => {
    callApi();
  }, [url]);

  //   const refetch = async () => {
  //     callApi();
  //   };

  return {
    data,
    error,
    isLoading,
    refetch: callApi,
  };
};

//const {data, error}
//const [mydata, myerrore]
