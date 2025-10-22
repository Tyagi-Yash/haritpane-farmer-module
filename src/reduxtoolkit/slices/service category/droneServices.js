import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfDrone = createAsyncThunk(
  "droneService/getAllServicesOfDrone",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfDrone", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const DroneServiceMgmtSlice = createSlice({
  name: "droneService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearDroneServices: (state) => {
      state.services = [];
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfDrone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesOfDrone.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfDrone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDroneServices } = DroneServiceMgmtSlice.actions;
export default DroneServiceMgmtSlice.reducer;
