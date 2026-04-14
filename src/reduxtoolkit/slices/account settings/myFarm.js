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
  },
);

export const editMyFarm = createAsyncThunk(
  "myFarm/editMyFarm",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put("/editMyFarm", payload);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Network error" });
    }
  },
);

export const getAllMyFarms = createAsyncThunk(
  "myFarm/getAllMyFarms",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllMyFarms", { params });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Network error" });
    }
  },
);

export const getFarmList = createAsyncThunk(
  "myFarm/getFarmList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getFarmList");
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Network error" });
    }
  },
);

export const deleteMyFarm = createAsyncThunk(
  "myFarm/deleteMyFarm",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/deleteMyFarm", { data: payload });
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Network error" });
    }
  },
);

const initialState = {
  farms: [],
  allFarms: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  },
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
        const metadata = action.payload.data?.[0]?.metadata?.[0];
        if (metadata) {
          state.pagination = {
            total: metadata.total || 0,
            page: metadata.page || 1,
            limit: state.pagination.limit,
          };
        }
      })
      .addCase(getAllMyFarms.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.message || "Failed to fetch farms";
      })
      // getFarmList
      .addCase(getFarmList.pending, (state) => {
        state.loader = true;
      })
      .addCase(getFarmList.fulfilled, (state, action) => {
        state.loader = false;
        state.allFarms = action.payload.data || [];
      })
      .addCase(getFarmList.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.message || "Failed to fetch farm list";
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
      })
      // deleteMyFarm
      .addCase(deleteMyFarm.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteMyFarm.fulfilled, (state, action) => {
        state.loader = false;
        state.farms = state.farms.filter((farm) => farm._id !== action.payload.data._id);
      })
      .addCase(deleteMyFarm.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload?.message || "Failed to delete farm";
      });
  },
});

export const { clearFarmError } = myFarmMgmtSlice.actions;
export default myFarmMgmtSlice.reducer;
