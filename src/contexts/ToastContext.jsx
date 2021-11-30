import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastMessage } from "../components/toast";

const ToastContext = createContext();
export const useToastContext = () => useContext(ToastContext);

export default function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, msg) => {
    const newToast = {
      id: uuidv4(),
      type,
      msg,
    };
    setToasts([newToast, ...toasts]);
  };

  const toast = {
    success: (msg) => addToast("success", msg),
    error: (msg) => addToast("error", msg),
  };

  const deleteToast = (id) => {
    const newToast = toasts.filter((item) => item.id != id);
    setToasts(newToast);
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, deleteToast }}>
      <>
        <ToastMessage />
        {children}
      </>
    </ToastContext.Provider>
  );
}
