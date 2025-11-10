import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfBorewell = createAsyncThunk(
  "borewellService/getAllServicesOfBorewell",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfBorewell", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const BorewellServiceMgmtSlice = createSlice({
  name: "borewellService",
  initialState: {
    loading: false,
    services: [],
    filters: {},
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearBorewellServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearBorewellServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfBorewell.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfBorewell.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfBorewell.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearBorewellServices, clearBorewellServicesFilters } =
  BorewellServiceMgmtSlice.actions;
export default BorewellServiceMgmtSlice.reducer;
