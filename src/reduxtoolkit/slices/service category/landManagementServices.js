import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllLandManagementServices = createAsyncThunk(
  "LandService/getAllLandManagementServices",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllLandManagementServices", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const LandServiceMgmtSlice = createSlice({
  name: "LandService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearLandServiceServices: (state) => {
      state.services = [];
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLandManagementServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLandManagementServices.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllLandManagementServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLandServiceServices } = LandServiceMgmtSlice.actions;
export default LandServiceMgmtSlice.reducer;
