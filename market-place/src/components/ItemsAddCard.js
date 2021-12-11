import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";

const FormCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-content: space-evenly;
  width: 100%;
  font-size: 30px;
  box-sizing: border-box;
  h1 {
    text-align: center;
    margin: 150px 0 10px 0;
    font-size: 2.3rem;
    color: darkgreen;
  }

  h3 {
    margin: 170px 0 10px 0;
    padding-left: 150px;
    font-size: 2.3rem;
    color: darkgreen;
  }

  .childrenDiv {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 40%;
    margin-right: 40%;
    width: auto;
    height: 400px;
  }
button {

  margin: 50px 5px 1px 0;
  width: 240px;
  height: 30px;
  margin-top: 40px;
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

  input,
  textarea {
    outline: none;
    border: 0;
    margin: 0;
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
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

const ItemsAddCard = ({ items, fetchItems }) => {
  const initialValue = {
    
    item_name: "",
    item_description: "",
    item_price: "",
    item_category: "",
    item_location: "",
    url_item: "",
    seller_id: localStorage.getItem("sellerID")
  };

  const [newItem, setNewItem] = useState(initialValue);
  const { push } = useHistory();

  const handleChanger = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("your items:", items);
    e.preventDefault();
    console.log("newItems", newItem);
    axiosWithAuth()
      .post("/items", newItem)
      .then((res) => {
        console.log("The response for newItem is:", res);
        setNewItem(res.data);
        push("/sellerItemsList");
        fetchItems()
  
      })
      .catch((err) => console.log("NewItems data error is:", err.message));
    setNewItem({
      item_name: "",
      item_description: "",
      item_price: "",
      item_category: "",
      item_location: "",
      url_item: ""
    });
  };

  return (
    <FormCardWrapper>
      <h1>Please Add A New Item Info For Sell Here</h1>
      <form className="childrenDiv" onSubmit={handleSubmit}>
        <input
          type="text"
          name="item_name"
          onChange={handleChanger}
          placeholder="Item Name"
          value={newItem.item_name || ""}
        />

        <input
          type="text"
          name="item_description"
          onChange={handleChanger}
          placeholder="Item Description"
          value={newItem.item_description || ""}
        />

        <input
          type="number"
          name="item_price"
          onChange={handleChanger}
          placeholder="Item Price"
          value={newItem.item_price || ""}
        />

        <input
          type="text"
          name="item_category"
          onChange={handleChanger}
          placeholder="Item Category "
          value={newItem.item_category || ""}
        />

        <input
          type="text"
          name="item_location"
          onChange={handleChanger}
          placeholder="Item Location"
          value={newItem.item_location || ""}
        />

        <input
          type="text"
          name="url_item"
          onChange={handleChanger}
          placeholder="Add Item Image"
          value={newItem.url_item || ""}
        />

        <button>Add A New Item</button>
      </form>
    </FormCardWrapper>
  );
};

export default ItemsAddCard;
