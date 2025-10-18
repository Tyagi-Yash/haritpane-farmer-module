import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllServicesOfAuger = createAsyncThunk(
  "augerServices/getAllServicesOfAuger",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllServicesOfAuger", { params: filters });

      return { status: response.status, data: response.data, filters };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Network or server error" },
      });
    }
  }
);

const AugerServiceMgmtSlice = createSlice({
  name: "augerServices",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearAugerServices: (state) => {
      state.services = [];
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServicesOfAuger.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServicesOfAuger.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;
        if (status === 200) {
          state.services = data?.data?.[0]?.data || [];
          state.filters = filters;
        }
        state.loading = false;
      })
      .addCase(getAllServicesOfAuger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAugerServices } = AugerServiceMgmtSlice.actions;
export default AugerServiceMgmtSlice.reducer;
