import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleGetAssetHealthIndicatorApi, Item } from './api';

interface AssetHealthIndicatorResponse {
  content: {lastupdate: string; chart?: Item[]};
}

export const handleGetAssetHealthIndicatorData = createAsyncThunk<
  AssetHealthIndicatorResponse,
  void,
  {rejectValue: string}
>(
  'reliability/asset-health-indicator-slice/handleGetAssetHealthIndicatorData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await handleGetAssetHealthIndicatorApi();
      return {
        content: response.content || null,
      };
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  },
);
