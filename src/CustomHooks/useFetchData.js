import { useEffect, useState } from 'react';

export const useFetchData = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      const fetchData = async url => {
        const resp = await fetch(url);
        const data = await resp.json();
        setData(data);
        if (data) {
          setLoading(false);
        }
      };
      fetchData(url);
    }
  }, [url]);

  return { data, loading };
};
