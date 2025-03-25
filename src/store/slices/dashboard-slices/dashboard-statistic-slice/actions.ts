import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleGetDashboardStatisticApi, Item } from './api'

interface DashboardStatisticResponse {
  content: Item
}

export const handleGetDashboardStatisticData = createAsyncThunk<
  DashboardStatisticResponse,
  void,
  { rejectValue: string }
>(
  'dashboard/dashboard-statistic-slice/handleGetDashboardStatisticData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleGetDashboardStatisticApi()
      return {
        content: response.content || null
      }
    } catch (error: any) {
      return rejectWithValue(error?.message)
    }
  }
)
