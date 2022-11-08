import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthStore from "../../store/auth";

const UserRoute = ({ component: Component, ...rest }) => {
  const user = useAuthStore((state) => state.user);
  //   if (!user) {
  //     return <Redirect to="/auth" />;
  //   }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to="/auth" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default UserRoute;
