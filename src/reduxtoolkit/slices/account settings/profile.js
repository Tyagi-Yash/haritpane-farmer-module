import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const editFarmerProfile = createAsyncThunk(
  "profile/editFarmerProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put("/editFarmerProfile", payload);

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

export const getFarmerProfile = createAsyncThunk(
  "profile/getFarmerProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getFarmerProfile", payload);

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

const profileMgmtSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder

      // editFarmerProfile
      .addCase(editFarmerProfile.pending, (state) => {
        state.loader = true;
      })
      .addCase(editFarmerProfile.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(editFarmerProfile.rejected, (state) => {
        state.loader = false;
      })

      // getFarmerProfile
      .addCase(getFarmerProfile.pending, (state) => {
        state.loader = true;
      })
      .addCase(getFarmerProfile.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getFarmerProfile.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default profileMgmtSlice.reducer;
