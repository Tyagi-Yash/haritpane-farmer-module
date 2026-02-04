import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllProductsForFarmer = createAsyncThunk(
  "ClassifiedSection/getAllProductsForFarmer",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllProductsForFarmer", { params: filters });
      return { status: response.status, data: response.data, filters };
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  },
);

export const getProductById = createAsyncThunk(
  "ClassifiedSection/getProductById",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getProductById", { params: filters });
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  },
);

export const getAllProductReviews = createAsyncThunk(
  "ClassifiedSection/getAllProductReviews",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllProductReviews", { params: filters });
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  },
);

export const addReview = createAsyncThunk(
  "rateReview/addReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/addReviewByFarmerForProduct", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

const initialState = {
  loading: false,
  products: [],
  reviews: [],
  reviewStats: null,
  reviewsLoading: false,
  listingPagePaginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  error: null,
  addLoading: false,
};

const ClassifiedSectionMgmtSlice = createSlice({
  name: "ClassifiedSection",
  initialState,
  reducers: {
    clearClassifiedData: (state) => {
      state.products = [];
      state.reviewStats = null;
      state.reviews = [];
      state.listingPagePaginationData = { total: 0, page: 1, isNext: false, isPrev: false };
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },

  extraReducers: (builder) => {
    builder
      // PRODUCTS
      .addCase(getAllProductsForFarmer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsForFarmer.fulfilled, (state, action) => {
        const { status, data } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.products = data?.data?.[0]?.data || [];
          state.listingPagePaginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllProductsForFarmer.rejected, (state) => {
        state.loading = false;
      })

      // REVIEWS
      .addCase(getAllProductReviews.pending, (state) => {
        state.reviewsLoading = true;
      })
      .addCase(getAllProductReviews.fulfilled, (state, action) => {
        const { status, data } = action.payload;

        if (status === 200) {
          const newReviews = data?.data?.data || [];
          const metadata = data?.data?.metadata?.[0] || {};
          const stats = data?.data?.statistics || null;

          if (metadata.page > 1) {
            state.reviews = [...state.reviews, ...newReviews];
          } else {
            state.reviews = newReviews;
          }

          state.reviewStats = stats;
          state.paginationData = metadata;
        }

        state.reviewsLoading = false;
      })

      .addCase(getAllProductReviews.rejected, (state) => {
        state.reviewsLoading = false;
      })

      // ADD REVIEW
      .addCase(addReview.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addReview.rejected, (state) => {
        state.addLoading = false;
      });
  },
});

export const { LoadPaginationPage, clearClassifiedData } = ClassifiedSectionMgmtSlice.actions;
export default ClassifiedSectionMgmtSlice.reducer;
