import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-content: space-evenly;
  width: 100%;
  height: -500px;
  background-repeat: no-repeat;
  font-size: 30px;
  box-sizing: border-box;
  margin-top: 100px;

  span {
    color: darkolivegreen;
  }

  hr.rounded {
    border-top: 3px solid darkolivegreen;
    border-radius: 5px;
    width: 1200px;
    margin-bottom: 130px;
  }

  h1 {
    text-align: center;
    margin: 40px 0 50px 0;
    font-size: 2.3rem;
    color: darkgreen;
  }

  .info {
    text-align: center;
    padding-top: 20px;
  }

  .update-form {
    margin: 50px 0 10px 0;
    text-align: center;
    label {
      font-size: 30px;
      input {
        font-size: 25px;
        padding-bottom: 30px;
      }
      
    }
  }

  #main-title {
    margin-top: 60px;
  }

  .childrenDiv {
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 40%;
    margin-right: 40%;
    adding-top: 50px;
    width: auto;
    height: 400px;
  }
  button {

    margin: 50px 5px 40px 0;
    width: 240px;
    height: 30px;
    margin-top: 80px;
    background-color: darkolivegreen;
    padding: 7px 0 30px 0;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    color: black;
    outline: none;
  
    &:hover {
      background-color: green;
    }
  }

  label,
  input,
  textarea {
    outline: none;
    border: 0;
    margin: 0;

    text-align: center;
    font-size: 20px;
    margin-top: -90px;
   
    width: 200px;
    height: 50px;
    transition: all 0.9s;
    background-color: transparent;

    :focus {
      border-bottom: 2px solid lightgray;
      background-color: lightgray;
    }
  }
`;


const initialCustomer = {
  id: "",
  email: "",
  password: "",
};

const CustomerCard = ({ user, fetchCustomer }) => {
  const [editing, setEditing] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(initialCustomer);
 

  let history = useHistory();

  const editCustomer = (edit) => {
    setEditing(true);
    setCustomerToEdit(edit);
    fetchCustomer();
  };

  const updateCustomer = (e) => {
    e.preventDefault();
    setEditing(false);
    console.log("customer id is:", customerToEdit.id);

    axiosWithAuth()
      .put(`/customers/${customerToEdit.id}`, customerToEdit)
      .then((res) => {
        console.log("This is the updateCustomer Response", res);
        // setUser(res.data);
        fetchCustomer();
        history.push("/customerInfo");
      })
      .catch((err) => {
        console.log("This is the updatecustomer Error", err.message);
      });
  };

  const deleteCustomer= (info) => {
    axiosWithAuth()
      .delete(`/customers/${info.id}`) //This is for the delete for user
      .then((res) => {
        console.log("This is the deleteCustomer Response", res);
        // setUser(res.data);
        history.push("/customerLogin");
        localStorage.removeItem("token")
        localStorage.removeItem("CustomerID")
        fetchCustomer()
      })
      .catch((err) => {
        console.log("This is the deleteCustomer Error", err.message);
      });
  };

  console.log("Customer info: ", user);

  return (
    <UserWrapper>
      {editing ? (
        <form onSubmit={updateCustomer} className="update-form">
          <h1>Update Customer Profile</h1>
          <label>
            <span> Email: </span>
            <input
              type="text"
              name="email"
              onChange={(e) =>
                setCustomerToEdit({
                  ...customerToEdit,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              value={customerToEdit.email}
            />
          </label>
          <label>
            <span> Password: {""}</span>
            <input
              type="text"
              name="password"
              onChange={(e) =>
                setCustomerToEdit({
                  ...customerToEdit,
                  password: e.target.value,
                })
              }
              placeholder="password"
              value={customerToEdit.password}
            />
          </label>
        
          <div className="button-row">
            <button
              type="submit"
              onClick={(e) => {
                updateCustomer(e);
              }}
            >
              Save
            </button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h1 id="main-title">Customer Profile</h1>


          <div className="info">
            <div>
              <p>
                <span>Email: </span>
                {user.email}
              </p>
              <p>
                <span>Password: </span>
                {user.password}
              </p>
              

              <button onClick={() => editCustomer(user)}>Update</button>
              <button
                onClick={(e) => {
                  e.stopPropagation(e);
                  deleteCustomer(user);
                }}
              >
                Delete
              </button>
              <hr className="rounded"></hr>
            </div>
          </div>
        </>
      )} 

      {/* <div className="spacer" />*/}
    </UserWrapper>
  );
};

export default CustomerCard;