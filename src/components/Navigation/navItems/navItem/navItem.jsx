import React from "react";
import { Link } from "react-router-dom";
import "./navItem.css";
const navItem = (props) => {
  return (
    <li className="nav_link">
      <Link to={props.link}>{props.children}</Link>
    </li>
  );
};

export default navItem;
