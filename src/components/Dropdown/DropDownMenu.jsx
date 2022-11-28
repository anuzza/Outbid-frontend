import React, { useState, useRef, useEffect } from "react";
import "./DropDownMenu.scss";
import DropdownItem from "./DropdownItem/DropdownItem";

const DropDownMenu = () => {
  const [hidden, setHidden] = useState(false);
  const node = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setHidden(false);
  };

  return (
    <li className=" logged-in">
      <div className="dropdown">
        <span ref={node} onClick={() => setHidden(!hidden)} className="caret" />
      </div>
      {hidden && (
        <ul className="dropdown-menu">
          <div>
            <DropdownItem link="/saved-items">Saved Items</DropdownItem>
            <DropdownItem link="/my-items">My Items</DropdownItem>
            <DropdownItem link="/my-bids">My Bids</DropdownItem>
            <DropdownItem link="/my-profile">My Profile</DropdownItem>
            <DropdownItem link="/account-settings">
              Account Settings
            </DropdownItem>
          </div>
        </ul>
      )}
    </li>
  );
};

export default DropDownMenu;
