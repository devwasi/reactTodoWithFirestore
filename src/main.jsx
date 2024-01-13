import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TodoMain from "./screens/TodoMain.jsx";
import Login from "./screens/Login.jsx";
import { BrowserRouter } from "react-router-dom";
// import TodoAdd from "./screens/TodoAdd.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  // </React.StrictMode>,
);
