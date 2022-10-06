import React from "react";
import "./item.css";
import { FaStar } from "react-icons/fa";

const Item = ({ item }) => {
  return (
    <div>
      <div className="img-div">
        <img src={item.image} alt="items" />
      </div>
      <div className="title">{item.title}</div>
      <div className="price">Starting Bid: ${item.price}</div>
      <div className="category">#{item.category}</div>
      <div className="rating">
        <FaStar color="gold" />
        {item.rating}
      </div>
    </div>
  );
};

export default Item;
