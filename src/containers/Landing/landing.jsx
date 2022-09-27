import React from "react";
import ImageSlider from "./Slide/ImageSlider";
import { SliderData } from "./Slide/SliderData";
import "./Landing.css";
import SearchContainer from "../../components/SearchContainer/SearchContainer";

const Landing = () => {
  return (
    <div className="wrapper">
      <SearchContainer />
      <div className="slides">
        <ImageSlider slides={SliderData} />
      </div>
    </div>
  );
};

export default Landing;
