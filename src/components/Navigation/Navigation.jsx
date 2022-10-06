import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import AuthButton from "../AuthButton/AuthButton";
import "./Navigation.css";

const Navigation = ({ user, setUser }) => {
  const history = useHistory();
  return (
    <header className="main-header">
      <h1 onClick={() => history.push("/")} className="logo">
        OutBid
      </h1>
      <Link
        onClick={() => {
          if (!user) {
            return <Redirect to="/auth" />;
          }
        }}
      >
        <AuthButton>Post Item</AuthButton>
      </Link>

      {!user ? (
        <Link to="/auth">
          <AuthButton>Sign In</AuthButton>
        </Link>
      ) : (
        <Link to="/s">
          <AuthButton
            signout
            onClick={() => {
              setUser(null);
            }}
          >
            Sign Out
          </AuthButton>
        </Link>
      )}
    </header>
  );
};

export default Navigation;
