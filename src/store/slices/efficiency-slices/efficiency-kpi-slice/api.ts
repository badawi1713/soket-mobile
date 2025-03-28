import axios from 'axios';
import { toast } from 'sonner-native';

export interface Item {
  assetName: string;
  corrected: number;
  degradation: number;
  heatBalance: number;
  id: string;
  kpi: string;
  measured: number;
  no: number;
  rated: number;
  unit: string;
}

interface ApiResponse {
  object: Item[];
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetEfficiencyKpiApi = async ({
  unitId = '',
}): Promise<{
  content: Item[];
}> => {
  const url = '/service/efficiency/dashboard/list-mobile';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        plantId: '',
        sortBy: 'measured',
        sort: 'asc',
        unitId: unitId,
      },
    });

    const data = response?.data?.object || [];

    return {content: data};
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.error ||
      error?.message;
    toast.error(`Unit list: ${errMsg}`);
    throw new Error(errMsg);
  }
};
