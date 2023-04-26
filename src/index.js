import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ResetStyle from "./styles/ResetStyle";
import GlobalStyle from "./styles/GlobalStyle.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
