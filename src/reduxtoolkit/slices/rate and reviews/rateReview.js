import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const fetchServiceReviews = createAsyncThunk(
  "rateReview/fetchServiceReviews",
  async (serviceId, { rejectWithValue }) => {
    try {
      const res = await axios.get("/getAllReviewsOfFarmer", {
        params: { serviceId },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewList: [],
    loading: false,
  },
  reducers: {
    resetReviewList: (state) => {
      state.reviewList = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceReviews.fulfilled, (state, action) => {
        state.reviewList = action.payload;
        state.loading = false;
      })
      .addCase(fetchServiceReviews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetReviewList } = reviewSlice.actions;
export default reviewSlice.reducer;
