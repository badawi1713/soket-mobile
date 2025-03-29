import {createSlice} from '@reduxjs/toolkit';
import {handleGetBadActorChartData} from './actions';
import {Item} from './api';

interface State {
  data: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: true,
  error: null,
};

const badActorChartSlice = createSlice({
  name: 'reliability/bad-actor-chart-slice',
  initialState,
  reducers: {
    resetBadActorChart(state) {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetBadActorChartData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetBadActorChartData.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading = false;
      })
      .addCase(handleGetBadActorChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sorry something went wrong';
      });
  },
});

export const {resetBadActorChart} = badActorChartSlice.actions;
export const {reducer: badActorChartReducer} = badActorChartSlice;
