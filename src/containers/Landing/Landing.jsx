import React, { useState, useEffect } from "react";
import "./Landing.css";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getError } from "../../utils/error";
import useAuthStore from "../../store/auth";

const Landing = () => {
  const history = useHistory();
  const user = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const [state, setState] = useState({
    items: [],
    loading: true,
  });
  const { addToast } = useToasts();

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

  const filteredItems = items.filter(
    ({ name, category }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wrapper">
      <SearchContainer
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="search"
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className="card-wrapper">
          {filteredItems.map(
            (item) =>
              item?.creator.toString() !== user?._id.toString() && (
                <ItemCard
                  key={item._id}
                  item={item}
                  onClick={(selected) => {
                    history.push(`/item-details/${selected._id}`);
                  }}
                ></ItemCard>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Landing;
