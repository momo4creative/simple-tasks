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
  const [tasks, setTasks] = useState([]);

  //
  const TOKEN = cookies().get("accessToken");

  const handleSuccess = (data) => {
    console.log(data);
  };

  const handleError = (error) => {
    console.log(error);
    if (error && error.status == 401) navigate("/login");
  };

  //
  const headerOption = {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  };

  const ApiTask = {
    getAll: async () => {
      try {
        const response = await axios.get(URL_TASK, headerOption);
        handleSuccess(response.data);
        setTasks(response.data);
      } catch (err) {
        if (err) {
          handleError(err.response);
          return err.response;
        }
      }
    },

    add: async (body) => {
      try {
        const response = await axios.post(URL_TASK, body, headerOption);
        handleSuccess(response.data);
        setTasks((cur) => [response.data, ...cur]);
      } catch (err) {
        if (err) {
          handleError(err.response);
          return err.response;
        }
      }
    },

    updateCheck: async (id, body) => {
      try {
        const response = await axios.put(
          URL_TASK + "/check/" + id,
          body,
          headerOption
        );

        handleSuccess(response.data);

        const updateTask = tasks.map((task) => {
          if (task._id == id) {
            task.completed = !task.completed;
          }
          return task;
        });

        setTasks(updateTask);
      } catch (err) {
        if (err) {
          handleError(err.response);
          return err.response;
        }
      }
    },
  };

  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);
  //---------
  return (
    <TaskContext.Provider value={{ tasks, ApiTask }}>
      <>{children}</>
    </TaskContext.Provider>
  );
}
