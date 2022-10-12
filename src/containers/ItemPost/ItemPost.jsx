import React, { useState } from "react";
import axios from "axios";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import useAuthStore from "../../store/auth";
import CustomInputArea from "../../components/CustomInput/CustomInputArea";

const ItemPost = () => {
  const user = useAuthStore((state) => state.user);
  const [classesName, setClasses] = useState({
    classes: ["post"],
  });
  const { classes } = classesName;

  const [formData, setformData] = useState({
    product_name: " ",
    start_bid: " ",
    condition: " ",
    detials: " ",
    catergory: " "
  });
  const { product_name, start_bid, condition, details, catergory } = formData;

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setformData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  if (user) {
    return <Redirect to="/auth" />;
  }

  return (
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
              Starting Bid
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
      </div>
    </div>
  );
};

export default ItemPost;
