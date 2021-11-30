import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import {
  AuthContextProvider,
  TaskContextProvider,
  ToastContextProvider,
} from "./contexts";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <AuthContextProvider>
          <TaskContextProvider>
            {/*  */}
            <App />
            {/*  */}
          </TaskContextProvider>
        </AuthContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
