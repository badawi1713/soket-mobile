import { createSlice } from '@reduxjs/toolkit'
import { handleGetUnitListData } from './actions'
import { UnitItem } from './api'

interface UnitListState {
  isEmpty: boolean
  data: UnitItem[]
  loading: boolean
  error: string | null
}

const initialState: UnitListState = {
  isEmpty: true,
  data: [],
  loading: true,
  error: null
}

const unitListSlice = createSlice({
  name: 'common/unit-list',
  initialState,
  reducers: {
    resetUnitList(state) {
      state.data = []
      state.isEmpty = true
    }
  },
  extraReducers: builder => {
    builder
      .addCase(handleGetUnitListData.pending, state => {
        state.loading = true
        state.isEmpty = true
        state.error = null
      })
      .addCase(handleGetUnitListData.fulfilled, (state, action) => {
        state.data = action.payload.content
        state.isEmpty = action.payload.content.length === 0
        state.loading = false
      })
      .addCase(handleGetUnitListData.rejected, (state, action) => {
        state.loading = false
        state.isEmpty = true
        state.error = action.payload || 'Sorry something went wrong'
      })
  }
})

export const { resetUnitList } = unitListSlice.actions
export const { reducer: unitListReducer } = unitListSlice
