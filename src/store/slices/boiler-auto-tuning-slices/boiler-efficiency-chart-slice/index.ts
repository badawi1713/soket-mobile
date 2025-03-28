import {createSlice} from '@reduxjs/toolkit';
import {handleGetBoilerEfficiencyChartData} from './actions';
import {Item} from './api';

interface State {
  data: Item[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

const boilerEfficiencyChartSlice = createSlice({
  name: 'boiler-auto-tuning/boiler-efficiency-slice',
  initialState,
  reducers: {
    resetBoilerEfficiencyChart(state) {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetBoilerEfficiencyChartData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        handleGetBoilerEfficiencyChartData.fulfilled,
        (state, action) => {
          state.data = action.payload.content;
          state.loading = false;
        },
      )
      .addCase(handleGetBoilerEfficiencyChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sorry something went wrong';
      });
  },
});

export const {resetBoilerEfficiencyChart} = boilerEfficiencyChartSlice.actions;
export const {reducer: boilerEfficiencyChartReducer} =
  boilerEfficiencyChartSlice;
