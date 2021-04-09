/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { createPortal } from "react-dom";
import { useTransition } from "react-spring";
import Document, { Html, Head, Main, NextScript } from "next/document";

import Toast from "./toast";
import { useToast } from "./toast-provider";
const ToastContainer = ({ toasts }) => {
  const { removeToast } = useToast();
  const transitions = useTransition(toasts, (toast) => toast.id, {
    from: { opacity: "0" },
    enter: { opacity: "1" },
    leave: { opacity: "0" },
  });

  const closeToast = (id) => {
    removeToast(id);
  };

  return (
    <div
      sx={{
        position: "absolute",
        display: "grid",
        gridTemplateColumns: "100%",
        rowGap: "10px",
        zIndex: "1",
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={"OK"}
          id={toast.id}
          message={toast.message}
          onClose={closeToast}
          time={toast.time}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
//
