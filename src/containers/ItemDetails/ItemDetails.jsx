import "./ItemDetails.css";
import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import SimpleImageSlider from "react-simple-image-slider";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useToasts } from "react-toast-notifications";
import { Button, CircularProgress } from "@material-ui/core";
import Moment from "react-moment";
import axios from "../../utils/axios";
import { getError } from "../../utils/error";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import useAuthStore from "../../store/auth";
import { loadUser } from "../../hooks/loadUser";
import { hasItemExpired } from "../../utils/checkItemExpiry";

const { Title } = Typography;

const bidIncrement = 10;

const ItemDetails = () => {
  const { setUser, setError, user } = useAuthStore(
    ({ setUser, setError, user }) => ({
      setUser,
      setError,
      user,
    })
  );

  const [state, setState] = useState({
    item: null,
    itemLoading: true,
  });

  const { item, itemLoading } = state;
  const [bidAmount, setBidAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const { id } = useParams();
  const [dark, setDark] = useState(
    user && user?.savedItems.find(({ item }) => item._id === id)
  );

  const itemExpired = hasItemExpired(item);

  useEffect(() => {
    let isCancelled = false;
    const getItembyID = async (id) => {
      try {
        const { data } = await axios.get(`/items/${id}`);
        setState((prevState) => {
          return {
            ...prevState,
            item: data,
            itemLoading: false,
          };
        });
        setBidAmount(data?.current_bid + bidIncrement);
      } catch (error) {
        addToast(getError(error), {
          appearance: "error",
          autoDismiss: false,
        });
        setState({ itemLoading: false, item: null });
      }
    };

    if (!isCancelled) {
      getItembyID(id);
    }
    return () => {
      isCancelled = true;
    };
  }, [addToast, id]);

  const addBidHandler = async (e) => {
    if (loading) {
      return;
    }

    if (itemExpired) {
      addToast("This auction has already been closed!", {
        appearance: "warning",
      });
      return;
    }

    if (!user) {
      history.push("/auth");
      addToast("Please login to bid on any items!", {
        appearance: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("/bids", {
        amount: bidAmount,
        itemId: item?._id,
      });
      addToast("Bid Succesfully Added!", {
        appearance: "success",
      });
      history.push("/my-bids");
    } catch (error) {
      addToast(getError(error), {
        appearance: "error",
      });
    }
    setLoading(false);
  };

  const onDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`/items/${id}`);
      addToast("Item Succesfully Deleted!", {
        appearance: "success",
      });
      history.push("/my-items");
    } catch (error) {
      addToast(getError(error), {
        appearance: "error",
      });
    }
  };

  const onToggleBookmark = async () => {
    try {
      await axios.post(`/save-item/${id}`);
      setDark((prev) => !prev);
    } catch (error) {
      addToast(getError(error), {
        appearance: "error",
      });
    }
    loadUser(setUser, setError);
  };

  return (
    <>
      {itemExpired && (
        <div className="alert-box">
          <span> xxxx Auction has already ended!!! xxxx</span>
        </div>
      )}

      <div className="item-wrapper">
        {itemLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="item-content">
              <div className="modal-header">
                <div className="header">
                  <span className="modal-title"> {item?.name}</span>
                  <div className="modal-category">{item?.category}</div>
                </div>

                <div className="item-details-action-buttons">
                  {item &&
                    user &&
                    item?.creator.toString() !== user?._id.toString() && (
                      <BsFillBookmarkHeartFill
                        size={30}
                        cursor="pointer"
                        fill={!dark ? "grey" : "#6c4bd1"}
                        onClick={onToggleBookmark}
                      />
                    )}
                  {item?.creator.toString() === user?._id.toString() &&
                    !itemExpired && (
                      <FiTrash2
                        size={30}
                        color="#ff6666"
                        cursor="pointer"
                        onClick={onDelete}
                      />
                    )}
                </div>
              </div>

              <div className="images">
                <SimpleImageSlider
                  className="slider"
                  width={800}
                  height={500}
                  images={item ? item.images : []}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
              <div className="item-summary">
                <span className="item-des">Description</span>
                <span>Condition: {item?.condition}</span>
                <span>{item?.description}</span>
              </div>
            </div>

            <div className="modal-body">
              <div className="item-details">
                <span className="bid-amount">${item?.current_bid}</span>
                <span className="inst">
                  Starting Bid (${item?.starting_amount})
                </span>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 40,
                  }}
                >
                  <MinusCircleTwoTone
                    twoToneColor={
                      bidAmount <= item?.current_bid + bidIncrement
                        ? "#ddd"
                        : "#6c4bd1"
                    }
                    style={{
                      fontSize: 40,
                      cursor:
                        bidAmount <= item?.current_bid + bidIncrement
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={() =>
                      bidAmount <= item?.current_bid + bidIncrement
                        ? setBidAmount(bidAmount)
                        : setBidAmount(bidAmount - bidIncrement)
                    }
                  />
                  <Title
                    style={{
                      marginRight: 20,
                      marginLeft: 20,
                      marginTop: 5,
                      color: "#787886",
                    }}
                    level={2}
                  >
                    $ {bidAmount}
                  </Title>
                  <PlusCircleTwoTone
                    onClick={() => setBidAmount(bidAmount + bidIncrement)}
                    twoToneColor={"#6c4bd1"}
                    style={{ fontSize: 40, color: "#6c4bd1" }}
                  />
                </div>
                <span
                  style={{
                    marginTop: 10,
                  }}
                  className="inst"
                >
                  Bid must be incremented by $10!
                </span>

                <Button
                  onClick={addBidHandler}
                  variant="contained"
                  style={{
                    margin: 25,
                    backgroundColor: itemExpired ? "grey" : "#6c4bd1",
                    color: "#fff",
                    cursor: itemExpired ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      style={{
                        color: "#fff",
                      }}
                      size={14}
                    />
                  ) : (
                    "Place Bid"
                  )}
                </Button>

                <div className="row-cols">
                  <div className="row">
                    <span className="key">Posted At </span>
                    <Moment
                      format="YYYY/MM/DD h:mm A z"
                      local
                      className="value"
                    >
                      {item?.created_at}
                    </Moment>
                  </div>
                  <div className="row">
                    <span
                      className="key"
                      style={{
                        color: itemExpired ? "#ff6666" : "#000",
                      }}
                    >
                      {itemExpired ? "Ended At:" : "Ending At:"}{" "}
                    </span>
                    <Moment
                      format="YYYY/MM/DD h:mm A z"
                      className="value"
                      local
                      style={{
                        color: itemExpired ? "#ff6666" : "#000",
                      }}
                    >
                      {item?.end_date}
                    </Moment>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ItemDetails;
