import React, { useState } from "react";
import "./ItemPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Redirect } from "react-router-dom";
import useAuthStore from "../../store/auth";
import BasicInfo from "./BasicInfo/Basic";
import CheckBox from "./Checkbox/Checkbox";
import UploadImage from "./Image/Image";
import CustomInput from "../../components/CustomInput/CustomInput";
import DatePicker from "react-datepicker";
import moment from "react-moment";

const ItemPost = () => {
  const user = useAuthStore((state) => state.user);

  const [basicState, setBasicState] = useState({
    name: "",
    description: "",
    starting_amount: "",
  });

  const [time, setTime] = useState(0);

  const [allergy, setAllergy] = useState({
    glutenFree: false,
    vegan: false,
    vegetarian: false,
    dairyFree: false,
  });

  const { glutenFree, vegan, vegetarian, dairyFree } = allergy;

  const { name, description, starting_amount } = basicState;

  const changeBasicState = (e) => {
    if (
      (e.target.name === "carbs" ||
        e.target.name === "cost" ||
        e.target.name === "protein" ||
        e.target.name === "fat") &&
      e.target.value !== ""
    ) {
      return;
    }

    if (e.target.name === "calories" && e.target.value !== "") {
      return;
    }
    return setBasicState({
      ...basicState,
      [e.target.name]: e.target.value + "",
    });
  };

  const changeAllergyState = (e) => {
    return setAllergy({
      ...allergy,
      [e.target.name]: e.target.checked,
    });
  };

  const changeTimeState = (e) => {
    return setTime(e.target.checked ? e.target.value : 0);
  };
  const [ingredients, setIngredients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  if (!user) {
    return <Redirect to="/auth" />;
  }

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
                  changed={changeBasicState}
                  value={name}
                />
                <BasicInfo
                  type="text"
                  name="description"
                  label="Description/Category"
                  changed={changeBasicState}
                  value={description}
                />
                <BasicInfo
                  type="number"
                  step="any"
                  min="0.0"
                  name="starting_amount"
                  label="Starting Price"
                  changed={changeBasicState}
                  value={starting_amount}
                />
                <BasicInfo
                  type="date"
                  step="any"
                  name="starting_amount"
                  label="Bid Deadline"
                  changed={changeBasicState}
                  value={starting_amount}
                />
                <DatePicker selected={new Date()} minDate={moment().toDate()} />
              </div>
            </section>
          </div>

          <div>
            <section className="basic-info-block">
              <h3>What is the condition of the item?</h3>

              <div className="form-group-wrap-2col">
                <CheckBox
                  allergy={glutenFree}
                  changed={changeAllergyState}
                  label="USED"
                  name="USED"
                />
                <CheckBox
                  allergy={vegan}
                  changed={changeAllergyState}
                  label="NEW"
                  name="NEW"
                />
              </div>
            </section>
          </div>

          <div>
            <section className="basic-info-block">
              <h3>When will the bid end?</h3>

              <div className="form-group-wrap-2col">
                <CheckBox
                  allergy={glutenFree}
                  changed={changeAllergyState}
                  label="USED"
                  name="USED"
                />
                <CheckBox
                  allergy={vegan}
                  changed={changeAllergyState}
                  label="NEW"
                  name="NEW"
                />
              </div>
            </section>
          </div>

          <div></div>
          <UploadImage
            setImageSrc={setImageSrc}
            image={imageSrc}
            setImage={setImage}
          />
          <CustomButton edit type="submit">
            Submit
          </CustomButton>
        </form>
      </div>
    </main>
  );
};

export default ItemPost;
