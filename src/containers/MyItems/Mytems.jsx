import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./MyItems.css";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";
import { getError } from "../../utils/error";
import { useToasts } from "react-toast-notifications";
import useAuthStore from "../../store/auth";

const MyItems = () => {
  const { user } = useAuthStore(({ user }) => ({
    user,
  }));

  const history = useHistory();
  const [state, setState] = useState({
    items: [],
    loading: true,
  });
  const { addToast } = useToasts;

  const { items, loading } = state;

  useEffect(() => {
    let isCancelled = false;
    const getItems = async () => {
      try {
        const { data } = await axios.get("users/items");
        setState((prevState) => {
          return {
            ...prevState,
            items: data,
            loading: false,
          };
        });
      } catch (error) {
        setState({ loading: false, items: [] });
        addToast(getError(error), {
          appearance: "error",
        });
      }
    };
    if (!isCancelled) {
      getItems();
    }
    return () => {
      isCancelled = true;
    };
  }, [addToast]);

  return (
    <div className="wrapper">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="items-header">
            <span className="items-header-title">My Items</span>
            <span className="items-header-caption">
              These are all items listed by you!
            </span>
          </div>
          <div className="card-wrapper">
            {items?.length === 0 ? (
              <span className="placeholder">
                You haven't created any items yet!!
              </span>
            ) : (
              items.map((item) => (
                <ItemCard
                  user={user}
                  key={item._id}
                  item={item}
                  onClick={() => {
                    history.push(`/item-details/${item._id}`);
                  }}
                ></ItemCard>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyItems;
