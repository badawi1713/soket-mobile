import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleGetAnomalyDetailApi, Item} from './api';

interface AnomalyDetailResponse {
  content: Item;
}

export const handleGetAnomalyDetailData = createAsyncThunk<
  AnomalyDetailResponse,
  {unitId: string; type: string},
  {rejectValue: string}
>(
  'reliability/anomaly-detail-slice/handleGetAnomalyDetailData',
  async ({unitId = '', type = ''}, {rejectWithValue}) => {
    try {
      const response = await handleGetAnomalyDetailApi({unitId, type});
      return {
        content: response.content || null,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
