import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfHarvester = createAsyncThunk(
  "HarvestorService/getAllServicesOfHarvester",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfHarvester", { params: filters });

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

const HarvestorServiceMgmtSlice = createSlice({
  name: "HarvestorService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfHarvester
      .addCase(getAllServicesOfHarvester.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfHarvester.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfHarvester.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default HarvestorServiceMgmtSlice.reducer;
