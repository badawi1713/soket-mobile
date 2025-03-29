import { isAxiosError } from '@/utils/helpers';
import axios from 'axios';
import { toast } from 'sonner-native';

export interface Item {
  caseEquipment: string;
  caseId: number;
  caseName: string;
  casePlant: number;
  caseStatus: string;
  caseType: string;
  caseUnit: string;
  descr: Array<string>;
}

export interface ApiResponse {
  object: Item[];
  message: string;
  total: number;
  limit: number;
  page: number;
}

export const handleGetCaseDetailsDataApi = async ({
  unitId = '',
  status = '',
  page = 0,
}): Promise<{
  content: Item[];
  total: number;
}> => {
  const url = '/service/mobile/cm/detail';

  try {
    const response = await axios.get<ApiResponse>(url, {
      params: {
        unitId: unitId,
        page: page,
        limit: 10,
        status: status,
      },
    });

    const data = response?.data?.object || [];

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
