import React from "react";
import "./ItemModal.css";
import { RiCloseLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import CustomButton from "../CustomButton/CustomButton";

const ItemModal = ({ hideModal, item }) => {
  return (
    <div className="modal">
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
            {/* {item.images.map((img) => (
              <div className="image-div">
                <img className="image" alt="img" src={img} />
              </div>
            ))} */}
            <SimpleImageSlider
              className="slider"
              width={500}
              height={300}
              images={item.images}
              showBullets={true}
              showNavs={true}
            />
          </div>
          <div className="btns">
            <CustomButton>Bid Now</CustomButton>
            <CustomButton>Report</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
