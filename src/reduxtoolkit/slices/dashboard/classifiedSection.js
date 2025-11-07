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
  }
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
  }
);

const initialState = {
  loading: false,
  products: [],
  paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  filters: { createdBy: null, page: 1 },
  error: null,
};

const ClassifiedSectionMgmtSlice = createSlice({
  name: "ClassifiedSection",
  initialState,
  reducers: {
    clearClassifiedData: (state) => {
      state.products = [];
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
      state.filters = { createdBy: null, page: 1 };
    },
    LoadPaginationPage: (state, action) => {
      state.filters.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsForFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsForFarmer.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.products = data?.data?.[0]?.data || [];
          state.paginationData = metadata;
          state.filters = {
            ...filters,
            page: metadata.page || filters.page || 1,
          };
        }
        state.loading = false;
      })
      .addCase(getAllProductsForFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getProductById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { LoadPaginationPage, clearClassifiedData } = ClassifiedSectionMgmtSlice.actions;
export default ClassifiedSectionMgmtSlice.reducer;
