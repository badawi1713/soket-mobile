import {
  DataItem,
  getPerformanceSummaryDataApi,
} from '@/utils/api/performance-efficiency-details/performance-summary';
import {useEffect, useState} from 'react';

const useGetBoilerData = (unitId: string) => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!unitId) {
      setData([]);
      setLoading(false);
      setError('No unit id was defined');
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const result = await getPerformanceSummaryDataApi(unitId, 2);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [unitId]);

  return {data, loading, error};
};

export default useGetBoilerData;
