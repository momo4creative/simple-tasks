import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "cookie-universal";
import { useToastContext } from "./ToastContext";

const TaskContext = createContext();
export const useTaskContext = () => {
  return useContext(TaskContext);
};

const URL_TASK = import.meta.env.VITE_API_URL + "/tasks";

export default function TaskContextProvider({ children }) {
  const { toast } = useToastContext();

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

    add: async (body, cb) => {
      try {
        const response = await axios.post(URL_TASK, body, headerOption);
        cb(null, response.data);
        toast.success("Berhasil menambah tugas baru !");
        // console.log("ok");
      } catch (err) {
        console.log("error");
        handleError(err.response);
        cb(err.response, null);
        toast.error("Gagal menambah tugas baru !");
      }
    },

    updateCheck: async (id, body) => {
      try {
        const response = await axios.put(
          URL_TASK + "/check/" + id,
          body,
          headerOption
        );
        // console.log(response.data);
        toast.success("Berhasil mengubah tugas !");
      } catch (err) {
        handleError(err.response);
        toast.error("Gagal mengubah tugas !");
        return err.response;
      }
    },
    delete: async (id) => {
      const yes = confirm("Apakah yakin menghapus");
      if (!yes) return "Batal menghapus";
      try {
        await axios.delete(URL_TASK + "/" + id, headerOption);
        toast.success("Berhasil menghapus tugas !");
      } catch (err) {
        handleError(err.response);
        toast.error("Gagal menghapus tugas !");
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
