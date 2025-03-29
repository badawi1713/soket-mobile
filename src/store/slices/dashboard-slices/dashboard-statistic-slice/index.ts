import {createSlice} from '@reduxjs/toolkit';
import {handleGetDashboardStatisticData} from './actions';
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

const dashboardStatisticSlice = createSlice({
  name: 'dashboard/dashboard-statistic-slice',
  initialState,
  reducers: {
    resetDashboardStatistic(state) {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetDashboardStatisticData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetDashboardStatisticData.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(handleGetDashboardStatisticData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sorry something went wrong';
      });
  },
});

export const {resetDashboardStatistic} = dashboardStatisticSlice.actions;
export const {reducer: dashboardStatisticReducer} = dashboardStatisticSlice;
