import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllLandManagementServices = createAsyncThunk(
  "LandService/getAllLandManagementServices",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfLandManagement", { params: filters });

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

const LandServiceMgmtSlice = createSlice({
  name: "LandService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllLandManagementServices
      .addCase(getAllLandManagementServices.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllLandManagementServices.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllLandManagementServices.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default LandServiceMgmtSlice.reducer;
