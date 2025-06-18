import {RootState} from '@/store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {handleGetAssetHealthIndicatorApi, Item} from './api';

interface AssetHealthIndicatorResponse {
  content: {
    lastupdate: string;
    chart?: Item[];
    value: number;
  } | null;
}

export const handleGetAssetHealthIndicatorData = createAsyncThunk<
  AssetHealthIndicatorResponse,
  {unitId: string},
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'reliability/asset-health-indicator-slice/handleGetAssetHealthIndicatorData',
  async (
    {unitId},
    thunkAPI,
  ): Promise<
    AssetHealthIndicatorResponse | ReturnType<typeof thunkAPI.rejectWithValue>
  > => {
    const {getState, rejectWithValue} = thunkAPI;

    try {
      const state = getState();
      const {data: unitList} = state.unitListReducer;

      const selectedUnitData = unitList?.find(item => +item.id === +unitId);

      const response = await handleGetAssetHealthIndicatorApi();

      const filterData = response?.content?.chart?.find(
        item => item.id === selectedUnitData?.objectId?.substring(0, 2),
      );

      const result =
        filterData?.children?.find(
          item => item.id === selectedUnitData?.objectId,
        )?.value ?? 0;

      return {
        content: {
          lastupdate: response?.content?.lastupdate || '',
          chart: [],
          value: result ? +result : 0,
        },
      };
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Unknown error');
    }
  },
);
