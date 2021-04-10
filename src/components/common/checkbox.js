/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import { useState, useRef, useEffect } from "react";

export default function Checkbox({
  styles = {},
  defaultValue = false,
  text,
  onChange = () => {},
}) {
  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  const [checked, setChecked] = useState(defaultValue);
  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span>{text}</span>
    </div>
  );
}
