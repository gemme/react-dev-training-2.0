import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const callAPi = () => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error in the response");
      })
      .then(async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    callAPi();
  }, [url]);

  const refetch = async () => {
    callAPi();
  };

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

//const {data, error}
//const [mydata, myerrore]
