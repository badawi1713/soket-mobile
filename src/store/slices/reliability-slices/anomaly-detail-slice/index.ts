import {createSlice} from '@reduxjs/toolkit';
import {handleGetAnomalyDetailData} from './actions';
import {Item} from './api';

interface State {
  data: Item | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: null,
  loading: true,
  error: null,
};

const anomalyDetailSlice = createSlice({
  name: 'reliability/anomaly-detail-slice',
  initialState,
  reducers: {
    resetAnomalyDetail(state) {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetAnomalyDetailData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetAnomalyDetailData.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(handleGetAnomalyDetailData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sorry something went wrong';
      });
  },
});

export const {resetAnomalyDetail} = anomalyDetailSlice.actions;
export const {reducer: anomalyDetailReducer} = anomalyDetailSlice;
