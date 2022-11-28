import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthStore from "../../store/auth";

const UserRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useAuthStore(({ user, token }) => ({
    user,
    token,
  }));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
          return <Redirect to="/auth" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default UserRoute;
