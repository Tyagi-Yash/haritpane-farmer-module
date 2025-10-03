import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfLabour = createAsyncThunk(
  "labourService/getAllServicesOfLabour",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfLabour", { params: filters });

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

const LabourServiceMgmtSlice = createSlice({
  name: "labourService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfLabour
      .addCase(getAllServicesOfLabour.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfLabour.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfLabour.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default LabourServiceMgmtSlice.reducer;
