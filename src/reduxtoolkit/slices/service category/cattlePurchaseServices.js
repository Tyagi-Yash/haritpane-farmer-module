import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfCattle = createAsyncThunk(
  "cattleService/getAllServicesOfCattle",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfCattle", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const CattleServiceMgmtSlice = createSlice({
  name: "cattleService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearCattleServices: (state) => {
      state.services = [];
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfCattle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesOfCattle.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfCattle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCattleServices } = CattleServiceMgmtSlice.actions;
export default CattleServiceMgmtSlice.reducer;
