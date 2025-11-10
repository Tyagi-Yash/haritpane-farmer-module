import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfExcavation = createAsyncThunk(
  "excavationService/getAllServicesOfExcavation",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfExcavation", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const ExcavationServiceMgmtSlice = createSlice({
  name: "excavationService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearExcavationServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearExcavationServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfExcavation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfExcavation.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfExcavation.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearExcavationServices, clearExcavationServicesFilters } =
  ExcavationServiceMgmtSlice.actions;
export default ExcavationServiceMgmtSlice.reducer;
