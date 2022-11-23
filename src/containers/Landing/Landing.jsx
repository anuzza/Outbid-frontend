import React, { useState, useEffect } from "react";
import "./Landing.css";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";
import ItemModal from "../../components/ItemModal/ItemModal";

const Landing = () => {
  const [state, setState] = useState({
    items: [],
    loading: true,
    error: {},
  });

  const [hidden, setHidden] = useState(true);

  const { items, loading } = state;

  const hideModal = (e) => {
    setHidden(true);
    console.log(hidden);
  };

  const showModal = (e) => {
    setHidden(false);
    console.log(hidden);
  };

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
      <SearchContainer className="search" />
      {loading && <Spinner />}
      {items.map((item) => (
        <ItemCard key={item._id} item={item} showModal={showModal}></ItemCard>
      ))}
      {!hidden && <ItemModal hideModal={hideModal} />}
    </div>
  );
};

export default Landing;
