import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const addMyFarm = createAsyncThunk(
  "myFarm/addMyFarm",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/addMyFarm", payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Network error" });
    }
  }
);

export const editMyFarm = createAsyncThunk(
  "myFarm/editMyFarm",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/editMyFarm", payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Network error" });
    }
  }
);

export const getAllMyFarms = createAsyncThunk(
  "myFarm/getAllMyFarms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllMyFarms");
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Network error" });
    }
  }
);

const initialState = {
  farms: [],
  loader: false,
  error: null,
};

const myFarmMgmtSlice = createSlice({
  name: "myFarm",
  initialState,
  reducers: {
    clearFarmError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllMyFarms
      .addCase(getAllMyFarms.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllMyFarms.fulfilled, (state, action) => {
        state.loader = false;
        // API response structure: data[0].data
        state.farms = action.payload.data?.[0]?.data || [];
      })
      .addCase(getAllMyFarms.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.message || "Failed to fetch farms";
      })
      // addMyFarm
      .addCase(addMyFarm.pending, (state) => {
        state.loader = true;
      })
      .addCase(addMyFarm.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(addMyFarm.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.message || "Failed to add farm";
      })
      // editMyFarm
      .addCase(editMyFarm.pending, (state) => {
        state.loader = true;
      })
      .addCase(editMyFarm.fulfilled, (state) => {
        state.loader = false;
      })
      .addCase(editMyFarm.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.message || "Failed to edit farm";
      });
  },
});

export const { clearFarmError } = myFarmMgmtSlice.actions;
export default myFarmMgmtSlice.reducer;
