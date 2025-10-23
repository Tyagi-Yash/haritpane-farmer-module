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
    error: null,
  },
  reducers: {
    clearLandServices: (state) => {
      state.services = [];
      state.filters = {};
    },
    clearLandServicesFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfLandManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesOfLandManagement.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfLandManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLandServices, clearLandServicesFilters } = LandServiceMgmtSlice.actions;
export default LandServiceMgmtSlice.reducer;
