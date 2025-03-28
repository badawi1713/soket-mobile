import axios from 'axios';
import { toast } from 'sonner-native';

export interface Item {
  copt: {
    operation: number;
    safeguard: number;
    unitId: number;
    unitName: string;
    updatedAt: string;
    watchdog: number;
  };
  efficiency: {
    baseLine: number;
    current: number;
    improvement: number;
    unitId: number;
    unitName: string;
    updatedAt: string;
  };
  sopt: {
    operation: number;
    safeguard: number;
    unitId: number;
    unitName: string;
    updatedAt: string;
    watchdog: number;
  };
}

interface ApiResponse {
  object: Item;
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetBoilerEfficiencyApi = async ({
  unitId = '',
}): Promise<{
  content: Item;
}> => {
  const url = '/service/mobile/bat/units/detail';

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
    toast.error(`Error: ${errMsg}`);
    throw new Error(errMsg);
  }
};
