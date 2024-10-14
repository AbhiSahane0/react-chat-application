import React, { useState, useEffect, useRef, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, receiveMessage } from "../features/chatSlice";
import { RootState } from "../app/store";
import { TextField, List, ListItem, Typography } from "@mui/material";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput("");
    }
  };

  // Simulate receiving messages
  useEffect(() => {
    const simulateMessage = () => {
      const receivedMessage = {
        id: Date.now().toString(),
        text: "This is a simulated message.",
        user: "User2",
        timestamp: new Date().toLocaleTimeString(),
      };
      startTransition(() => {
        dispatch(receiveMessage(receivedMessage));
      });
    };

    const timeout = setTimeout(simulateMessage, 5000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div
        ref={chatWindowRef}
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "16px",
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} alignItems="flex-start">
              <div>
                <Typography
                  variant="body1"
                  component="span"
                  color={message.user === "User1" ? "primary" : "secondary"}
                >
                  {message.user}:
                </Typography>
                <Typography variant="body2" component="span">
                  {` ${message.text}`}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {message.timestamp}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
      <TextField
        sx={{ mt: 2 }}
        color="primary"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        variant="outlined"
      />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSend}
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Send
        </Button>
      </Stack>
    </div>
  );
};

export default Chat;
