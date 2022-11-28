import React from "react";
import NavItem from "./NavItem/NavItem";
import DropDownMenu from "../../Dropdown/DropDownMenu";

const NavItems = ({ isAuthenticated }) => {
  return (
    <nav>
      <NavItem link="/items/new" exact>
        List Item
      </NavItem>

      {isAuthenticated && <DropDownMenu />}
    </nav>
  );
};

export default NavItems;
