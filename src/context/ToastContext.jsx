import { createContext, useContext } from "react";
import toast from "react-hot-toast";

const ToastContexts = createContext();

export const ToastContext = ({ children }) => {
  const notify = (type, message, options = {}) => {
    switch (type) {
      case "success":
        return toast.success(message, options);
      case "error":
        return toast.error(message, options);
      case "loading":
        return toast.loading(message, options);
      default:
        return toast(message, options);
    }
  };

  const dismiss = (id) => toast.dismiss(id);

  return (
    <ToastContexts.Provider value={{ notify, dismiss }}>
      {children}
    </ToastContexts.Provider>
  );
};

export const useToast = () => useContext(ToastContexts);
