import React from "react";
import "./ItemCard.css";
import { hasItemExpired } from "../../utils/checkItemExpiry";
import StripeButton from "../StripeButton/StripeButton";

const ItemCard = ({ item, onClick, amount, user, setState }) => {
  const clickHandler = (selected) => {
    onClick(selected);
  };

  const itemExpired = hasItemExpired(item);
  const itemBelongsToUser =
    item && user && item?.creator?.toString() === user?._id?.toString();
  const itemWinnerIsUser =
    item && user && item?.winner?.toString() === user?._id?.toString();

  return (
    <div
      style={{
        cursor: itemExpired ? "default" : "pointer",
      }}
      className="item_card"
      onClick={() => {
        if (itemExpired) {
          return;
        }
        clickHandler(item);
      }}
    >
      {itemExpired && (
        <div className="item-expired">
          <span>Auction closed!!!</span>
          {!itemBelongsToUser && itemWinnerIsUser && !item?.sold && (
            <StripeButton item={item} setState={setState} />
          )}
          {!itemBelongsToUser && itemWinnerIsUser && item?.sold && (
            <span className="paid"> ✅Paid✅ </span>
          )}
        </div>
      )}
      {itemExpired && itemWinnerIsUser && (
        <div className="user-is-winner">
          <span> Winner</span>
        </div>
      )}

      <img
        style={{
          opacity: itemExpired ? 0.1 : 1,
        }}
        className="item_image"
        alt="item"
        src={item.images[0]}
      />
      <div className="card_details">
        <div className="tags">
          <span className="tag">{item.category}</span>
          {amount && <span className="bid">Your Bid: ${amount}</span>}
        </div>
        <div className="item-detail">
          <span className="title">{item.name}</span>
          <span className="amount">${item.current_bid}</span>
        </div>

        {amount && amount < item.current_bid && (
          <span className="msg">You have been outbidded!</span>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
