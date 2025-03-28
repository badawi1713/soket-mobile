import { createSlice } from '@reduxjs/toolkit';
import { handleGetAssetHealthIndicatorData } from './actions';
import { Item } from './api';

interface State {
  data: {lastupdate: string; chart?: Item[]};
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: {lastupdate: '', chart: []},
  loading: false,
  error: null,
};

const assetHealthIndicatorSlice = createSlice({
  name: 'reliability/asset-health-indicator-slice',
  initialState,
  reducers: {
    resetAssetHealthIndicator(state) {
      state.data = {lastupdate: '', chart: []};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetAssetHealthIndicatorData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetAssetHealthIndicatorData.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(handleGetAssetHealthIndicatorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sorry something went wrong';
      });
  },
});

export const {resetAssetHealthIndicator} = assetHealthIndicatorSlice.actions;
export const {reducer: assetHealthIndicatorReducer} = assetHealthIndicatorSlice;
