import React from "react";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { useToasts } from "react-toast-notifications";
import axios from "../../utils/axios";
import { getError } from "../../utils/error";

const StripeButton = ({ item, setState }) => {
  const publishableKey = "pk_test_80h0huWPQFW7WhyBvI6jgZrN00RzZI4H51";
  const history = useHistory();
  const { addToast } = useToasts();

  const onToken = async (token) => {
    try {
      await axios.post(`/items/markAsSold/${item?._id}`);
      setState((prevState) => ({
        ...prevState,
        bids: prevState.bids.map((originalItem) => {
          if (originalItem.item._id.toString() === item._id.toString()) {
            return {
              ...originalItem,
              item: {
                ...originalItem.item,
                sold: true,
              },
            };
          }
          return originalItem;
        }),
      }));
      history.push("/my-bids");
      addToast("Your payment was succesful!", {
        appearance: "success",
      });
    } catch (error) {
      addToast(getError(error), {
        appearance: "error",
      });
    }
  };

  return (
    <StripeCheckout
      label={"Pay Now"}
      name={item?.name}
      billingAddress
      shippingAddress
      description={`Your total is $${item?.current_bid}`}
      amount={item?.current_bid}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
