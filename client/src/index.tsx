import React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { App } from "./App";
import client from "./apollo/client";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <CssBaseline />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  );
}
