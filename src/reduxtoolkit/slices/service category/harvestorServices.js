import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllCroptypes = createAsyncThunk(
  "HarvestorService/getAllCroptypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllCroptypes");
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);

export const getAllServicesOfHarvester = createAsyncThunk(
  "HarvestorService/getAllServicesOfHarvester",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfHarvester", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const HarvestorServiceMgmtSlice = createSlice({
  name: "HarvestorService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearHarvestorServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearHarvestorServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllServicesOfHarvester
      .addCase(getAllServicesOfHarvester.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfHarvester.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfHarvester.rejected, (state, action) => {
        state.loading = false;
      });
    
  },
});

export const { clearHarvestorServices, clearHarvestorServicesFilters } =
  HarvestorServiceMgmtSlice.actions;
export default HarvestorServiceMgmtSlice.reducer;
