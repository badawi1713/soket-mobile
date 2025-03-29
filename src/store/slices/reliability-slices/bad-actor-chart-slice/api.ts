import axios from 'axios';
import { toast } from 'sonner-native';

export interface Item {
  parent: string | null;
  id: string;
  label: string;
  value: string;
  equipmentId: number;
  chart: string;
  isActive: number;
  level: number;
  notAvailable: number;
  children: Item[];
  detail?: boolean;
}

export interface ApiResponse {
  object: Item[];
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetBadActorChartApi = async ({
  unitId = '',
}): Promise<{
  content: Item[];
}> => {
  const url = '/service/reliability/bad-actor/list';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        units: unitId,
      },
    });

    const data = response?.data?.object || [];

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
