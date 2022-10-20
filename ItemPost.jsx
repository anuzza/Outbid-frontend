import React, { useState } from "react";
import axios from "axios";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import useAuthStore from "../../store/auth";

const ItemPost = () => {
  const user = useAuthStore((state) => state.user);
  const [classesName, setClasses] = useState({
    classes: ["cont"],
  });
  const { classes } = classesName;

  const [formData, setformData] = useState({
    product_name: " ",
    start_bid: " ",
    condition: " ",
    detials: " ",
    // image_post: new Array(),

  });
  const { product_name, start_bid, condition, details, image_post } = formData;

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setformData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  if (!user) {
    return <Redirect to="/auth" />;
  }
  // onImageChange = event => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     this.setState({
  //       image_post: URL.createObjectURL(img)
  //     });
  //   };    
  return (
    <div>
      <p className="tip">
        {classes.includes("s--signup") ? "Sign Up" : "Login"}
      </p>
      <div className={classes.join(" ")}>
        <div className="IteamPost">
          <h2>Create Your Listing Here! </h2>
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
            <CustomInput
              onChange={(e) => handleFormChange(e)}
              value={details}
              type="details"
              name="details"
              optional
            >
              Details
            {/* </CustomInput>
            <CustomButton
            type="file" 
            name="image_post"
            onChange={this.onImageChange}
            accept="image/jpeg, image/png, image/jpg">
            <div id="display-image"></div>
  Image Post */}
            </CustomInput>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemPost;
