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

const initialState = {
  loader: false,
};

const TransportationServiceMgmtSlice = createSlice({
  name: "transportationService",
  initialState,
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
        state.loader = true;
      })
      .addCase(getAllServicesTransportation.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesTransportation.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default TransportationServiceMgmtSlice.reducer;
