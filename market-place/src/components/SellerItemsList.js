import React, { useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import SellerListCard from "./SellerListCard";
// import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext";


const sellerItemsList = () => {
// eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, setUser} = useContext(UserContext);
  const seller_id = localStorage.getItem("sellerID");

  const fetchSellerList = () => {
    axiosWithAuth()

      .get(`/sellers/${seller_id}/items`)
      .then((res) => {
        console.log("This is the fetchSellerList response", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("This is the fetchSellerList error", err.message);
      });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchSellerList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <>
        <SellerListCard sellerList={user} fetchSellerList={fetchSellerList} />
      </>
    </div>
  );
};



export default sellerItemsList;