import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleGetUnitListApi, UnitItem } from './api'

interface UnitListResponse {
  content: UnitItem[]
}

export const handleGetUnitListData = createAsyncThunk<
  UnitListResponse,
  void,
  { rejectValue: string }
>(
  'common/unit-list/handleGetUnitListData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleGetUnitListApi()
      return {
        content: response.content || []
      }
    } catch (error: any) {
      return rejectWithValue(error?.message)
    }
  }
)
