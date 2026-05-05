import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/ui/Toast";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setMessage(msg);
  }, []);

  const close = () => setMessage(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} onClose={close} />
    </ToastContext.Provider>
  );
}
