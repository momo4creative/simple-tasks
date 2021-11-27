import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cookies from "cookie-universal";
import axios from "axios";

const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const URL_AUTH = import.meta.env.VITE_API_URL + "/auth";

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const TOKEN = cookies().get("accessToken");

  const [nick, setNick] = useState("Tamu");

  const handleSuccess = (data, path = null) => {
    console.log("Success -> ", data);
    if (path == "login") navigate("/tasks");
  };

  const handleError = (error, path = null) => {
    console.log("Error -> ", error);
    if (error) {
      if (error.status == 401 && path != "login") navigate("/login");
    }
  };

  const handleLoginSuccess = (data) => {
    console.log("Success -> ", data);
    setTimeout(() => {
      navigate("/tasks");
    }, 1000);

    cookies().set("accessToken", data.accessToken);
    setNick(data.user.username);
  };

  const headerOption = {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  };

  const ApiAuth = {
    get: async (path) => {
      try {
        const response = await axios.get(URL_AUTH, headerOption);
        handleSuccess(response.data, path);
      } catch (err) {
        if (err.response) {
          handleError(err.response, path);
        }
      }
    },
    login: async (body) => {
      try {
        const response = await axios.post(URL_AUTH + "/login", body);
        handleLoginSuccess(response.data);
      } catch (err) {
        if (err.response) {
          handleError(err.response);
          return err.response.data;
        }
      }
    },
    register: async (body) => {
      try {
        const response = await axios.post(URL_AUTH + "/register", body);
        handleSuccess(response.data);
        navigate("/login");
      } catch (err) {
        if (err.response) {
          handleError(err.response);
          return err.response.data;
        }
      }
    },
  };

  // -------
  return (
    <AuthContext.Provider value={{ ApiAuth }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}
