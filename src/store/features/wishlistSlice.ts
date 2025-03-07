import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import {
  addToWishlist,
  fetchUserData,
  removeFromWishlist,
} from "@/app/api/session";
import { ErrorState } from "@/types/ui-lib";
import { getCookie } from "cookies-next";
import { setSession } from "@/utils/sessionmanagers";
interface WishlistState {
  sessionId: string | null;
  items: WishlistItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WishlistState = {
  sessionId: (getCookie("userToken") as string) ?? "",

  items: [],
  status: "idle",
  error: null,
};

export const fetchWishlistData = createAsyncThunk(
  "wishlist/fetchWishlistData",
  async () => fetchUserData()
);

export const addItemToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (newData: WishlistItem, { getState, dispatch, rejectWithValue }) => {
    const previousState = getState() as RootState;
    try {
      dispatch(wishlistSlice.actions.addItemState(newData));
      const response = await addToWishlist({ productId: newData?.productId });
      return response;
    } catch (error: ErrorState) {
      dispatch(
        wishlistSlice.actions.setItemState(previousState?.wishlist.items)
      );
      return rejectWithValue(error.message);
    }
  }
);

export const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItemFromWishlist",
  async (itemId: string, { getState, dispatch, rejectWithValue }) => {
    const previousState = getState() as RootState;
    try {
      dispatch(wishlistSlice.actions.removeItemFromState(itemId));
      const response = await removeFromWishlist(itemId);
      return response;
    } catch (error) {
      const typedError: ErrorState = error
      dispatch(
        wishlistSlice.actions.setItemState(previousState?.wishlist.items)
      );
      return rejectWithValue(typedError.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemState: (state, action: PayloadAction<WishlistItem>) => {
      state.items.push(action.payload);
    },
    setItemState: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
    removeItemFromState: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.wishlist;
      })
      .addCase(fetchWishlistData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch wishlist data";
      })
      .addCase(addItemToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.wishlist;
        if (!state.sessionId && action.payload.sessionId) {
          setSession("userToken", action.payload.sessionId); // Set session in cookies
          state.sessionId = action.payload.sessionId; // Update Redux state
        }
      })
      .addCase(addItemToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(removeItemFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.wishlist;
      })
      .addCase(removeItemFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export default wishlistSlice.reducer;
