import {createSlice} from '@reduxjs/toolkit';
import {handleGetAnomalyStatisticData} from './actions';
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

const anomalyStatisticSlice = createSlice({
  name: 'reliability/anomaly-statistic-slice',
  initialState,
  reducers: {
    resetAnomalyStatistic(state) {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetAnomalyStatisticData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetAnomalyStatisticData.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(handleGetAnomalyStatisticData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sorry something went wrong';
      });
  },
});

export const {resetAnomalyStatistic} = anomalyStatisticSlice.actions;
export const {reducer: anomalyStatisticReducer} = anomalyStatisticSlice;
