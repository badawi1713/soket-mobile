import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleGetUnitListApi, UnitItem} from './api';

interface UnitListResponse {
  content: UnitItem[];
}

export const handleGetUnitListData = createAsyncThunk<
  UnitListResponse,
  {module?: string},
  {rejectValue: string}
>(
  'common/unit-list/handleGetUnitListData',
  async ({module = ''}, {rejectWithValue}) => {
    try {
      const response = await handleGetUnitListApi({module});
      return {
        content: response.content || [],
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
