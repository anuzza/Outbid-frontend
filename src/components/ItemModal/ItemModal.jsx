import React from "react";
import "./ItemModal.css";
import { RiCloseLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";

const ItemModal = ({ hideModal, item }) => {
  return (
    <div className="modal" onClick={() => hideModal()}>
      <div className="modal-content">
        <button className="closeBtn" onClick={() => hideModal()}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div className="modal-header">
          <h2 className="modal-title"> {item.name}</h2>
        </div>

        <div className="modal-body">
          <div>#{item.category}</div>
          <div>{item.description}</div>
          <div> Current Bid: ${item.starting_amount}</div>
          <div className="images">
            {item.images.map((img) => (
              <div className="image-div">
                <img className="image" alt="img" src={img} />
              </div>
            ))}
          </div>
          <button>Bid Now</button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
