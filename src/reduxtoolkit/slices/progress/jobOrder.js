import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllJobOrders = createAsyncThunk(
  "jobOrderList/getAllJobOrders",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllJobOrders", { params: filters });
      return {
        status: response.status,
        data: response.data,
        filters,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Failed to fetch job orders" },
      });
    }
  },
);

export const cancelJobOrder = createAsyncThunk(
  "jobOrder/cancelJobOrder",
  async (jobOrderId, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.put("/cancelJobOrder", null, {
        params: { jobOrderId },
      });

      const { filters } = getState().services.jobOrderListSlice;

      dispatch(getAllJobOrders(filters));

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || {
          message: "Failed to cancel job order",
        },
      });
    }
  },
);

export const rescheduleJobOrder = createAsyncThunk(
  "jobOrder/rescheduleJobOrder",
  async ({ orderId, fromDate, tillDate, startTime }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/rescheduleJobOrder", {
        jobOrderId: orderId,
        fromDate,
        tillDate,
        startTime,
      });

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || {
          message: "Failed to reschedule job order",
        },
      });
    }
  },
);

const jobOrderListSlice = createSlice({
  name: "jobOrderList",
  initialState: {
    loading: false,
    jobOrders: [],
    filters: {},
    actionLoading: false,
    paginationData: {
      total: 0,
      page: 1,
      isNext: false,
      isPrev: false,
    },
  },
  reducers: {
    clearJobOrderList: (state) => {
      state.jobOrders = [];
      state.filters = {};
      state.paginationData = {
        total: 0,
        page: 1,
        isNext: false,
        isPrev: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      // fetch all job orders
      .addCase(getAllJobOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobOrders.fulfilled, (state, action) => {
        const { status, data, filters } = action.payload;

        if (status === 200) {
          const meta = data?.data?.[0]?.metadata?.[0] || {};
          const jobOrders = data?.data?.[0]?.data || [];

          state.jobOrders = jobOrders;
          state.paginationData = meta;
          state.filters = filters;
        }

        state.loading = false;
      })
      .addCase(getAllJobOrders.rejected, (state) => {
        state.loading = false;
      })

      // reject job order
      .addCase(cancelJobOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(cancelJobOrder.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(cancelJobOrder.rejected, (state) => {
        state.actionLoading = false;
      })

      // reschedule job order
      .addCase(rescheduleJobOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(rescheduleJobOrder.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(rescheduleJobOrder.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export const { clearJobOrderList } = jobOrderListSlice.actions;
export default jobOrderListSlice.reducer;
