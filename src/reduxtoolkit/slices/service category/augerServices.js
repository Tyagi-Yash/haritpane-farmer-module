import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfAuger = createAsyncThunk(
  "augerServices/getAllServicesOfAuger",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfAuger", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const AugerServiceMgmtSlice = createSlice({
  name: "augerServices",
  initialState: {
    loading: false,
    services: [],
    filters: {},
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearAugerServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearAugerServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfAuger.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfAuger.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfAuger.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearAugerServices, clearAugerServicesFilters } = AugerServiceMgmtSlice.actions;
export default AugerServiceMgmtSlice.reducer;
