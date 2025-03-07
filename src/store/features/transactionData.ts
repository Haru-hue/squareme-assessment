import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransactions } from "@/api/transaction";
interface TransactionState {
  data: TransactionApiResponse[]
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TransactionState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchTransactionsData = createAsyncThunk(
  "data/fetchTransactionsData",
  async () => {
    const response = await fetchTransactions();
    return response;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setItemState: (state, action: PayloadAction<TransactionApiResponse[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsData.pending, (state) => {
        state.status = "loading";
        fetchTransactionsData();
      })
      .addCase(fetchTransactionsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTransactionsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch cart data";
      })
  },
});

export default transactionSlice.reducer;
