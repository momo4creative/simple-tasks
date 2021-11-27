import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider, TaskContextProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          {/*  */}
          <App />
          {/*  */}
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
