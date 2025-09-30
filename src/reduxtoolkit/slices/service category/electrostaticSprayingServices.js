import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfElectrostatic = createAsyncThunk(
  "ElectrostaticSprayingServiceMgmtSlice/getAllServicesOfElectrostatic",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfElectrostatic", { params: filters });

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

const ElectrostaticSprayingServiceMgmtSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfElectrostatic
      .addCase(getAllServicesOfElectrostatic.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfElectrostatic.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfElectrostatic.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default ElectrostaticSprayingServiceMgmtSlice.reducer;
