import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ItemsLocationCard from "./ItemsLocationCard";
import styled from "styled-components";

const Header = styled.div`

h1 {
    margin: 90px 0 0 546px;
    padding: 20px 0 -50px 0;
    color: darkgreen;
  }
`

const ItemsLocation = () => {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/location/search")
      .then((res) => {
        console.log("this is the tems location response:", res);
        setItemsList(res.data);
      })
      .catch((err) => {
        console.error("the Error is:", err);
      });
  }, []);

  return (
  <div>
 
    <>
    <Header>
        <h1>ITEMS BY LOCATION</h1>
    </Header>
           
     <ol>
        {itemsList.map((item) => (
          <ItemsLocationCard
            key={item.id}
            id={item.id}
            item_location={item.item_location}
            item_name={item.item_name}
            item_description={item.item_description}
            item_price={item.item_price}
            item_category={item.item_category}
            url_item={item.url_item}
            added_at={item.added_at}
            full_name={item.full_name}
            email={item.email}
          />
        ))}
      </ol>
    </>
    </div>
  );
};

export default ItemsLocation;