import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";

const SavedItems = () => {
  const history = useHistory();
  const [state, setState] = useState({
    items: [],
    loading: true,
  });

  const { items, loading } = state;

  useEffect(() => {
    let isCancelled = false;
    const getItems = async () => {
      try {
        const { data } = await axios.get("users/saved-items");
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
        <>
          <div className="items-header">
            <span className="items-header-title">Saved Items</span>
            <span className="items-header-caption">
              These are all items bookmarked by you!
            </span>
          </div>
          <div className="card-wrapper">
            {items?.length === 0 ? (
              <span className="placeholder">
                You haven't saved any items yet!!
              </span>
            ) : (
              items.map(({ _id, item }) => (
                <ItemCard
                  key={_id}
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

export default SavedItems;
