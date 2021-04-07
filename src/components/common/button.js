/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import { useState } from "react";

export default function Button({ styles, children, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      sx={{
        color: "white",
        backgroundColor: "#33BAFB",
        border: "none",
        borderRadius: "3px",
        padding: "10px",
        fontFamily: "Quicksand",
        fontWeight: "200",
        fontSize: "16px",
        ...styles,
        "&:focus": {
          outline: "0",
        },
      }}
    >
      {children}
    </button>
  );
}
