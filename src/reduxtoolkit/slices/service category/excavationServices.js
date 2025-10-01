import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfExcavation = createAsyncThunk(
  "excavationService/getAllServicesOfExcavation",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfExcavation", { params: filters });

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

const ExcavationServiceMgmtSlice = createSlice({
  name: "excavationService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfExcavation
      .addCase(getAllServicesOfExcavation.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfExcavation.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfExcavation.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default ExcavationServiceMgmtSlice.reducer;
