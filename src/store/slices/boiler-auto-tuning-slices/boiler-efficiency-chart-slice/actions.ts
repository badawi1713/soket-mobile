import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleGetBoilerEfficiencyChartApi, Item} from './api';

interface Response {
  content: Item[];
}

export const handleGetBoilerEfficiencyChartData = createAsyncThunk<
  Response,
  {unitId: string},
  {rejectValue: string}
>(
  'boiler-auto-tuning/boiler-efficiency-slice/handleGetBoilerEfficiencyChartData',
  async ({unitId = ''}, {rejectWithValue}) => {
    try {
      const response = await handleGetBoilerEfficiencyChartApi({unitId});
      return {
        content: response.content || [],
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
