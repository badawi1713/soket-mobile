import { isAxiosError } from '@/utils/helpers';
import axios from 'axios';
import { toast } from 'sonner-native';

export interface DataItem {
  correct: number;
  deg: number;
  no: number;
  paramId: string;
  paramName: string;
  unit: string;
  ref: number;
  vHeatBalance: number;
  vMeasure: number;
  sequenceId: number;
}

export interface Response {
  object: {
    datas: DataItem[];
  };
  message: string;
  total: number;
}

export const getPerformanceSummaryDataApi = async (
  unitId: string,
  equimentId: number,
): Promise<DataItem[]> => {
  try {
    const response = await axios.get<Response>(
      '/service/efficiency/performance-summary/view-param-equipment-mobile',
      {
        params: {
          unitId,
          equipmentId: equimentId || '',
          sortBy: '',
          sort: 'asc',
          page: 0,
          limit: 999,
        },
      },
    );

    return response?.data?.object?.datas || [];
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
