import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./Items.css";

const Items = ({ items }) => {
  return (
    <div className="card-wrapper">
      {items.map((item) => (
        <ItemCard key={item._id} item={item}></ItemCard>
      ))}
    </div>
  );
};

export default Items;
