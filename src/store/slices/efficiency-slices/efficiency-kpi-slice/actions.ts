import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleGetEfficiencyKpiApi, Item} from './api';

interface Response {
  content: Item[];
}

export const handleGetEfficiencyKpiData = createAsyncThunk<
  Response,
  {unitId: string},
  {rejectValue: string}
>(
  'efficiency/efficiency-kpi-slice/handleGetEfficiencyKpiData',
  async ({unitId = ''}, {rejectWithValue}) => {
    try {
      const response = await handleGetEfficiencyKpiApi({unitId});
      return {
        content: response.content || [],
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
