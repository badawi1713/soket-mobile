import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleGetAnomalyStatisticApi, Item} from './api';

interface AnomalyStatisticResponse {
  content: Item;
}

export const handleGetAnomalyStatisticData = createAsyncThunk<
  AnomalyStatisticResponse,
  {unitId: string},
  {rejectValue: string}
>(
  'reliability/anomaly-statistic-slice/handleGetAnomalyStatisticData',
  async ({unitId = ''}, {rejectWithValue}) => {
    try {
      const response = await handleGetAnomalyStatisticApi({unitId});
      return {
        content: response.content || null,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
