import React, { useState, useEffect, useRef, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, receiveMessage } from "../features/chatSlice";
import { RootState } from "../app/store";
import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const [, startTransition] = useTransition();
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput("");
    }
  };

  useEffect(() => {
    const simulateMessage = () => {
      const receivedMessage = {
        id: Date.now().toString(),
        text: "This is a simulated message.",
        user: "User2",
        timestamp: new Date().toLocaleTimeString(),
        avatar: "",
      };
      startTransition(() => {
        dispatch(receiveMessage(receivedMessage));
      });
    };

    const timeout = setTimeout(simulateMessage, 5000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

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
          borderRadius: "10px",
        }}
      >
        <List sx={{ borderRadius: "10px", overflow: "hidden" }}>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={message.user}
                    src={message.avatar || "/static/images/avatar/default.jpg"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: "'Montserrat', sans-serif",
                    },
                  }}
                  primary={message.text}
                  secondary={
                    <>
                      <Typography
                        sx={{
                          display: "inline",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                        component="span"
                        variant="body2"
                        color={
                          message.user === "User1" ? "primary" : "secondary"
                        }
                      >
                        {message.user}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        display="block"
                        sx={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {message.timestamp}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
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
