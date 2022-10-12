import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthButton from "../AuthButton/AuthButton";
import "./Navigation.css";
import useAuthStore from "../../store/auth";
import NavItems from "./NavItems/NavItems";

const Navigation = () => {
  const user = useAuthStore((state) => state.user);
  const history = useHistory();
  return (
    <header className="main-header">
      <h1 onClick={() => history.push("/")} className="logo">
        OutBid
      </h1>

      <NavItems user={user} />

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
