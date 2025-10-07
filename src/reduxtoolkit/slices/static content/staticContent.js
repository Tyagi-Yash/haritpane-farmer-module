import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getStaticFarmerContent = createAsyncThunk(
  "staticContent/getStaticFarmerContent",
  async (paramData, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getStaticFarmerContent", { params: paramData });

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

const StaticContentMgmtSlice = createSlice({
  name: "staticContent",
  initialState,
  extraReducers: (builder) => {
    builder

      // getStaticFarmerContent
      .addCase(getStaticFarmerContent.pending, (state) => {
        state.loader = true;
      })
      .addCase(getStaticFarmerContent.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getStaticFarmerContent.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default StaticContentMgmtSlice.reducer;
