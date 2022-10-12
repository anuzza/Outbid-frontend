import React from "react";
import "./ItemCard.css";
import { Link } from "react-router-dom";

const ItemCard = (props) => {
  return <Link to="/details">
    <div className="card">{props.children}</div>;
    </Link>
};

export default ItemCard;
