import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const createComplain = createAsyncThunk(
  "complain/createComplain",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/createComplain", payload);

      if (response.status === 200 || response.status === 201) {
        return {
          status: response.status,
          data: response.data,
        };
      } else {
        return rejectWithValue({
          status: response.status,
          data: response.data,
        });
      }
    } catch (err) {
      return rejectWithValue({
        status: err.response?.status || 500,
        data: err.response?.data || { message: "Network or server error" },
      });
    }
  }
);

export const getAllComplaints = createAsyncThunk(
  "complain/getAllComplaints",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/getAllComplains?page=${page}&limit=${limit}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error fetching complaints" });
    }
  }
);

export const getComplaintById = createAsyncThunk(
  "complain/getComplaintById",
  async (complainId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/getComplainById?complainId=${complainId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error fetching complaint details" });
    }
  }
);

const initialState = {
  loader: false,
  complaints: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  },
  complaintDetail: null,
};

const complainSlice = createSlice({
  name: "complain",
  initialState,
  reducers: {
    clearComplaintDetail: (state) => {
      state.complaintDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createComplain.pending, (state) => {
        state.loader = true;
      })
      .addCase(createComplain.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(createComplain.rejected, (state) => {
        state.loader = false;
      })
      // Get All
      .addCase(getAllComplaints.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.loader = false;
        state.complaints = action.payload.data.complains;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getAllComplaints.rejected, (state) => {
        state.loader = false;
      })
      // Get By Id
      .addCase(getComplaintById.pending, (state) => {
        state.loader = true;
      })
      .addCase(getComplaintById.fulfilled, (state, action) => {
        state.loader = false;
        state.complaintDetail = action.payload.data;
      })
      .addCase(getComplaintById.rejected, (state) => {
        state.loader = false;
      });
  },
});

export const { clearComplaintDetail } = complainSlice.actions;
export default complainSlice.reducer;
