/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useRef, useEffect } from "react";

const TYPES = {
  OK: "OK",
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFO: "INFO",
};

const COLORS = {
  OK: "#47D292",
  ERROR: "#FD4850",
  WARNING: "#F9C821",
  INFO: "#0080F5",
};
export default function Toast({ id, type, message, onClose = () => {}, time }) {
  useEffect(() => {
    if (time) {
      const timer = setTimeout(() => {
        onClose(id);
      }, time);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div
      sx={{
        height: "min-content",
        width: "min-content",
        minWidth: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        background: COLORS[type],
      }}
    >
      <p
        sx={{
          color: "white",
          padding: "10px",
        }}
      >
        {message}
      </p>
    </div>
  );
}
