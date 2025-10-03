import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfBorewell = createAsyncThunk(
  "borewellService/getAllServicesOfBorewell",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfBorewell", { params: filters });

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

const BorewellServiceMgmtSlice = createSlice({
  name: "borewellService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfBorewell
      .addCase(getAllServicesOfBorewell.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfBorewell.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfBorewell.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default BorewellServiceMgmtSlice.reducer;
