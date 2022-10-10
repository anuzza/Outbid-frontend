import React from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import useAuthStore from "../../store/auth";
import axios from "../../utils/axios";
import { getError } from "../../utils/error";

const Logout = () => {
  const { signout, token } = useAuthStore(({ signout, token }) => ({
    signout,
    token,
  }));
  const { addToast } = useToasts();
  useEffect(() => {
    let isCancelled = false;

    const signoutUser = async (token) => {
      try {
        await axios.delete("/users/logout");
        signout();
        addToast("You have been logged out! Please login again.", {
          appearance: "warning",
        });
      } catch (error) {
        const msg = getError(error);
        addToast(msg, { appearance: "error" });
      }
    };

    if (!isCancelled) {
      signoutUser(token);
    }

    return () => {
      isCancelled = true;
    };
  }, [signout, addToast, token]);
  return <Redirect to="/" />;
};

export default Logout;
