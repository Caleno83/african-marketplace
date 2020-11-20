import React, { useState } from "react";
import { Route } from "react-router-dom";
import SellerLogin from "./components/SellerLogin";
import SellerSignup from "./components/SellerSignup";
import CustomerLogin from "./components/CustomerLogin";
import CustomerSignup from "./components/CustomerSignup";
import SellerItemsPage from "./components/SellerItemsPage"
import CustomerItemsPage from "./components/CustomerItemsPage"
import Header from "../src/components/Header";
import { AuthContext } from "./context/AuthContext";
import { SellerContext } from "./context/SellerContext";
import { PlantsContext } from "./context/PlantsContext";
import { UserContext } from "./context/UserContext";
import AddItemsForm from "./components/AddItemsForm";
import SellerForm from "./components/SellerForm";
import CustomerForm from "./components/CustomerForm";
import PrivateRoute from "./utils/PrivateRoute";
import SellerItemsList from "./components/SellerItemsList"
import ItemsLocation from "./components/ItemsLocation"
import ItemsCategory from "./components/ItemsCategory"


import styled from "styled-components";

function App() {
  const [auth, setAuth] = useState([]);
  const [user, setUser] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [sellerList, setSellerList] = useState([])

  return (
    <AppWrapper>
      
      <AuthContext.Provider value={{ auth, setAuth }}>
      <SellerContext.Provider value={{ sellerList, setSellerList}}>
      <PlantsContext.Provider value={{ plantList, setPlantList }}>
      <UserContext.Provider value={{ user, setUser }}>
      <Header />
      {/* Below Route is for the default URL */}
      <Route exact path="/" component={SellerLogin} />
      <PrivateRoute exact path="/sellerItemsPage" component={SellerItemsPage} />
      <PrivateRoute exact path="/customerItemsPage" component={CustomerItemsPage} />
      <Route exact path="/sellerLogin" component={SellerLogin} />
      <Route path="/sellerSignup" component={SellerSignup} />
      <Route exact path="/customerLogin" component={CustomerLogin} />
      <Route path="/customerSignup" component={CustomerSignup} />
      <PrivateRoute exact path="/sellerInfo" component={SellerForm} />
      <PrivateRoute exact path="/customerInfo" component={CustomerForm} />
      <PrivateRoute exact path="/itemsLocation" component={ItemsLocation} />
      <PrivateRoute exact path="/itemsCategory" component={ItemsCategory} />
      <PrivateRoute exact path="/sellerItemsList" component={SellerItemsList} />
      <PrivateRoute path="/addItems" component={AddItemsForm} />
      </UserContext.Provider>
      </PlantsContext.Provider>
      </SellerContext.Provider>
      </AuthContext.Provider>
     
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  margin: 0;
  width: 100%;
  height: 1000px;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  outline: none;
  font-family: "Karma", sans-serif;

  .spinner {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: #204963;
  }
`;

export default App;
