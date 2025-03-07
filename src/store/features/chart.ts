import { fetchBarChartData } from "@/api/transaction";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery } from "@tanstack/react-query";

export const fetchChartData = createAsyncThunk(
  "data/fetchChartData",
  async () => {
    const CHART_QUERY = useQuery({
      queryKey: ["barChart"],
      queryFn: fetchBarChartData,
      staleTime: 60 * 1000, // 1 minute
      refetchInterval: 60 * 1000, // 1 minute
    });

    return CHART_QUERY;
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
        state.data = action.payload.data;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default chartSlice.reducer;
