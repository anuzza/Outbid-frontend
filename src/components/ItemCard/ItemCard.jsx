import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onClick }) => {
  const clickHandler = (selected) => {
    onClick(selected);
  };

  return (
    <div className="item_card" onClick={() => clickHandler(item)}>
      <img className="item_image" alt="item" src={item.images[0]} />
      <div className="card_details">
        <div className="tags">
          <span className="tag">{item.category}</span>
        </div>
        <div className="item-detail">
          <span className="title">{item.name}</span>
          <span className="amount">${item.current_bid}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
