import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllAdsForFarmer = createAsyncThunk(
  "CarouselAds/getAllAdsForFarmer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllAdsForFarmer");

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

const CarouselAdsMgmtSlice = createSlice({
  name: "CarouselAds",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllAdsForFarmer
      .addCase(getAllAdsForFarmer.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllAdsForFarmer.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllAdsForFarmer.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default CarouselAdsMgmtSlice.reducer;
