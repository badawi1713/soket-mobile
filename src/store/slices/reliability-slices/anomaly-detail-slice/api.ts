import axios from 'axios';
import { toast } from 'sonner-native';

export interface Item {
  assetHealthIndicator: [];
  caseStatus: {
    awaiting: number;
    closed: number;
    completed: number;
    inProgress: number;
    open: number;
  };
  grafik: [
    {
      categories: [];
      dataset: [];
      name: string;
    },
    {
      categories: [];
      dataset: [];
      name: string;
    },
    {
      categories: [];
      dataset: [];
      name: string;
    },
    {
      categories: [];
      dataset: [];
      name: string;
    },
  ];
  status: {
    bat: string;
    eaf: number;
    effor: number;
    fuel: string;
    load: string;
    ncf: number;
    nphr: string;
    sdof: number;
    stock: string;
  };
  unitName: string;
}

interface ApiResponse {
  object: Item;
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetAnomalyDetailApi = async ({
  unitId = '',
  type = '',
}): Promise<{
  content: Item;
}> => {
  const url = '/service/mobile/dashboard/detail';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        unitId: unitId,
        type: type,
      },
    });

    const data = response?.data?.object || null;

    return {content: data};
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.error ||
      error?.message;
    toast.error(`Error: ${errMsg}`);
    throw new Error(errMsg);
  }
};
