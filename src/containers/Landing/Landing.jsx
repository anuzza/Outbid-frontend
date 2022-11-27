import React, { useState, useEffect } from "react";
import "./Landing.css";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";
import { useHistory } from "react-router-dom";

const Landing = ({ setItem }) => {
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
        const { data } = await axios.get("/items/");
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
      <SearchContainer className="search" />

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

export default Landing;
