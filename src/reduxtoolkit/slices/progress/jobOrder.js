import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllJobOrders = createAsyncThunk(
  "jobOrderList/getAllJobOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllJobOrders");

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status || 500,
        data: error.response?.data || { message: "Failed to fetch job orders" },
      });
    }
  },
);

const jobOrderListSlice = createSlice({
  name: "jobOrderList",
  initialState: {
    loading: false,
    jobOrders: [],
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
      .addCase(getAllJobOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobOrders.fulfilled, (state, action) => {
        const { status, data } = action.payload;

        if (status === 200) {
          const meta = data?.data?.[0]?.metadata?.[0] || {};
          const jobOrders = data?.data?.[0]?.data || [];

          state.jobOrders = jobOrders;
          state.paginationData = meta;
        }

        state.loading = false;
      })
      .addCase(getAllJobOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearJobOrderList } = jobOrderListSlice.actions;
export default jobOrderListSlice.reducer;
