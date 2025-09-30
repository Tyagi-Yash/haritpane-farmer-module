import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfCattle = createAsyncThunk(
  "CattleServiceMgmtSlice/getAllServicesOfCattle",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfCattle", { params: filters });

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

const CattleServiceMgmtSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllServicesOfCattle
      .addCase(getAllServicesOfCattle.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesOfCattle.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesOfCattle.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default CattleServiceMgmtSlice.reducer;
