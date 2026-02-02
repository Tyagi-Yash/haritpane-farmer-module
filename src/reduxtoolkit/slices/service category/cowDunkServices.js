import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const createCowDungJobOrder = createAsyncThunk(
  "cowDunkService/createCowDungJobOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/createCowDunkJobOrder", payload);

      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  },
);

export const getCowDungDirectListings = createAsyncThunk(
  "cowDungService/getCowDungDirectListings",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getCowDungDirectListings", { params: filters });
      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  },
);

const CowDungServiceMgmtSlice = createSlice({
  name: "cowDungService",
  initialState: {
    loading: false,
    services: [],
    filters: {},
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearCowDungServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearCowDungServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCowDungDirectListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCowDungDirectListings.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getCowDungDirectListings.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearCowDungServices, clearCowDungServicesFilters } =
  CowDungServiceMgmtSlice.actions;
export default CowDungServiceMgmtSlice.reducer;
