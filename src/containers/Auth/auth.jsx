import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const Auth = ({ setUser, user }) => {
  const { addToast } = useToasts();
  const [classesName, setClasses] = useState({
    classes: ["cont"],
  });
  const { classes } = classesName;

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setformData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { user, token },
      } = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      setLoading(false);
      setUser(user);
      addToast(`Welcome back ${user?.name}!`, { appearance: "success" });

      localStorage.setItem("token", token);
    } catch (error) {
      setLoading(false);
      addToast(error.response.data.error, { appearance: "error" });
      //console.log(error.response.data);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { user, token },
      } = await axios.post("http://localhost:8080/users/", {
        name,
        email,
        password,
      });
      setLoading(false);
      setUser(user);
      addToast(`Welcome ${user?.name}!`, { appearance: "success" });

      localStorage.setItem("token", token);
    } catch (error) {
      setLoading(false);
      addToast(error.response.data.error, { appearance: "error" });

      // alert(error.response.data.error);

      //console.log(error.response.data);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <p className="tip">
        {classes.includes("s--signup") ? "Sign Up" : "Login"}
      </p>
      <div className={classes.join(" ")}>
        <div className="form sign-in-box">
          <h2>Welcome Back! </h2>
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
