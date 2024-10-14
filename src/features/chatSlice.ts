import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp: string;
  avatar?: string;
}

interface ChatState {
  messages: Message[];
  currentUser: string;
}

const initialState: ChatState = {
  messages: [],
  currentUser: "User1",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      const message: Message = {
        id: Date.now().toString(),
        text: action.payload,
        user: state.currentUser,
        timestamp: new Date().toLocaleTimeString(),
      };
      state.messages.push(message);
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
