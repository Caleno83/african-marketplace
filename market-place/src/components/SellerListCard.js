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

    margin: 50px 5px 20px 0;
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

const initialItem = {
    
        item_name: "",
        item_description: "",
        item_price: "",
        item_category: "",
        item_location: "",
        url_item: "",
};

const SellerListCard= ({ sellerList, fetchSellerList}) => {
  const [editing, setEditing] = useState(false);
  const [itemEdit, setItemEdit] = useState(initialItem);
 

  let history = useHistory();

  const editItem = (edit) => {
    setEditing(true);
    setItemEdit(edit);
    fetchSellerList();
  };

  const updateItem = (e) => {
    e.preventDefault();
    setEditing(false);
    console.log("item id is:", sellerList.id);

    axiosWithAuth()
      .put(`/items/${itemEdit.id}`, itemEdit)
      .then((res) => {
        console.log("This is the updateItem Response", res);
        // setUser(res.data);
        fetchSellerList();
        history.push("/sellerItemsList");
      })
      .catch((err) => {
        console.log("This is the updateUser Error", err.message);
      });
  };

  const deleteItem = (info) => {
    axiosWithAuth()
      .delete(`/items/${info.id}`) //This is for the delete for user
      .then((res) => {
        console.log("This is the deleteItem Response", res);
        fetchSellerList()
        history.push("/selleritemsList");
      })

      .catch((err) => {
        console.log("This is the deleteItem Error", err.message);
      });
  };

  console.log("User info: ", sellerList);

  return (
    <UserWrapper>
      {editing ? (
        <form onSubmit={updateItem} className="update-form">
          <h1>Please Update Item</h1>
          <label>
            <span> Item: </span>
            <input
              type="text"
              name="item_name"
              onChange={(e) =>
                setItemEdit({
                  ...itemEdit,
                  item_name: e.target.value,
                })
              }
              placeholder="Item Name"
              value={itemEdit.item_name}
            />
          </label>
          <label>
            <span> Item Description: {""}</span>
            <input
              type="text"
              name="item_description"
              onChange={(e) =>
                setItemEdit({
                  ...itemEdit,
                  item_description: e.target.value,
                })
              }
              placeholder="Item Description"
              value={itemEdit.item_description}
            />
          </label>
          <label>
            <span>Item Price:</span>
            <input
              type="number"
              name="item_price"
              onChange={(e) =>
                setItemEdit({
                  ...itemEdit,
                  item_price: e.target.value,
                })
              }
              placeholder="Item Price"
              value={itemEdit.item_price}
            />
          </label>
          <label>
            <span> Item Category: </span>
            <input
              type="text"
              name="item_category"
              onChange={(e) =>
                setItemEdit({
                  ...itemEdit,
                  item_category: e.target.value,
                })
              }
              placeholder="Item Category"
              value={itemEdit.item_category}
            />
          </label>
          <label>
            <span> Item Location: {""}</span>
            <input
              type="text"
              name="item_location"
              onChange={(e) =>
                setItemEdit({
                  ...itemEdit,
                  item_location: e.target.value,
                })
              }
              placeholder="Item Location"
              value={itemEdit.item_location}
            />
          </label>
          <label>
            <span>Item Image:</span>
            <input
              type="text"
              name="url_item"
              onChange={(e) =>
                setItemEdit({
                  ...itemEdit,
                  url_item: e.target.value,
                })
              }
              placeholder="Item Image"
              value={itemEdit.url_item}
            />
          </label>
          <div className="button-row">
            <button
              type="submit"
              onClick={(e) => {
                updateItem(e);
              }}
            >
              Save
            </button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h1 id="main-title">Your Items For Sell </h1>

        {/* to get all users list */}

          <div className="info">
              {[...sellerList].reverse().map((u) => (
                <div key={u.id}>
                    <p>
                    <span>Item #: </span>
                    {u.id}
                  </p>
                  <p>
                    <span>Item Name: </span>
                    {u.item_name}
                  </p>
                  <p>
                    <span>Description: </span>
                    {u.item_description}
                  </p>
                  <p>
                    <span>Price: </span>
                    {u.item_price}
                  </p>
                  <p>
                    <span>Location: </span>
                    {u.item_location}
                  </p>
                  <p>
                    <span>Category </span>
                    {u.item_description}
                  </p>
                  <p>
                    <span>Price: </span>
                    {u.item_price}
                  </p>

                  <div>
      <img src={u.url_item} alt={u.item_name} />
      </div>

                  <button onClick={() => editItem(u)}>Update</button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(u);
                    }}
                  >
                    Delete
                  </button>
                  <hr className="rounded"></hr>
                </div>
              ))}
          </div>
        </>
      )}

         

    </UserWrapper>
  );
};

export default SellerListCard;
