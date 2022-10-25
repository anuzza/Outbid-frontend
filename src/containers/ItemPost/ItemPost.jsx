import React, { useState } from "react";
import axios from "../../utils/axios";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import useAuthStore from "../../store/auth";
import { getError } from "../../utils/error";

const ItemPost = () => {
  const user = useAuthStore((state) => state.user);
  const [classesName, setClasses] = useState({
    classes: ["cont"],
  });

  // copied from Auth.jsx for using authStart and setError
  // removed user, as it is declared above
  // removed loading, as it is declared below
  const { setUser, authStart, setError} = useAuthStore(
    ({ setUser, authStart, setError}) => ({
      setUser,
      authStart,
      setError,
    })
  );


  const { addToast } = useToasts();
  const { classes } = classesName;

  const [formData, setformData] = useState({
    product_name: "",
    start_bid: "",
    condition: "",
    details: "",
  });
  const { product_name, start_bid, condition, details } = formData;

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setformData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  // Done(?) Modify code copied from auth.jsx to make handleItemSubmit
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    authStart();
    try {
      const {
        data: { user, item },
      } = await axios.post("/itemPost/post", {
        product_name,
        details,
        condition, 
        start_bid,
      });
    } catch (error) {
      const message = getError(error);
      setError(message);
      addToast(message, {
        appearance: "error",
      });
    }
  };
  

//   await axios.post("/users/login", {
//     email,
//     password,
//   });
//   setUser(user, token);
//   addToast(`Welcome back ${user?.name}!`, { appearance: "success" });
// } 



  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div>
      <p className="tip">
        {classes.includes("s--signup") ? "Sign Up" : "Login"}
      </p>
      <div className={classes.join(" ")}>
        <div className="IteamPost">
          <h2>Create Your Listing Here! </h2>
          <form onSubmit={(e) => handleItemSubmit(e)}>
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
              required
            >
              Details
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
