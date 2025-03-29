import { isAxiosError } from '@/utils/helpers';
import axios from 'axios';
import { toast } from 'sonner-native';

export interface Item {
  anomalyCount: number;
  anomalyEvent: string;
  caseId: number;
  description: string;
  equipment: string;
  internalNotes: string;
  issuer: string;
  lastTime: string;
  level: string;
  status: string;
  time: string;
  type: string;
  unitName: string;
}

export interface ApiResponse {
  object: Item[];
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetAnomalyDetailsDataApi = async ({
  unitId = '',
  status = '',
  page = 0,
}): Promise<{
  content: Item[];
  total: number;
}> => {
  const url = `/service/reliability/anomaly/list/open/${unitId}`;

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        eq: '',
        filter: '',
        type: 'A,B',
        ftype: 'A,B',
        sortby: 'lastTime',
        sort: 'desc',
        page: page,
        limit: 10,
        fstatus: status.toUpperCase(),
      },
    });

    const rawObject = response.data.object;
    const data = Array.isArray(rawObject?.[0]) ? rawObject[0] : [];

    return {content: data, total: response?.data?.total || 0};
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
