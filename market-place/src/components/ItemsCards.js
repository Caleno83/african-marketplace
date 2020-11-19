import React from "react";
import styled from "styled-components"
// import styled from "styled-components";

const ItemsWrapper = styled.div`
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
    margin: 40px 0 100px 0;
    width: 280px;
    height: 40px;
    padding: 5px;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    color: black;
    outline: none;

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

const ItemsCard = (props) => {
  return (
    <ItemsWrapper>
      <div className="info">
    <div>
        <p>Item # {props.id}</p>
      </div>
      <div>
        <h3><span>Item: </span>{props.item_name}</h3>
      </div>
      <div>
        <p><span>Description: </span>{props.item_description}</p>
      </div>
      <div>
        <p><span>Price: </span>${props.item_price}</p>
      </div>
      <div>
        <p><span>Category: </span>{props.item_category}</p>
      </div>
      <div>
        <p><span>Location:</span> {props.item_location}</p>
      </div>
      <div>
      <img src={props.url_item} alt={props.item_name} />
      </div>
      
      <div>
        <p><span>Buyer: </span>{props.full_name}</p>
      </div>
      <div>
        <p><span>Contact: </span>{props.email}</p>
      </div>
      <div>
        <p><span>Added on: </span>{props.added_at}</p>
      </div>
      <hr className="rounded"></hr>
      </div>
    </ItemsWrapper>
  );
};

export default ItemsCard;