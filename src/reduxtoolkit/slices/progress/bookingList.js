import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";
import { bookingAdapters } from "../../../utils/bookingAdapters";

export const getMyBookings = createAsyncThunk(
  "bookingList/getMyBookings",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/myBookings", { params: filters });
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
  },
);

export const getBookingById = createAsyncThunk(
  "bookingList/getBookingById",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getBookingById", { params: { bookingId } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch booking details" });
    }
  },
);

const bookingListSlice = createSlice({
  name: "bookingList",
  initialState: {
    loading: false,
    services: [],
    filters: {},
    activeTab: "serviceTracking",
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
      state.activeTab = "serviceTracking";
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.paginationData.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // getMyBookings
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;

        if (status === 200) {
          const meta = data?.data?.[0]?.metadata?.[0] || {};
          const rawBookings = data?.data?.[0]?.data || [];

          state.services = rawBookings
            .map((item) => {
              const adapter = bookingAdapters[item.bookingFor];
              return adapter ? adapter(item) : null;
            })
            .filter(Boolean);

          state.paginationData = meta;
          state.filters = filters;
        }

        state.loading = false;
      })
      .addCase(getMyBookings.rejected, (state) => {
        state.loading = false;
      })
      
      // getBookingById
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading = false;
        const bookingData = action.payload.data;
        if (bookingData) {
          const index = state.services.findIndex((b) => b.id === bookingData._id);
          if (index !== -1) {
            state.services[index].raw = {
              ...state.services[index].raw,
              startTimeOtp: bookingData.startTimeOtp,
              endTimeOtp: bookingData.endTimeOtp,
            };
          } else {
            const adapter = bookingAdapters[bookingData.bookingFor];
            const adaptedBooking = adapter ? adapter(bookingData) : null;
            if (adaptedBooking) {
              state.services.push(adaptedBooking);
            }
          }
        }
      })
      .addCase(getBookingById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearBookingList, setActiveTab } = bookingListSlice.actions;
export default bookingListSlice.reducer;
