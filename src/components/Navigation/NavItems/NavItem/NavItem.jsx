import React from "react";
import { NavLink } from "react-router-dom";
import "./NavItem.css";
const NavItem = (props) => {
  return (
    <li className="nav_link">
      <NavLink exact to={props.link}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
