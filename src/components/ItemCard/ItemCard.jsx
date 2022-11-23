import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import ItemModal from "../ItemModal/ItemModal";

const ItemCard = ({ item, onClick }) => {
  const history = useHistory();

  const clickHandler = (selected) => {
    onClick(selected);
  };

  return (
    <>
      <div className="item_card" onClick={() => clickHandler(item)}>
        <img className="item_image" alt="item" src={item.images[0]} />
        <div className="card_details">
          <div className="tags">
            <span className="tag">{item.category}</span>
          </div>
          <span className="title">{item.name}</span>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
