import React from "react";
import "./ItemModal.css";
import { RiCloseLine } from "react-icons/ri";

const ItemModal = ({ hideModal }) => {
  return (
    <div className="modal" onClick={() => hideModal()}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title"> Modal title</h4>
        </div>
        <button className="closeBtn" onClick={() => hideModal()}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>

        <div className="modal-body"> This is modal conetent</div>
      </div>
    </div>
  );
};

export default ItemModal;
