import React from "react";
import { FaStar } from "react-icons/fa";
import CustomButton from "../CustomButton/CustomButton";
import "./Detailsdummy.css";


const Dummy = () => {
    const item =
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: 3.9,
    };
    return (
        <div>
            <div className="details-title">{item.title}</div>
            <div className="details-img-div">
                <img src={item.image} alt="items" className="details-img" />
            </div>
            <div className="details-sidebar">
                <div className="details-description">{item.description}</div>
                <div className="details-category">#{item.category}</div>
                <div className="details-rating">
                    <FaStar color="gold" />
                    {item.rating}
                </div>
                <div className="details-price">Starting Bid: ${item.price}</div>
                {/* <div className="details-bid"> */}
                <CustomButton>Bid</CustomButton>
                {/* </div> */}
                <div className="details-report">
                <CustomButton>Report</CustomButton>
                </div>

            </div>
        </div>
    );
}
export default Dummy;