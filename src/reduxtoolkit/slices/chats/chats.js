import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/config";

export const fetchChatList = createAsyncThunk("chat/fetchList", async (params) => {
  const res = await axios.get("/getAllChatProviders", {params});
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
    messagesLoading: false,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push({
        ...action.payload,
        createdAt: action.payload.timestamp || action.payload.createdAt,
      });
    },
    resetChatState: () => ({
      chatList: [],
      messages: [],
      activeChat: null,
    }),
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.chatList = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.messagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.messagesLoading = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.messagesLoading = false;
      });
  },
});

export const { setActiveChat, addMessage, resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
