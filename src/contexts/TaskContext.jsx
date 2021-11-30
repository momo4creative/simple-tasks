import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "cookie-universal";

const TaskContext = createContext();
export const useTaskContext = () => {
  return useContext(TaskContext);
};

const URL_TASK = import.meta.env.VITE_API_URL + "/tasks";

export default function TaskContextProvider({ children }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState();

  //
  const TOKEN = cookies().get("accessToken");

  const handleError = (error) => {
    // console.log(error);
    if (error && error.status == 401) navigate("/login");
  };

  //
  const headerOption = {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  };

  const ApiTask = {
    get: async () => {
      try {
        const response = await axios.get(URL_TASK, headerOption);
        setTasks(response.data);
      } catch (err) {
        handleError(err.response);
        return err.response;
      }
    },
  };

  //---------
  return (
    <TaskContext.Provider value={{ tasks, setTasks, ApiTask }}>
      <>{children}</>
    </TaskContext.Provider>
  );
}
