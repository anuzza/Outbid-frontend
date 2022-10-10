import React from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import useAuthStore from "../../store/auth";
import { axios } from "axios";

const signoutUser = async (token) => {
  try {
    await axios.delete("http://localhost:8080/users/logout", {
      Headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {}
};

const Logout = () => {
  const { signout, token } = useAuthStore(({ signout, token }) => ({
    signout,
    token,
  }));
  const { addToast } = useToasts();
  useEffect(() => {
    signoutUser(token)
      .then(() => {
        signout();
        addToast("You have been logged out! Please login again.", {
          appearance: "warning",
        });
      })
      .catch((error) => {
        const msg = error.response?.data?.error || error.message;
        addToast(msg, { appearance: "error" });
      });
  }, [signout, addToast, token]);
  return <Redirect to="/" />;
};

export default Logout;
