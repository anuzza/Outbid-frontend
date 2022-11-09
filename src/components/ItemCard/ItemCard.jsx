import React from "react";
import "./ItemCard.css";
import { Link, useHistory } from "react-router-dom";

const ItemCard = (props) => {
  const history = useHistory();
  const clickHandler = () => {
    history.push("/details");
  };

  return (
    <div className="card" onClick={clickHandler}>
      {props.children}
    </div>
  );
};

export default ItemCard;
