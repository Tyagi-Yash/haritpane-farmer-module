import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const fetchChatList = createAsyncThunk("chat/fetchList", async () => {
  const res = await axios.get("/getAllChatProviders");
  return res.data.data[0].data;
});

export const fetchMessages = createAsyncThunk("chat/fetchMessages", async (roomId) => {
  const res = await axios.get("/getAllChatFarmer", {
    params: { roomId },
  });
  return res.data.data;
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
    messages: [],
    activeChat: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      state.messages = [];
    },

    addMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        createdAt: action.payload.timestamp || action.payload.createdAt,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.chatList = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { setActiveChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
