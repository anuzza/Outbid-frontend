import React, { useState } from "react";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Redirect } from "react-router-dom";
import BasicInfo from "./BasicInfo/Basic";
import Upload from "./Image/Upload";
import { useToasts } from "react-toast-notifications";
<<<<<<< HEAD
import useAuthStore from "../../store/auth";
import CustomInputArea from "../../components/CustomInput/CustomInputArea";

const ItemPost = () => {
  const user = useAuthStore((state) => state.user);
  const [classesName, setClasses] = useState({
    classes: ["post"],
  });
  const { classes } = classesName;
=======
import Spinner from "../../components/Spinner/Spinner";

const ItemPost = () => {
  const { addToast } = useToasts();
>>>>>>> main

  const [basicState, setBasicState] = useState({
    name: "",
    description: "",
    starting_amount: "",
  });
  const [loading, setLoading] = useState(false);

  const [condition, setCondition] = useState("New");

  const [images, setImages] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);

  const { name, description, starting_amount } = basicState;

  const changeCondition = (e) => {
    setCondition((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

<<<<<<< HEAD
  if (user) {
    return <Redirect to="/auth" />;
=======
  const changeBasicState = (e) => {
    return setBasicState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return <Spinner />;
>>>>>>> main
  }

  const checkErrors = () => {
    return name !== "" && description !== "" && starting_amount !== 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!checkErrors()) {
      addToast("Please fill out all the required fields", {
        appearance: "error",
      });
    } else if (images.length === 0) {
      addToast("You must upload at least one picture of the item", {
        appearance: "error",
      });
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <p className="tip">
      <h3>Create Your Listing Here! </h3>
      </p>
      <div className={classes.join(" ")}>
        <div className="ItemPost">
          <br/>
          <form onSubmit={(e) => e}>
            <CustomInput
              onChange={(e) => handleFormChange(e)}
              value={product_name}
              type="product_name"
              name="product_name"
              required
            >
              Product Name
            </CustomInput>
            <CustomInput
              onChange={(e) => handleFormChange(e)}
              value={catergory}
              type="catergory"
              name="catergory"
              required
            >
             Catergory
            </CustomInput>
            <CustomInput
              onChange={(e) => handleFormChange(e)}
              value={start_bid}
              type="start_bid"
              name="start_bid"
              required
            >
              Starting Bid
            </CustomInput>
            <CustomInput
              onChange={(e) => handleFormChange(e)}
              value={condition}
              type="condition"
              name="condition"
              required
            >
              Condition
            </CustomInput>
            <CustomInputArea
              onChange={(e) => handleFormChange(e)}
              value={details}
              type="details"
              name="details"
              optional
            >
              Details
            </CustomInputArea>
            <CustomButton type="submit">
              {loading ? (
                <Spinner
                  margin="2px auto"
                  width="2em"
                  height="2em"
                  background="#13100a"
                />
              ) : (
                "Post"
              )}
            </CustomButton>
            <br/>
          </form>
        </div>
=======
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
>>>>>>> main
      </div>
    </main>
  );
};

export default ItemPost;
