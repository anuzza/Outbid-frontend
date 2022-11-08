import React from "react";
import { Link } from "react-router-dom";
import "./DetailsCard.css";

const DetailsCard = (props) => {
      return (
      <div className="DetailsCard">{props.children}</div>
      )
  };
  export default DetailsCard;