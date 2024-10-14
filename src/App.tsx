import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Chat from "./components/Chat";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Chat App
        </Typography>
        <Chat />
      </Container>
    </Provider>
  );
};

export default App;
