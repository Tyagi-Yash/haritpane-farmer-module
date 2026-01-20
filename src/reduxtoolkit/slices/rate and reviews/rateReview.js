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

export const fetchMyReviews = createAsyncThunk(
  "rateReview/fetchMyReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/getAllMyReviews");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const fetchProviders = createAsyncThunk(
  "rateReview/fetchProviders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/getAllBookedProviders");
      return res.data.data[0].data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const addProviderReview = createAsyncThunk(
  "rateReview/addProviderReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/addReviewForProvider", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewList: [],
    myReviewList: [],
    providers: [],
    loading: false,
    addLoading: false,
  },
  reducers: {
    resetReviewList: (state) => {
      state.reviewList = [];
      state.myReviewList = [];
      state.providers = [];
      state.loading = false;
      state.addLoading = false;
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
      })

      .addCase(fetchMyReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyReviews.fulfilled, (state, action) => {
        state.myReviewList = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyReviews.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.providers = action.payload;
        state.loading = false;
      })
      .addCase(fetchProviders.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addProviderReview.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addProviderReview.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addProviderReview.rejected, (state) => {
        state.addLoading = false;
      });
  },
});

export const { resetReviewList } = reviewSlice.actions;
export default reviewSlice.reducer;
