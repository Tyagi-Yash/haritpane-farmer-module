import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfBorewell = createAsyncThunk(
  "borewellService/getAllServicesOfBorewell",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfBorewell", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const BorewellServiceMgmtSlice = createSlice({
  name: "borewellService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearBorewellServices: (state) => {
      state.services = [];
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfBorewell.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesOfBorewell.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfBorewell.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBorewellServices } = BorewellServiceMgmtSlice.actions;
export default BorewellServiceMgmtSlice.reducer;
