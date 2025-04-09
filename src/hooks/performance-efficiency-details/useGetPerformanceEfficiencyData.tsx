import {
  DataItem,
  getPerformanceEfficiencyDataApi,
} from '@/utils/api/performance-efficiency-details/performance-efficiency';
import { useEffect, useState } from 'react';

const useGetPerformanceEfficiencyData = (
  unitId: string,
  equipmentId: number,
) => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!unitId) {
      setData([]);
      setError('Unit ID is undefined');
      setLoading(false);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const result = await getPerformanceEfficiencyDataApi(
          unitId,
          equipmentId,
        );
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

export default useGetPerformanceEfficiencyData;
