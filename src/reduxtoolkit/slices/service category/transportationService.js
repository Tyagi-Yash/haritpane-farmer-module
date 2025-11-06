import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const createTransportationJobOrder = createAsyncThunk(
  "transportationService/createCowDungJobOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/createJobOrder", payload);

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
    builder;
  },
});

export const { clearTransportServices, clearTransportServicesFilters } =
  TransportationServiceMgmtSlice.actions;
export default TransportationServiceMgmtSlice.reducer;
