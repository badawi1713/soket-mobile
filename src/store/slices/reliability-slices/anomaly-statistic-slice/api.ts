import axios from 'axios';
import {toast} from 'sonner-native';

export interface Item {
  new: number | string;
  awaiting: number | string;
  inprogress: number | string;
  closed: number | string;
  completed: number | string;
  open: number | string;
}

interface ApiResponse {
  object: Item;
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetAnomalyStatisticApi = async ({
  unitId = '',
}): Promise<{
  content: Item;
}> => {
  const url = '/service/mobile/rb/anomaly/status';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        unitId: unitId,
      },
    });

    const data = response?.data?.object || null;

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
