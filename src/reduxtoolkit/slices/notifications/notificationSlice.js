import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const getAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/getAllNotificationsForFarmer", {
        params,
      });

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

export const markNotificationsAsRead = createAsyncThunk(
  "notifications/markNotificationsAsRead",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/markNotificationsAsRead", payload);
      if (response.status === 200) {
        return {
          status: response.status,
          data: response.data,
          notificationIds: payload.notificationIds,
        };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error marking as read" });
    }
  },
);

const initialState = {
  notifications: [],
  metadata: {},
  summary: {},
  loader: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.metadata = {};
      state.summary = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loader = false;
        const responseData = action.payload.data?.data?.[0];
        if (responseData) {
          if (action.meta.arg?.page === 1) {
            state.notifications = responseData.data;
          } else {
            state.notifications = [...state.notifications, ...responseData.data];
          }
          state.metadata = responseData.metadata?.[0] || {};
          state.summary = responseData.summary || {};
        }
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })
      .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
        const { notificationIds } = action.payload;
        state.notifications = state.notifications.map((n) =>
          notificationIds.includes(n._id) ? { ...n, isRead: true } : n,
        );
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
