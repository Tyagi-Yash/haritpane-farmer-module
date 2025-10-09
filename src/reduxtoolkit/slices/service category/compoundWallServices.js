import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getCompoundWallServiceTypes = createAsyncThunk(
  "compoundWallService/getCompoundWallServiceTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getCompoundWallServiceTypes");

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

export const getAllServicesCompoundWall = createAsyncThunk(
  "compoundWallService/getAllServicesCompoundWall",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesCompoundWall", { params: filters });

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

const CompoundWallServiceMgmtSlice = createSlice({
  name: "compoundWallService",
  initialState,
  extraReducers: (builder) => {
    builder

      // getCompoundWallServiceTypes
      .addCase(getCompoundWallServiceTypes.pending, (state) => {
        state.loader = true;
      })
      .addCase(getCompoundWallServiceTypes.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getCompoundWallServiceTypes.rejected, (state) => {
        state.loader = false;
      })

      // getAllServicesCompoundWall
      .addCase(getAllServicesCompoundWall.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllServicesCompoundWall.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(getAllServicesCompoundWall.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default CompoundWallServiceMgmtSlice.reducer;
