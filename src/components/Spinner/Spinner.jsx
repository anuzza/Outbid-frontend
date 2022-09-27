import React from "react";
import "./Spinner.css";
const Spinner = (props) => {
  return (
    <div
      style={{
        ...props,
      }}
      className="loader"
    >
      Loading...
    </div>
  );
};
export default Spinner;
