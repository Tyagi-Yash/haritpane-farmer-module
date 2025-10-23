import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfElectrostatic = createAsyncThunk(
  "electrostaticSprayingService/getAllServicesOfElectrostatic",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfElectrostatic", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const ElectrostaticSprayingServiceMgmtSlice = createSlice({
  name: "electrostaticSprayingService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearElectroStaticSprayingServices: (state) => {
      state.services = [];
      state.filters = {};
    },
    clearElectroStaticSprayingServicesFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfElectrostatic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesOfElectrostatic.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfElectrostatic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearElectroStaticSprayingServices, clearElectroStaticSprayingServicesFilters } =
  ElectrostaticSprayingServiceMgmtSlice.actions;
export default ElectrostaticSprayingServiceMgmtSlice.reducer;
