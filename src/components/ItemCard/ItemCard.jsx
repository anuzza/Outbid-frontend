import React from "react";
import "./ItemCard.css";

const ItemCard = (props) => {
  return <div className="card">{props.children}</div>;
};

export default ItemCard;
