import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getQuotationsForJobOrder = createAsyncThunk(
  "quotation/getQuotationsForJobOrder",
  async (jobOrderId, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getQuotationsForJobOrder", {
        params: { jobOrderId },
      });

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || {
          message: "Failed to fetch quotations",
        },
      });
    }
  },
);

export const acceptQuotation = createAsyncThunk(
  "quotation/acceptQuotation",
  async ({ jobOrderId, quotationId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put("/acceptQuotation", {
        jobOrderId,
        quotationId,
      });

      dispatch(getQuotationsForJobOrder(jobOrderId));

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || {
          message: "Failed to accept quotation",
        },
      });
    }
  },
);

const quotationSlice = createSlice({
  name: "quotation",
  initialState: {
    loading: false,
    actionLoading: false,
    jobStatus: null,
    quotations: [],
  },
  reducers: {
    clearQuotations: (state) => {
      state.loading = false;
      state.actionLoading = false;
      state.jobStatus = null;
      state.quotations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch quotations
      .addCase(getQuotationsForJobOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuotationsForJobOrder.fulfilled, (state, action) => {
        const { status, data } = action.payload;

        if (status === 200) {
          state.jobStatus = data?.data?.status;
          state.quotations = data?.data?.quotations || [];
        }

        state.loading = false;
      })
      .addCase(getQuotationsForJobOrder.rejected, (state) => {
        state.loading = false;
      })

      // accept quotation
      .addCase(acceptQuotation.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(acceptQuotation.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(acceptQuotation.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export const { clearQuotations } = quotationSlice.actions;
export default quotationSlice.reducer;
