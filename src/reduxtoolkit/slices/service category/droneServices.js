import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfDrone = createAsyncThunk(
  "droneService/getAllServicesOfDrone",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfDrone", { params: filters });

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

const DroneServiceMgmtSlice = createSlice({
  name: "droneService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfDrone
      .addCase(getAllServicesOfDrone.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfDrone.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfDrone.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default DroneServiceMgmtSlice.reducer;
