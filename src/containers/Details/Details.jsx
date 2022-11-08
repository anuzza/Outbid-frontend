import React, { useState } from "react";
import axios from "../../utils/axios";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import useAuthStore from "../../store/auth";
import { getError } from "../../utils/error";
import Dummy from "../../components/Detailsdummy/Detailsdummy";
import DetailsCard from "../../components/DetailsCard/DetailsCard";

const Details = () => {
    const user = useAuthStore((state) => state.user);
    const [classesName, setClasses] = useState({
      classes: ["post"],
    });
    const { classes } = classesName;
  
    const [formData, setformData] = useState({
      product_name: " ",
      current_bid: " ",
      condition: " ",
      details: " ",
      catergory: " ",

    });
    return (
        <div className="card-wrapper">
          <DetailsCard>
            <Dummy />
          </DetailsCard>
        </div>
      );
}
export default Details;