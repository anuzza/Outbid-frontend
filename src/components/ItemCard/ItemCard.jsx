import React from "react";
import "./ItemCard.css";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

const ItemCard = ({ item }) => {
  const history = useHistory();
  const clickHandler = (id) => {
    console.log(id);
    history.push(`/details/${id}`);
  };

  return (
    <div className="item_card" onClick={() => clickHandler(item._id)}>
      <img className="item_image" alt="item" src={item.images[0]} />
      <div className="card_details">
        <div className="tags">
          <span className="tag">{item.category}</span>
        </div>
        <span className="title">{item.name}</span>
      </div>
    </div>
  );
};

export default ItemCard;
