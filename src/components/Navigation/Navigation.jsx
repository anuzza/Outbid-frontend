import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthButton from "../AuthButton/AuthButton";
import "./Navigation.css";
import useAuthStore from "../../store/auth";

const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const history = useHistory();
  return (
    <header className="main-header">
      <h1 onClick={() => history.push("/")} className="logo">
        OutBid
      </h1>
      

      {user ? (
        <Link to="/Post">
          <AuthButton>List Iteam</AuthButton>
        </Link>
      ) : (
        <Link to="/auth"></Link>
      )}


      {!user ? (
        <Link to="/auth">
          <AuthButton>Sign In</AuthButton>
        </Link>
      ) : (
        <Link to="/logout">
          <AuthButton signout>Sign Out</AuthButton>
        </Link>
      )}
    </header>
  );
};

export default Navigation;
