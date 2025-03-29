import { createSlice } from '@reduxjs/toolkit';
import { handleGetEfficiencyKpiData } from './actions';
import { Item } from './api';

interface State {
  data: Item[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: true,
  error: null,
};

const efficiencyKpiSlice = createSlice({
  name: 'efficiency/efficiency-kpi-slice',
  initialState,
  reducers: {
    resetEfficiencyKpi(state) {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetEfficiencyKpiData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetEfficiencyKpiData.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(handleGetEfficiencyKpiData.rejected, (state, action) => {
        state.loading = false;
        state.error = `${action.payload || 'Sorry something went wrong'}`;
      });
  },
});

export const {resetEfficiencyKpi} = efficiencyKpiSlice.actions;
export const {reducer: efficiencyKpiReducer} = efficiencyKpiSlice;
