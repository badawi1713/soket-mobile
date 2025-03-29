import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleGetBadActorChartApi, Item } from './api';

interface Response {
  content: Item[];
}

export const handleGetBadActorChartData = createAsyncThunk<
  Response,
  {unitId: string},
  {rejectValue: string}
>(
  'reliability/bad-actor-chart-slice/handleGetBadActorChartData',
  async ({unitId = ''}, {rejectWithValue}) => {
    try {
      const response = await handleGetBadActorChartApi({unitId});
      return {
        content: response.content || [],
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
