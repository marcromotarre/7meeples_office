/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import { useState, useRef, useEffect } from "react";
import Button from "./button";

import delete_icon from "../../assets/delete-icon.svg";
export default function Select({
  styles = {},
  color = "#33BAFB",
  text,
  options = [],
  defaultValue = [],
  onChange = () => {},
}) {
  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);
  const [values, setValues] = useState(defaultValue);
  const filtered_options = options.filter((option) => {
    const ids = values.map((value) => Number(value));
    return !ids.includes(option.id);
  });

  const addPublisher = (event) => {
    if (event.target.value !== "_none_") {
      const _values = [...values, Number(event.target.value)];
      setValues(_values);
      onChange(_values);
    }
  };

  const removeValue = (position) => {
    const _values = [
      ...values.filter(({}, index) => index < position),
      ...values.filter(({}, index) => index > position),
    ];
    setValues(_values);
    onChange(_values);
  };

  return (
    <div sx={{ width: "100%", ...styles, position: "relative" }}>
      <div
        sx={{
          width: "calc(100% - 20px)",
          position: "relative",
          top: "10px",
          left: "10px",
        }}
      >
        <div
          sx={{
            backgroundColor: "white",
            padding: "3px 10px",
            width: "fit-content",
          }}
        >
          <span
            sx={{
              fontSize: "10px",
              fontWeight: "200",

              color: color,
            }}
          >
            {text}
          </span>
        </div>
      </div>

      <div
        sx={{
          width: "100%",
          border: `1px solid ${color}`,
          borderRadius: "3px",
          height: `${43 * (values.length + 1)}px`,
          paddingLeft: "15px",
          fontSize: "16px",
          fontWeight: "200",
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {values.map((value, index) => (
          <div
            key={index}
            sx={{
              width: "100%",
              height: "43px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "auto min-content",
              alignItems: "center",
            }}
          >
            <p sx={{ justifySelf: "start" }}>
              {options.find((option) => option.id === Number(value)).name}
            </p>
            <img
              onClick={() => removeValue(index)}
              sx={{
                marginRight: "10px",
                justifySelf: "center",
                width: "20px",
                height: "auto",
              }}
              src={delete_icon}
            />
          </div>
        ))}
        <select
          sx={{
            "&:focus": {
              outline: "none",
            },
            width: "100%",
            border: "0",
            height: "43px",
          }}
          onChange={(value) => addPublisher(value)}
          value={"_none_"}
        >
          <option value="_none_"></option>
          {filtered_options.map((option, option_index) => (
            <option key={option_index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
