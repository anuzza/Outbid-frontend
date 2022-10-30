import React, { useState } from "react";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Redirect } from "react-router-dom";
import useAuthStore from "../../store/auth";
import BasicInfo from "./BasicInfo/Basic";
import UploadImage from "./Image/Image";

const ItemPost = () => {
  const user = useAuthStore((state) => state.user);

  const [basicState, setBasicState] = useState({
    name: "",
    description: "",
    starting_amount: "",
  });

  const [condition, setCondition] = useState({
    Used: false,
    New: false,
  });

  const { Used, New } = condition;

  const [active, setActive] = useState(false);

  const { name, description, starting_amount } = basicState;

  const [image, setImage] = useState([]);

  const [imageSrc, setImageSrc] = useState([]);

  const changeCondition = (e) => {
    setCondition((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const changeBasicState = (e) => {
    setBasicState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  if (!user) {
    return <Redirect to="/auth" />;
  }

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
                  <label for="condition">Item Condition</label>
                  <select name="condition" id="condition">
                    <option value="NEW">NEW</option>
                    <option value="USED">USED</option>
                  </select>
                </div>
              </div>
            </section>
          </div> 

          <UploadImage
            setImageSrc={setImageSrc}
            image={imageSrc}
            setImage={setImage}
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
