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
  object: {
    lastupdate: string;
    chart?: Item[];
    value: number
  };
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetAssetHealthIndicatorApi = async (): Promise<{
  content: {lastupdate: string; chart?: Item[], value: number};
}> => {
  const url = '/service/reliability/ahi-hierarchy/tree?filter=';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {},
    });

    const data = response?.data?.object || {lastupdate: '', chart: [], value: 0};

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
