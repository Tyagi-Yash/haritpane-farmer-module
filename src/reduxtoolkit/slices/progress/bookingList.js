import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getMyBookings = createAsyncThunk(
  "bookingList/getMyBookings",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/myBookings", {
        params: filters,
      });
      return {
        status: response.status,
        data: response.data,
        filters,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Failed to fetch bookings" },
      });
    }
  }
);

const bookingListSlice = createSlice({
  name: "bookingList",
  initialState: {
    loading: false,
    services: [],
    filters: {},
    paginationData: {
      total: 0,
      page: 1,
      isNext: false,
      isPrev: false,
    },
  },
  reducers: {
    clearBookingList: (state) => {
      state.services = [];
      state.filters = {};
      state.paginationData = { total: 0, page: 1, isNext: false, isPrev: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;

        if (status === 200) {
          const metadata = data?.data?.[0]?.metadata?.[0] || {};
          state.services = data?.data?.[0]?.data || [];
          state.paginationData = metadata;
          state.filters = filters;
        }

        state.loading = false;
      })
      .addCase(getMyBookings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearBookingList } = bookingListSlice.actions;
export default bookingListSlice.reducer;
