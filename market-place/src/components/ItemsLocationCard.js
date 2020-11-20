import React from "react";
import styled from "styled-components";


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
    margin: 70px 0 20px -30px;
   border-top: 3px solid darkolivegreen;
    border-radius: 5px;
    width: 1300px;
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



const ItemsLocationCard = (props) => {
  return (
      <>
    <ItemsWrapper>
        <div className="info" >
    <div >
        <p><span>Item # </span>{props.id}</p>
      </div>
      <div>
        <p><span>Location:</span> {props.item_location}</p>
      </div>
      <div>
        <p><span>Item: </span>{props.item_name}</p>
      </div>
      <div>
        <p><span>Description:</span> {props.item_description}</p>
      </div>
      <div>
        <p><span>Price: </span>${props.item_price}</p>
      </div>
      <div>
        <p><span>Category: </span>{props.item_category}</p>
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
    </>
  );
};

export default ItemsLocationCard;