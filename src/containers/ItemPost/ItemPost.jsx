import React, { useState } from "react";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useHistory } from "react-router-dom";
import BasicInfo from "./BasicInfo/Basic";
import Upload from "./Image/Upload";
import { useToasts } from "react-toast-notifications";
import axios from "../../utils/axios";
import { getError } from "../../utils/error";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";

const today = new Date();
const ItemPost = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [basicState, setBasicState] = useState({
    name: "",
    category: "",
    description: "",
    starting_amount: 0,
    condition: "NEW",
  });
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [end_date, setEndDate] = useState(null);

  const { name, description, category, starting_amount, condition } =
    basicState;

  const changeBasicState = (e) => {
    setBasicState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkErrors = () => {
    return (
      name === "" ||
      category === "" ||
      description === "" ||
      starting_amount <= 0 ||
      !end_date
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (checkErrors()) {
      addToast("Please fill out all the required fields", {
        appearance: "error",
      });
      return;
    }

    if (end_date.getTime() <= today.getTime()) {
      addToast(
        "The end date for the auction cannot be today!! Please select a later end date!",
        {
          appearance: "error",
        }
      );
      return;
    }

    if (images.length === 0) {
      addToast("You must upload at least one picture of the item", {
        appearance: "error",
      });
      return;
    }

    const postBody = {
      ...basicState,
      end_date,
    };

    const formData = new FormData();

    Object.keys(postBody).forEach((key) => {
      formData.append(key, postBody[key]);
    });

    images.forEach((image) => {
      formData.append("files", image.file);
    });

    setLoading(true);
    try {
      await axios.post(`/items/`, formData);
      setLoading(false);
      history.push("/my-items");
      addToast("Sucessfully listed the item", { appearance: "success" });
    } catch (error) {
      addToast(getError(error), {
        appearance: "error",
      });
      setLoading(false);
    }
  };

  return (
    <main role="main" className="main-container">
      <div className="main-wrap">
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <h1 className="main-header-title">Welcome to OutBid!</h1>
          <div className="non-block"></div>
          <div>
            <section className="basic-info-block">
              <h3>Tell us about the item</h3>
              <div className="family-member">
                <BasicInfo
                  type="text"
                  name="name"
                  label="Item Name"
                  value={name}
                  changed={changeBasicState}
                />
                <BasicInfo
                  type="text"
                  name="category"
                  label="Category"
                  value={category}
                  changed={changeBasicState}
                />

                <BasicInfo
                  type="number"
                  step="any"
                  min="0.0"
                  name="starting_amount"
                  label="Starting Price"
                  value={starting_amount}
                  changed={changeBasicState}
                />

                <div className="condition-dropdown">
                  <label htmlFor="condition">Item Condition</label>
                  <select
                    value={condition}
                    name="condition"
                    onChange={changeBasicState}
                  >
                    <option value="NEW">NEW</option>
                    <option value="USED">USED</option>
                  </select>
                  <i className="bar"></i>
                </div>

                <Space className="date-picker" direction="vertical" size={12}>
                  <label htmlFor="end_date">Auction Ending Date</label>
                  <DatePicker
                    name="end_date"
                    showTime
                    disabledDate={(current) =>
                      current && current < today.getTime()
                    }
                    onChange={(value) => setEndDate(value.toDate())}
                    onOk={(value) => setEndDate(value.toDate())}
                  />
                  <i className="bar"></i>
                </Space>
              </div>
            </section>
            <section className="basic-info-block">
              <h3>Tell us more</h3>

              <BasicInfo
                textarea
                type="text"
                name="description"
                label="Description"
                value={description}
                changed={changeBasicState}
              />
            </section>
          </div>

          <Upload images={images} setImages={setImages} />
          <CustomButton edit type="submit" disabled={loading}>
            {loading ? "Loading..." : "List Item"}
          </CustomButton>
        </form>
      </div>
    </main>
  );
};

export default ItemPost;
