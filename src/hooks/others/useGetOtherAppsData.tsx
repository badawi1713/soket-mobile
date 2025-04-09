import { DataItem, getAppListDataApi } from '@/utils/api/others/app-list';
import { useCallback, useEffect, useState } from 'react';

const useGetOtherAppsData = () => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAppListDataApi();
      setData(result);
      setError(null); // reset error
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {data, loading, error, refetch: fetch};
};

export default useGetOtherAppsData;
