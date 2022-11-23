import React, { useState } from "react";
import "./ItemModal.css";
import { RiCloseLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import BasicInfo from "../../containers/ItemPost/BasicInfo/Basic";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";
import { useToasts } from "react-toast-notifications";

const ItemModal = ({ hideModal, item }) => {
  const { addToast } = useToasts();

  const [dark, setDark] = useState(false);
  const [starting_amount, setAmount] = useState("");

  const changeHandler = (e) => {
    setAmount(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (starting_amount.length === 0) {
      addToast("Please enter an amount to bid", {
        appearance: "error",
      });
    }
    console.log(starting_amount);
    setAmount("");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="closeBtn" onClick={() => hideModal()}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div className="modal-header">
          <div className="header">
            <h2 className="modal-title"> {item.name}</h2>
            <div className="category">{item.category}</div>
          </div>

          <BsFillBookmarkHeartFill
            size={35}
            cursor="pointer"
            fill={!dark ? "grey" : "#6c4bd1"}
            onClick={() => {
              setDark((prev) => !prev);
            }}
          />
        </div>

        <div className="modal-body">
          <div className="images">
            <SimpleImageSlider
              className="slider"
              width={500}
              height={300}
              images={item.images}
              showBullets={true}
              showNavs={true}
            />
          </div>

          <div className="item-details">
            <div className="description">{item.description}</div>
            <div className="bid-amount">
              Current Bid: ${item.starting_amount}
            </div>

            <form className="bid-form" onSubmit={submitHandler}>
              <BasicInfo
                type="number"
                step="any"
                min={item.starting_amount + 1}
                default={item.starting_amount + 1}
                name="starting_amount"
                value={starting_amount}
                label="Add your bid"
                changed={changeHandler}
              />
              <span className="inst">
                {" "}
                Your bid must be greater than ${item.starting_amount}
              </span>
              <CustomButton type="submit">Bid Now</CustomButton>
            </form>
          </div>
        </div>

        <div className="btns">
          <CustomButton>Report Item</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
