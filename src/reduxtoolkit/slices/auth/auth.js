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

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post("/login", payload);

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

export const logout = createAsyncThunk("auth/logout", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.put("/logout", payload);

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
  otploader: false,
  loader: false,
};

const authMgmtSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder

      // sendOtp
      .addCase(sendOtp.pending, (state) => {
        state.otploader = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.otploader = false;
      })
      .addCase(sendOtp.rejected, (state) => {
        state.otploader = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loader = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(login.rejected, (state) => {
        state.loader = false;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.loader = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default authMgmtSlice.reducer;
