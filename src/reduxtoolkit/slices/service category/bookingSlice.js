import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/createBooking", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Booking failed" });
    }
  },
);

export const getBookingStatus = createAsyncThunk(
  "booking/getBookingStatus",
  async (
    {
      providerId,
      serviceId,
      categoryId,
      bookingFor,
      tractorInfoId,
      typeOfCrop,
      cattlebasicInfoId,
      materialInfoId,
      labourType,
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.get("/getBookingStatusOfFarmer", {
        params: {
          providerId,
          serviceId,
          categoryId,
          bookingFor,
          tractorInfoId,
          typeOfCrop,
          cattlebasicInfoId,
          materialInfoId,
          labourType,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Status fetch failed" });
    }
  },
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put("/cancelBooking", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cancel failed" });
    }
  },
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    bookingData: null,
    isBooking: false,
    error: null,
  },
  reducers: {
    clearBookingState: (state) => {
      state.bookingData = null;
      state.isBooking = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* create booking */
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingData = action.payload.data;
        state.isBooking = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* booking status */
      .addCase(getBookingStatus.fulfilled, (state, action) => {
        state.isBooking = action.payload.data.isBooking;
      })

      /* cancel booking */
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBooking.fulfilled, (state) => {
        state.isBooking = false;
        state.bookingData = null;
        state.loading = false;
      })
      .addCase(cancelBooking.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
