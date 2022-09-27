import React from "react";
import "./CustomButton.css";

const CustomButton = ({ children, width, edit, rating, admin, ...rest }) => {
  const classes = ["main-button"];
  if (rest.type === "submit") {
    classes.push("submit");
  }

  if (admin) {
    classes.push("admin-custom");
  }

  return (
    <button style={{ width }} className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
