import { fetchBarChartData } from "@/api/transaction";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChartData = createAsyncThunk(
  "data/fetchChartData",
  async () => {
    const response = await fetchBarChartData();
    return response;
  }
);

const chartSlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default chartSlice.reducer;
