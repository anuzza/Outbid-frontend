import React from "react";
import NavItem from "./NavItem/NavItem";
const NavItems = ({ user }) => {
  return (
    <nav>
      <NavItem link="/items/new" exact>
        List Item
      </NavItem>
    </nav>
  );
};

export default NavItems;
