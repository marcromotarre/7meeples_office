/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useRef, useEffect } from "react";

export default function Table({ columns, data, onClick = () => {}, styles }) {
  const transformed_data = data.map((d) => {
    return {
      id: d.id,
      data: columns.map((column) => (d[column.field] ? d[column.field] : "")),
    };
  });

  const columnsWidth = columns
    .map(({ width }) => (width ? width : "auto"))
    .reduce((arr, acc) => arr + " " + acc);
  const rowColors =
    transformed_data.length % 2 === 0
      ? ["#FFFFFF", "#EEEEEE"]
      : ["#EEEEEE", "#FFFFFF"];

  console.log(transformed_data);
  return (
    <div
      sx={{
        width: "100%",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        gridTemplateColumns: `${columnsWidth}`,
        ...styles,
      }}
    >
      {columns.map((column) => (
        <div
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#000",
            color: "#fff",
            paddingTop: "25px",
            paddingBottom: "25px",
            padding: "($half-spacing-unit * 1.5) 0",
          }}
        >
          <h3>{column.name}</h3>
        </div>
      ))}
      {transformed_data.map((row, index) => (
        <>
          {row.data.map((field) => (
            <div
              onClick={() => onClick(row.id)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                paddingTop: "15px",
                paddingBottom: "15px",
                background: index % 2 === 0 ? rowColors[0] : rowColors[1],
                padding: "($half-spacing-unit * 1.5) 0",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <p>{field}</p>
            </div>
          ))}
        </>
      ))}
    </div>
  );
}
