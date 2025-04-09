import { isAxiosError } from '@/utils/helpers';
import axios from 'axios';
import { toast } from 'sonner-native';

export interface DataItem {
  avg3hoursLosses: number | null;
  enabledClaim: boolean;
  eventId: string;
  eventStatus: string;
  heatBalance: number;
  indicatorId: number;
  indicatorName: string;
  issuedTime: string;
  loadCurrent: number;
  losses: number;
  lossesClaim: string;
  paramId: number;
  paramIdRef: number;
  potentialBenefit: string;
  ref: number;
  rupiahPerDay: string;
  rupiahPerHour: string;
  status: string;
  timestamp: string;
  unit: string;
  weeklyLosses: number;
}

export interface Response {
  object: DataItem[];
  message: string;
  total: number;
}

export const getEnergyLossAnalysisDataApi = async (
  unitId: string,
): Promise<DataItem[]> => {
  try {
    const response = await axios.get<Response>(
      '/service/efficiency/performance-summary/opi-heatloss-table',
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
