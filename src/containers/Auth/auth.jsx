import React, { useState } from "react";
import "./auth.css";
import CustomButton from "../../components/CustomButton/customButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Spinner from "../../components/Spinner/Spinner";
const Auth = ({ loading }) => {
  const [classesName, setClasses] = useState({
    classes: ["cont"],
  });
  const { classes } = classesName;

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const { name, email, password, address } = formData;

  const handleFormChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearFormValues = () => {
    setformData({
      name: "",
      email: "",
      password: "",
      address: "",
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <p className="tip">
        {classes.includes("s--signup") ? "Sign Up" : "Login"}
      </p>
      <div className={classes.join(" ")}>
        <div className="form sign-in-box">
          <h2>Welcome Back! </h2>
          <h3>We've missed you</h3>
          <form onSubmit={(e) => handleLoginSubmit(e)}>
            <CustomInput
              onChange={(e) => handleFormChange(e)}
              value={email}
              type="email"
              name="email"
              required
            >
              Email
            </CustomInput>
            <CustomInput
              onChange={(e) => handleFormChange(e)}
              value={password}
              type="password"
              name="password"
              required
            >
              Password
            </CustomInput>
            <p className="forgot-pass">Forgot password?</p>
            <CustomButton type="submit">
              {loading ? (
                <Spinner
                  margin="2px auto"
                  width="2em"
                  height="2em"
                  background="#13100a"
                />
              ) : (
                "Sign in"
              )}
            </CustomButton>
          </form>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover great deals and offers!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of the OutBiders?</h2>
              <p>If you already have an account, please sign in.</p>
            </div>
            <div
              className="img__btn"
              onClick={() => {
                clearFormValues();
                setClasses({
                  classes: classes.includes("s--signup")
                    ? ["cont"]
                    : [...classes, "s--signup"],
                });
              }}
            >
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          <div className="form sign-up-box">
            <h2>Join the community</h2>
            <form onSubmit={(e) => handleSignupSubmit(e)}>
              <CustomInput
                onChange={(e) => handleFormChange(e)}
                value={name}
                type="text"
                name="name"
                required
              >
                Name
              </CustomInput>
              <CustomInput
                onChange={(e) => handleFormChange(e)}
                value={address}
                type="text"
                name="name"
                required
              >
                Full Address
              </CustomInput>
              <CustomInput
                onChange={(e) => handleFormChange(e)}
                value={email}
                type="email"
                name="email"
                required
              >
                Email
              </CustomInput>
              <CustomInput
                onChange={(e) => handleFormChange(e)}
                value={password}
                type="password"
                name="password"
                required
              >
                Password
              </CustomInput>
              <CustomButton type="submit">
                {loading ? (
                  <Spinner
                    margin="2px auto"
                    width="2em"
                    height="2em"
                    background="inherit"
                    color="white"
                  />
                ) : (
                  "Sign Up"
                )}
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
