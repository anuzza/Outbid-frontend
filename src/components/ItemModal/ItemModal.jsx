import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import "./ItemModal.css";
import { RiCloseLine } from "react-icons/ri";
import SimpleImageSlider from "react-simple-image-slider";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useToasts } from "react-toast-notifications";
import { Button, CircularProgress } from "@material-ui/core";
import Moment from "react-moment";
import axios from "../../utils/axios";
import { getError } from "../../utils/error";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const bidIncrement = 10;

const ItemModal = ({ modalHidden, hideModal, item }) => {
  const [bidAmount, setBidAmount] = useState(item.current_bid + bidIncrement);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (!modalHidden) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalHidden]);

  const addBidHandler = async (e) => {
    if (loading) {
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

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="closeBtn" onClick={() => hideModal()}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div className="modal-header">
          <div className="header">
            <span className="modal-title"> {item?.name}</span>
            <div className="modal-category">{item?.category}</div>
          </div>

          <BsFillBookmarkHeartFill
            size={35}
            cursor="pointer"
            fill={!dark ? "grey" : "#6c4bd1"}
            onClick={() => {
              setDark((prev) => !prev);
            }}
          />
        </div>

        <div className="modal-body">
          <div className="images">
            <SimpleImageSlider
              className="slider"
              width={500}
              height={300}
              images={item.images}
              showBullets={true}
              showNavs={true}
            />
          </div>

          <div className="item-details">
            <span className="bid-amount">${item?.current_bid}</span>
            <span className="inst">Starting Bid (${item.starting_amount})</span>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
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
                margin: 20,
                backgroundColor: "#6c4bd1",
                color: "#fff",
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
                <Moment format="M/D/YYYY h:mm A z" className="value">
                  {item?.createdAt}
                </Moment>
              </div>
              <div className="row">
                <span className="key">Ending At </span>
                <Moment format="YYYY/MM/DD h:mm A z" className="value">
                  {item?.createdAt}
                </Moment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
