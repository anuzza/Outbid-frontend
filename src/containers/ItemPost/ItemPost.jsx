import React, { useState } from "react";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Redirect } from "react-router-dom";

import BasicInfo from "./BasicInfo/Basic";
import Upload from "./Image/Upload";
import { useToasts } from "react-toast-notifications";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../utils/axios";
import { getError } from "../../utils/error";

const ItemPost = () => {
  
  const { addToast } = useToasts();

  const [basicState, setBasicState] = useState({
    name: "",
    description: "",
    starting_amount: "",
  });

  const [loading, setLoading] = useState(false);

  const [condition, setCondition] = useState("NEW");

  const [images, setImages] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);

  const { name, description, starting_amount } = basicState;

  const changeCondition = (e) => {
    setCondition((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeBasicState = (e) => {
    return setBasicState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  const checkErrors = () => {
    return name === "" && description === "" && starting_amount === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (checkErrors()) {
      addToast("Please fill out all the required fields", {
        appearance: "error",
      });
      return;
    } else if (images.length === 0) {
      addToast("You must upload at least one picture of the item", {
        appearance: "error",
      });
      return;
    }

    try {
      const { data } = await axios.post("/items/", {
        name,
        description,
        starting_amount,
        condition,
      });
      console.log(data);
      addToast("Sucessfully listed the item", { appearance: "success" });
    } catch (error) {
      console.log(error.response);
      let message = getError(error);
      addToast(message, {
        appearance: "error",
      });
    }
  };

  return (
    <main role="main" className="main-container">
      <div className="main-wrap">
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <h1 className="main-header-title">Welcome to OutBid!</h1>
          <div className="non-block"></div>
          <div>
            <section className="basic-info-block">
              <h3>Tell us about the item</h3>
              <div className="family-member">
                <BasicInfo
                  type="text"
                  name="name"
                  label="Item Name"
                  value={name}
                  changed={changeBasicState}
                />
                <BasicInfo
                  type="text"
                  name="description"
                  label="Description/Category"
                  value={description}
                  changed={changeBasicState}
                />
                <BasicInfo
                  type="number"
                  step="any"
                  min="0.0"
                  name="starting_amount"
                  label="Starting Price"
                  value={starting_amount}
                  changed={changeBasicState}
                />

                <div className="dropdown">
                  <label htmlFor="condition">Item Condition</label>
                  <select
                    value={condition}
                    name="condition"
                    id="condition"
                    onChange={changeCondition}
                  >
                    <option value="NEW">NEW</option>
                    <option value="USED">USED</option>
                  </select>
                </div>
              </div>
            </section>
          </div>

          <Upload
            images={images}
            setImages={setImages}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
          <CustomButton edit type="submit">
            List Item
          </CustomButton>
        </form>
      </div>
    </main>
  );
};

export default ItemPost;
