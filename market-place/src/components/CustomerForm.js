import React, { useEffect, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import CustomerCard from "./CustomerCard";
import { UserContext } from "../context/UserContext";

const CustomerForm = () => {
const { user, setUser} = useContext(UserContext);
const id = localStorage.getItem("customerID");


  const fetchCustomer = () => {
    axiosWithAuth()
    //to get all users list
      // .get('users')
      .get(`/customers/${id}`)
      .then((res) => {
        console.log("This is the fetchCustomer response", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("This is the fetchCustomer error", err.message);
      });
  };

  useEffect(() => {
    fetchCustomer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomerCard user={user} fetchCustomer={fetchCustomer} />
    </>
  );
};

export default CustomerForm;
