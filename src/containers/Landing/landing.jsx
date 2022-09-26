import React from "react";
import ImageSlider from "./Slide/ImageSlider";
import { SliderData } from "./Slide/SliderData";
import "./landing.css";

const landing = () => {
  return (
    <div className="wrapper">
      <div className="slides">
        <ImageSlider slides={SliderData} />
      </div>
    </div>
  );
};

export default landing;
