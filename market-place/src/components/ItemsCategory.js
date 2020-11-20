import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import ItemsCategoryCard from "./ItemsCategoryCard";
import styled from "styled-components";



const Header = styled.div`

h1 {
    margin: 90px 0 0 555px;
  padding: 20px 0 -50px 0;
    color: darkgreen;
}
`


const ItemsCategory = () => {
  const [itemsList, setItemsList] = useState([]);

  
  useEffect(() => {
    axiosWithAuth()
      .get("/category/search")
      .then((res) => {
        console.log("this is the tems category response:", res);
        setItemsList(res.data);
      })
      .catch((err) => {
        console.error("the Error is:", err);
      });
  }, []);

  return (
  <div>
      <Header>
           <h1>ITEMS BY CATEGORY</h1>
           </Header>
    <>
     <ol>
        {itemsList.map((item) => (
          <ItemsCategoryCard
            key={item.id}
            id={item.id}
            item_category={item.item_category}
            item_name={item.item_name}
            item_description={item.item_description}
            item_price={item.item_price}
           
            item_location={item.item_location}
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

export default ItemsCategory;