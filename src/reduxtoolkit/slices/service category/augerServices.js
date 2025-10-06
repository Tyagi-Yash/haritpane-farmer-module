import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfAuger = createAsyncThunk(
  "augerService/getAllServicesOfAuger",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfAuger", { params: filters });

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

const AugerServiceMgmtSlice = createSlice({
  name: "augerService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfAuger
      .addCase(getAllServicesOfAuger.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfAuger.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfAuger.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default AugerServiceMgmtSlice.reducer;
