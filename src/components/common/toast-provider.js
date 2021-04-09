import React, { useState, useContext, useCallback } from "react";
import ToastManager from "./toast-manager";

const ToastContext = React.createContext(null);

let id = 1;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (content) => {
      const new_toast = {
        id: id++,
        ...content,
      };
      setToasts((toasts) => [...toasts, new_toast]);
    },
    [setToasts]
  );
  console.log("toasts", toasts);
  const removeToast = useCallback(
    (id) => {
      console.log("boom");
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastManager toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
