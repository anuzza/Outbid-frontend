import React, { useState, useEffect } from "react";
import Card from "../../../components/AuthCard/Card";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Wrapper from "../../../components/Wrapper/Wrapper";

const Login = ({ error, loading, login, clearErrors, history }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { email, password } = formData;

  const handleFormChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <Wrapper class="login-body card">
      <Card class="login-body card" type="signin">
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => handleFormChange(e)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleFormChange(e)}
            value={password}
          />

          <Button type="submit">Log In</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default Login;
