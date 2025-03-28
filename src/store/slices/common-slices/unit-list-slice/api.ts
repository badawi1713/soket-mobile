import axios from 'axios';
import { toast } from 'sonner-native';

export interface UnitItem {
  unitName: string;
  color: string;
  unitId: number;
  objectId: string;
  status: number;
  id: string;
  title: string;
}

interface ApiResponse {
  object: Array<Omit<UnitItem, 'id' | 'title'>>;
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetUnitListApi = async ({
  module = '',
}): Promise<{
  content: UnitItem[];
}> => {
  const url =
    module === 'bat'
      ? '/service/mobile/bat/units'
      : '/service/mobile/unit/list';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        page: 0,
        limit: 100,
        filter: '',
        plantId: '',
        statusId: 1,
      },
    });

    const data = response?.data?.object || [];

    if (data?.length < 1) {
      toast.error('Unit list is not available');
    }

    const mapped = data.map(item => ({
      ...item,
      id: `${item.unitId}`,
      title: item.unitName,
    }));

    return {content: mapped};
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      error?.response?.error ||
      error?.message;
    toast.error(`Unit list: ${errMsg}`);
    throw new Error(errMsg);
  }
};
