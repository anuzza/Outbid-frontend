import React from "react";
import "./Landing.css";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import Items from "../../components/Items/Items";

const Landing = () => {
  return (
    <div className="wrapper">
      <SearchContainer />
      <Items />
    </div>
  );
};

export default Landing;
