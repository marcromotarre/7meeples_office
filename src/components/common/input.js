/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import { useState, useRef, useEffect } from "react";

export default function Input({
  styles = {},
  defaultValue = "",
  text,
  color = "#33BAFB",
  type = "text",
  valueFixed = false,
  onChange = () => {},
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    if (!valueFixed) {
      onChange(event.target.value);
      setValue(event.target.value);
    }
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

      <input
        sx={{
          width: "100%",
          border: `1px solid ${color}`,
          borderRadius: "3px",
          height: "43px",
          paddingLeft: "15px",
          fontSize: "16px",
          fontWeight: "200",
          "&:focus": {
            outline: "none",
          },
        }}
        type={type}
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
}
