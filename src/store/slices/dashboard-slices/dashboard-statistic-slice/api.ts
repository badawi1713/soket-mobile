import axios from 'axios';
import {toast} from 'sonner-native';

export interface Item {
  gross: string;
  capacity: string;
  lastUpdate: number;
}

interface ApiResponse {
  object: Item;
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetDashboardStatisticApi = async (): Promise<{
  content: Item;
}> => {
  const url = '/service/identity/mobile/dashboard/home';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {},
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
