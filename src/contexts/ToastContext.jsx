import { createContext, useContext } from "react";

const ToastContext = createContext();
export const useToastContext = () => useContext(ToastContext);

export default function ToastContextProvider({ children }) {
  return <ToastContext.Provider>{children}</ToastContext.Provider>;
}
