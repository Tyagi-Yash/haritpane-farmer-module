import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const sendOtp = createAsyncThunk("auth/sendOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post("/sendOtpFarmer", payload);

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
});

const initialState = {
  loader: false,
};

const authMgmtSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loader = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(sendOtp.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default authMgmtSlice.reducer;
