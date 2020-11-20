import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ItemsCard from "./ItemsCards";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Button = styled.div`
display: flex;
justify-content: space-around;
margin: 50px 0 -90px 10px;
padding-left: 60px;
button {
  margin: 50px 5px 1px 0;
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
`
const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding-left: 20px;
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
    margin: 70px 0 20px 30px;
   border-top: 3px solid darkolivegreen;
    border-radius: 5px;
    width: 1200px;
  
  }

  h1 {
    text-align: center;
    margin: -10px 0 50px 0;
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
    margin-top: -100px;
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

`;

const SellerItemsPage = () => {
  const [itemsList, setItemsList] = useState([]);

  
  useEffect(() => {
    axiosWithAuth()
      .get("/items")
      .then((res) => {
        console.log("this is the response:", res);
        setItemsList(res.data);
      })
      .catch((err) => {
        console.error("the Erros is:", err);
      });
  }, []);

  return (
    <div>
      <Button>
       <Link to="/sellerInfo">
        <div className="button">
          <button>Seller Info</button>
        </div>
      </Link>
      <Link to="/sellerItemsList">
        <div className="button">
          <button>My Items</button>
        </div>
      </Link>
      <Link to="/addItems">
        <div className="button">
          <button>Add Items</button>
        </div>
      </Link>
      </Button>
    
    <ItemsWrapper>
     
      <ol>
        {itemsList.map((item) => (
          <ItemsCard
            key={item.id}
            id={item.id}
            item_name={item.item_name}
            item_description={item.item_description}
            item_price={item.item_price}
            item_category={item.item_category}
            item_location={item.item_location}
            url_item={item.url_item}
            added_at={item.added_at}
            full_name={item.full_name}
            email={item.email}
          />
        ))}
      </ol>
    </ItemsWrapper>
    </div>
  );
};

export default SellerItemsPage;