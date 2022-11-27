import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./MyItems.css";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";

const MyItems = ({setItem}) => {
  const history = useHistory();
  const [state, setState] = useState({
    items: [],
    loading: true,
    error: {},
  });

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
        setState({ error: error, loading: false, items: [] });
      }
    };
    if (!isCancelled) {
      getItems();
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="wrapper">
      {loading ? (
        <Spinner />
      ) : (
        <div className="card-wrapper">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onClick={() => {
                history.push(`/item-details/${item._id}`);
                setItem(item);
              }}
            ></ItemCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;
