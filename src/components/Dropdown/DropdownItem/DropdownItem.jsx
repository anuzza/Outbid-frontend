import React from "react";
import { Link } from "react-router-dom";
import "./DropdownItem.css";

const DropdownItem = ({ link, children }) => {
  return (
    <li className="dropdown-item">
      <Link to={link}>{children}</Link>
    </li>
  );
};

export default DropdownItem;
