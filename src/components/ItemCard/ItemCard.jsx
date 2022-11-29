import React from "react";
import "./ItemCard.css";
import { FiTrash2 } from "react-icons/fi";
import axios from "../../utils/axios";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getError } from "../../utils/error";

const now = new Date();

const ItemCard = ({ item, onClick, amount }) => {
  const history = useHistory();
  const { addToast } = useToasts();

  const clickHandler = (selected) => {
    onClick(selected);
  };

  const onDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`/items/${item?._id}`);
      addToast("Item Succesfully Deleted!", {
        appearance: "success",
      });
      history.push("/my-items");
    } catch (error) {
      addToast(getError(error), {
        appearance: "error",
      });
    }
  };

  const itemExpired = item?.end_date <= now.toISOString();

  return (
    <div
      style={{
        cursor: itemExpired ? "default" : "pointer",
      }}
      className="item_card"
      onClick={() => !itemExpired && clickHandler(item)}
    >
      {itemExpired && (
        <div className="item-expired">
          <span>This item has expired!</span>
          <span className="remove-item">
            Remove item
            <FiTrash2
              size={20}
              color="#000"
              cursor="pointer"
              onClick={onDelete}
            />
          </span>
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
