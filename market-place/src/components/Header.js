import React, { useContext } from "react";
import { NavLink, Link , useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
const NavContainer = styled.div`
    height: 80px;
    display: flex;
    padding-left: 219px;
    align-items: center;
    width: 1248px;
    background-color: darkolivegreen;
 
   h1 {
        color: black;
        font-size: 1.5rem;
        font-weight: 500;
        letter-spacing: 0.15rem;
        line-height: 1;
        margin: 2rem;
    }
    .nav {
        display: flex;
        margin: 20px;
        
        a {
          color: black;
            text-decoration: none;
            margin: 20px;

            &:hover{
              color: navy;
              font-size: 1.1rem;
          }
        }
        
        a.active{
          color: black;
        }
   }
   .logout {
     color: red;
   }
}
`;


const Header = () => {
  const { auth } = useContext(AuthContext);

  const {go, push } = useHistory();

  return (
    <NavContainer>
      <h1><i className="fas fa-globe-africa"></i>  African Market Place</h1>
      <div className="nav">

      {!localStorage.getItem('sellerID') ? <NavLink className="link" activeClassName="active" to="/sellerLogin">
          Seller
        </NavLink> : <Link className="logout" onClick={() => { 
          localStorage.clear()
          push("/sellerLogin")
         
          go(0)
          }}>Logout</Link>}

        {!localStorage.getItem('customerID') ? <NavLink className="link" activeClassName="active" to="/customerLogin">
          Customer
        </NavLink> : <Link className="logout" onClick={() => { 
          localStorage.clear()
          push("/customerLogin")
         
          go(0)
          }}>Logout</Link>}
  

        {!localStorage.getItem('sellerID') ? <NavLink className="link" activeClassName="active" to="/customerItemsPage">
          Home
        </NavLink> : <NavLink className="link" activeClassName="active" to="/sellerItemsPage">
          Home
        </NavLink>}

      {/* <NavLink to="/items">Home</NavLink> */}
      </div>
      <h1>{auth.message}</h1>
      {console.log("succesmsg", auth.message)}
    </NavContainer>
  );
};

export default Header;
