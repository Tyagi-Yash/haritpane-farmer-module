import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const createCowDungJobOrder = createAsyncThunk(
  "cowDunkService/createCowDungJobOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/createJobOrder", payload);

      if (response.status === 200) {
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

const CowDunkServiceMgmtSlice = createSlice({
  name: "cowDunkService",
  initialState: {
    services: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearCowDunkServices: (state) => {
      state.services = [];
      state.filters = {};
    },
    clearCowDunkServicesFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { clearCowDunkServices, clearCowDunkServicesFilters } =
  CowDunkServiceMgmtSlice.actions;
export default CowDunkServiceMgmtSlice.reducer;
