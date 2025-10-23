import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfExcavation = createAsyncThunk(
  "excavationService/getAllServicesOfExcavation",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfExcavation", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const ExcavationServiceMgmtSlice = createSlice({
  name: "excavationService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearExcavationServices: (state) => {
      state.services = [];
      state.filters = {};
    },
    clearExcavationServicesFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfExcavation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServicesOfExcavation.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfExcavation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExcavationServices, clearExcavationServicesFilters } =
  ExcavationServiceMgmtSlice.actions;
export default ExcavationServiceMgmtSlice.reducer;
