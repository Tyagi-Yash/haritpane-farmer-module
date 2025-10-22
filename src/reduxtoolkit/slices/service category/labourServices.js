import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfLabour = createAsyncThunk(
  "labourService/getAllServicesOfLabour",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfLabour", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const LabourServiceMgmtSlice = createSlice({
  name: "labourService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearLabourServices: (state) => {
      state.services = [];
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfLabour.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesOfLabour.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfLabour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLabourServices } = LabourServiceMgmtSlice.actions;
export default LabourServiceMgmtSlice.reducer;
