import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getVehicleTypesForTransportation = createAsyncThunk(
  "transportationService/getVehicleTypesForTransportation",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getVehicleTypesForTransportation", { params: filters });

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
  }
);

export const getAllServicesTransportation = createAsyncThunk(
  "transportationService/getAllServicesTransportation",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesTransportation", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const TransportationServiceMgmtSlice = createSlice({
  name: "transportationService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearTransportServices: (state) => {
      state.services = [];
      state.filters = {};
    },
    clearTransportServicesFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder

      // getVehicleTypesForTransportation
      .addCase(getVehicleTypesForTransportation.pending, (state) => {
        state.loader = true;
      })
      .addCase(getVehicleTypesForTransportation.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getVehicleTypesForTransportation.rejected, (state) => {
        state.loader = false;
      })

      // getAllServicesTransportation
      .addCase(getAllServicesTransportation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesTransportation.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesTransportation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTransportServices, clearTransportServicesFilters } =
  TransportationServiceMgmtSlice.actions;
export default TransportationServiceMgmtSlice.reducer;
