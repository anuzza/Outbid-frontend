import React, { useState, useEffect } from "react";
import "./Landing.css";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import Items from "../../components/Items/Items";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";

const Landing = () => {
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
        setState({
          ...state,
          items: data,
          loading: false,
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
  }, [state]);

  return (
    <div className="wrapper">
      <SearchContainer />
      {loading ? <Spinner /> : <Items items={items} />}
    </div>
  );
};

export default Landing;
