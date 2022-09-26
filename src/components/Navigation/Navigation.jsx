import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthButton from "../authButton/authButton";
import "./Navigation.css";

const Navigation = () => {
  const history = useHistory();
  return (
    <header className="main-header">
      <h1 onClick={() => history.push("/")} className="logo">
        OutBid
      </h1>

      <Link to="/auth">
        <AuthButton>Sign In</AuthButton>
      </Link>

      <Link to="/">
        <AuthButton signout>Sign Out</AuthButton>
      </Link>
    </header>
  );
};

export default Navigation;
