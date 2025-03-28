import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleGetBoilerEfficiencyApi, Item} from './api';

interface Response {
  content: Item;
}

export const handleGetBoilerEfficiencyStatisticData = createAsyncThunk<
  Response,
  {unitId: string},
  {rejectValue: string}
>(
  'boiler-auto-tuning/boiler-efficiency-slice/handleGetBoilerEfficiencyStatisticData',
  async ({unitId = ''}, {rejectWithValue}) => {
    try {
      const response = await handleGetBoilerEfficiencyApi({unitId});
      return {
        content: response.content || null,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
