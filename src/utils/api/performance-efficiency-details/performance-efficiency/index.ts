import { isAxiosError } from '@/utils/helpers';
import axios from 'axios';
import { toast } from 'sonner-native';

export interface DataItem {
  analysisDb: string;
  analysisReffValue: number;
  analysisStatus: string;
  datetime: string;
  equipmentId: string;
  equipmentName: string;
  gap: string;
  heatBalance: string;
  losses: string;
  paramId: string;
  paramName: string;
  ref: number;
  rowNum: number;
  sequenceId: number;
  unitId: number;
  unitKks: string;
}

export interface Response {
  object: DataItem[];
  message: string;
  total: number;
}

export const getPerformanceEfficiencyDataApi = async (
  unitId: string,
  equimentId: number,
): Promise<DataItem[]> => {
  try {
    const response = await axios.get<Response>(
      '/service/efficiency/performance-summary/view-perf-impact-equipment',
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
