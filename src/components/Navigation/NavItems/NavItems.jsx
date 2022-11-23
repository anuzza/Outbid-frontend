import React from "react";
import NavItem from "./NavItem/NavItem";
import DropDownMenu from "../../Dropdown/DropDownMenu";

const NavItems = ({ user }) => {
  return (
    <nav>
      <NavItem link="/items/new" exact>
        List Item
      </NavItem>

      {user && <DropDownMenu user={user} />}
    </nav>
  );
};

export default NavItems;
