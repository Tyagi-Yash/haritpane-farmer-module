import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getCompoundWallServiceTypes = createAsyncThunk(
  "compoundWallService/getCompoundWallServiceTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getCompoundWallServiceTypes");
      return { status: response.status, data: response.data };
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);

export const getAllServicesCompoundWall = createAsyncThunk(
  "compoundWallService/getAllServicesCompoundWall",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesCompoundWall", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const CompoundWallServiceMgmtSlice = createSlice({
  name: "compoundWallService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    paginationData: { total: 0, page: 1, isNext: false, isPrev: false },
  },
  reducers: {
    clearCompoundWallServices: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
    clearCompoundWallServicesFilters: (state) => {
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder

      // getCompoundWallServiceTypes
      .addCase(getCompoundWallServiceTypes.pending, (state) => {
        state.loader = true;
      })
      .addCase(getCompoundWallServiceTypes.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getCompoundWallServiceTypes.rejected, (state) => {
        state.loader = false;
      })

      // getAllServicesCompoundWall
      .addCase(getAllServicesCompoundWall.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesCompoundWall.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
          state.paginationData = metadata;
        }
        state.loading = false;
      })
      .addCase(getAllServicesCompoundWall.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearCompoundWallServices, clearCompoundWallServicesFilters } =
  CompoundWallServiceMgmtSlice.actions;
export default CompoundWallServiceMgmtSlice.reducer;
