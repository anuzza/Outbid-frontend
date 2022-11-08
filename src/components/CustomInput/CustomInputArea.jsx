import React from "react";
import "./CustomInputArea.css";

const CustomInputArea = ({ children, ingro, ...rest }) => {
  const classes = ["custom-input-area"];
  if (rest.disabled) {
    classes.push("disabled");
  }

  const labelClasses = ["no-children"];
  if (ingro) {
    labelClasses.push("ingro-children");
  }

  const input = children ? (
    <label className="custom-label">
      <span>{children}</span>
      <textarea className={classes.join(" ")} {...rest} />
    </label>
  ) : (
    <div className={labelClasses.join(" ")}>
      <textarea className={classes.join(" ")} {...rest} />
    </div>
  );

  return input;
};

export default CustomInputArea;
