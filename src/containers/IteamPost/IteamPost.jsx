import React, { useState } from "react";
import axios from "axios";
import "./IteamPost.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const IteamPost = ({ user }) => {

    const handleFormChange = (e) => {
        setformData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };



    if (!user) {
        return <Redirect to="/Auth/Auth" />;
    }

    return (
        <div>
            <p className="tip">
                {classes.includes("s--signup") ? "Sign Up" : "Login"}
            </p>
            <div className={classes.join(" ")}>
                <div className="IteamPost">
                    <h2>Create Your Listing Here! </h2>
                    <form onSubmit={(e) => (e)}>
                        <CustomInput
                            onChange={(e) => handleFormChange(e)}
                            value={pName}
                            type="pName"
                            name="pName"
                            required
                        >
                            Product Name
                        </CustomInput>
                        <CustomInput
                            onChange={(e) => handleFormChange(e)}
                            value={sBid}
                            type="sBid"
                            name="sBid"
                            required
                        >
                            Starting Bid
                        </CustomInput>
                        <CustomInput
                            onChange={(e) => handleFormChange(e)}
                            value={condition}
                            type="condition"
                            name="condition"
                            required
                        >
                            Condition
                        </CustomInput>
                        <CustomInput
                            onChange={(e) => handleFormChange(e)}
                            value={details}
                            type="details"
                            name="details"
                            optional
                        >
                            Details
                        </CustomInput>
                        <CustomButton type="submit">
                            {loading ? (
                                <Spinner
                                    margin="2px auto"
                                    width="2em"
                                    height="2em"
                                    background="#13100a"
                                />
                            ) : (
                                "Post"
                            )}
                        </CustomButton>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default IteamPost;
