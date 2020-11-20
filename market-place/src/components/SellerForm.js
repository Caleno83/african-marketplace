import React, { useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import SellerCard from "./SellerCard";
import { UserContext } from "../context/UserContext";


const SellerForm = () => {
const { user, setUser} = useContext(UserContext);
const id = localStorage.getItem("sellerID");


  const fetchSeller = () => {
    axiosWithAuth()
    //to get all users list
      // .get('users')
      .get(`/sellers/${id}`)
      .then((res) => {
        console.log("This is the fetchSeller response", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("This is the fetchSeller error", err.message);
      });
  };

  useEffect(() => {
    fetchSeller();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>


        <SellerCard user={user} fetchSeller={fetchSeller} />
    </>
  );
};

export default SellerForm;
