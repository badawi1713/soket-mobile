import { isAxiosError } from '@/utils/helpers';
import axios from 'axios';
import { toast } from 'sonner-native';

export interface DataItem {
  dateRec: string;
  electricCurrent: number;
  equipment: string;
  gap: number;
  measure: number;
  reff: number;
}

export interface Response {
  object: DataItem[];
  message: string;
  total: number;
}

export const getAuxPowerDataApi = async (
  unitId: string,
): Promise<DataItem[]> => {
  try {
    const response = await axios.get<Response>(
      '/service/efficiency/performance-summary/aux-power/list',
      {
        params: {
          unitId,
        },
      },
    );

    return response?.data?.object || [];
  } catch (error: unknown) {
    let errMsg = 'Unknown error';

    if (isAxiosError(error)) {
      const responseData = error.response?.data;

      if (
        typeof responseData === 'object' &&
        responseData !== null &&
        'message' in responseData &&
        typeof responseData.message === 'string'
      ) {
        errMsg = responseData.message;
      } else if (
        typeof responseData === 'object' &&
        responseData !== null &&
        'error' in responseData &&
        typeof responseData.error === 'string'
      ) {
        errMsg = responseData.error;
      } else {
        errMsg = error.message;
      }
    }

    toast.error(`Error: ${errMsg}`);
    throw new Error(errMsg);
  }
};
