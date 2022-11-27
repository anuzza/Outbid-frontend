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
  const [selectedItem, setSelectedItem] = useState(null);
  const [hidden, setHidden] = useState(true);
  const { items, loading } = state;

  const hideModal = (e) => {
    setHidden(true);
  };

  const showModal = (selected) => {
    setSelectedItem(selected);
    setHidden(false);
  };

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
      {!hidden && (
        <ItemModal
          modalHidden={hidden}
          item={selectedItem}
          hideModal={hideModal}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className="card-wrapper">
          {items.map((item) => (
            <ItemCard
              modalHidden={hidden}
              key={item._id}
              item={item}
              onClick={showModal}
            ></ItemCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Landing;
