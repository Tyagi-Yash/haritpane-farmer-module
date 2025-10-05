import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllProductsForFarmer = createAsyncThunk(
  "ClassifiedSection/getAllProductsForFarmer",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllProductsForFarmer", { params: filters });

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
      console.log(err);
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);
export const getProductById = createAsyncThunk(
  "ClassifiedSection/getProductById",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getProductById", { params: filters });

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
      console.log(err);
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

const ClassifiedSectionMgmtSlice = createSlice({
  name: "ClassifiedSection",
  initialState,
  extraReducers: (builder) => {
    builder

      // getAllProductsForFarmer
      .addCase(getAllProductsForFarmer.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllProductsForFarmer.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllProductsForFarmer.rejected, (state) => {
        state.loader = false;
      })

      // getProductById
      .addCase(getProductById.pending, (state) => {
        state.loader = true;
      })
      .addCase(getProductById.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getProductById.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default ClassifiedSectionMgmtSlice.reducer;
