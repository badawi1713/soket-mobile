import {createSlice} from '@reduxjs/toolkit';
import {handleGetBoilerEfficiencyStatisticData} from './actions';
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

const boilerEfficiencySlice = createSlice({
  name: 'boiler-auto-tuning/boiler-efficiency-slice',
  initialState,
  reducers: {
    resetBoilerEfficiencyStatistic(state) {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetBoilerEfficiencyStatisticData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetBoilerEfficiencyStatisticData.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(handleGetBoilerEfficiencyStatisticData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sorry something went wrong';
      });
  },
});

export const {resetBoilerEfficiencyStatistic} = boilerEfficiencySlice.actions;
export const {reducer: boilerEfficiencyReducer} = boilerEfficiencySlice;
