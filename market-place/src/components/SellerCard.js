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
    color: darkgreen;
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
      background-color: darkgreen;
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

const initialSeller = {
  id: "",
  email: "",
  password: ""
};

const SellerCard = ({ user, fetchSeller }) => {
  const [editing, setEditing] = useState(false);
  const [sellerToEdit, setSellerToEdit] = useState(initialSeller);
 

  let history = useHistory();

  const editSeller = (edit) => {
    setEditing(true);
    setSellerToEdit(edit);
    fetchSeller();
  };

  const updateSeller = (e) => {
    e.preventDefault();
    setEditing(false);
    console.log("seller id is:", sellerToEdit.id);

    axiosWithAuth()
      .put(`/sellers/${sellerToEdit.id}`, sellerToEdit)
      .then((res) => {
        console.log("This is the updateSeller Response", res);
        fetchSeller();
        history.push("/sellerInfo");
      })
      .catch((err) => {
        console.log("This is the updateSeller Error", err.message);
      });
  };

  const deleteSeller= (info) => {
    axiosWithAuth()
      .delete(`/sellers/${info.id}`) 
      .then((res) => {
        console.log("This is the deleteSeller Response", res);
        history.push("/sellerLogin");
        localStorage.removeItem("token")
        localStorage.removeItem("sellerID")
        fetchSeller()
      })
      .catch((err) => {
        console.log("This is the deleteSeller Error", err.message);
      });
  };

  console.log("Seller info: ", user);

  return (
    <UserWrapper>
      {editing ? (
        <form onSubmit={updateSeller} className="update-form">
          <h1>Update Seller Profile</h1>
          <label>
            <span> Email: </span>
            <input
              type="text"
              name="email"
              onChange={(e) =>
                setSellerToEdit({
                  ...sellerToEdit,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              value={sellerToEdit.email}
            />
          </label>
          <label>
            <span> Password: {""}</span>
            <input
              type="text"
              name="password"
              onChange={(e) =>
                setSellerToEdit({
                  ...sellerToEdit,
                  password: e.target.value,
                })
              }
              placeholder="password"
              value={sellerToEdit.password}
            />
          </label>
          
          <div className="button-row">
            <button
              type="submit"
              onClick={(e) => {
                updateSeller(e);
              }}
            >
              Save
            </button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h1 id="main-title">Seller Profile</h1>


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
            
              <button onClick={() => editSeller(user)}>Update</button>
              <button
                onClick={(e) => {
                  e.stopPropagation(e);
                  deleteSeller(user);
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

export default SellerCard;

