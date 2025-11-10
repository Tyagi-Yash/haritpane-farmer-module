import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfCattle = createAsyncThunk(
  "cattleService/getAllServicesOfCattle",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfCattle", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const CattleServiceMgmtSlice = createSlice({
  name: "cattleService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearCattleServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearCattleServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfCattle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfCattle.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfCattle.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearCattleServices, clearCattleServicesFilters } = CattleServiceMgmtSlice.actions;
export default CattleServiceMgmtSlice.reducer;
