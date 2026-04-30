import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllTutorials = createAsyncThunk(
  "tutorials/getAllTutorials",
  async (paramData, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllTutorials", { params: paramData });

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

const initialState = {
  loader: false,
  tutorialsList: [],
};

const tutorialSlice = createSlice({
  name: "tutorials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTutorials.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllTutorials.fulfilled, (state, action) => {
        state.loader = false;
        state.tutorialsList = action.payload.data?.data || [];
      })
      .addCase(getAllTutorials.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default tutorialSlice.reducer;
