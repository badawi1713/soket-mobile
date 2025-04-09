import {
  DataItem,
  getEnergyLossAnalysisDataApi,
} from '@/utils/api/performance-efficiency-details/energy-loss-analysis';
import { useEffect, useState } from 'react';

const useGetEnergyLossAnalysisData = (unitId: string) => {
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
        const result = await getEnergyLossAnalysisDataApi(unitId);
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

export default useGetEnergyLossAnalysisData;
