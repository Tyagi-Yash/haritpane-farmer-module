import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfLandManagement = createAsyncThunk(
  "LandService/getAllServicesOfLandManagement",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfLandManagement", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const LandServiceMgmtSlice = createSlice({
  name: "LandService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearLandServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearLandServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfLandManagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfLandManagement.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfLandManagement.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearLandServices, clearLandServicesFilters } = LandServiceMgmtSlice.actions;
export default LandServiceMgmtSlice.reducer;
