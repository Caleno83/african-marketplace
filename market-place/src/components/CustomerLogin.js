import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from 'react-alert'
import market from "../img/market.jpg"


const CustomerLogin = () => {
  const { setAuth } = useContext(AuthContext);

  const alert = useAlert()

  const defaultState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(defaultState);
  const { push } = useHistory();

  //this is use for the onsubmit function
  const formSubmit = (e) => {
    e.preventDefault();
    //I added axios data here so it does not fire a lot when its outside
    console.log("Form Submitted");
    // to reset form
    setFormState({
      email: "",
      password: "",
    });

    axiosWithAuth()
      .post("/customers/login", formState)
      .then((res) => {
        const data = res.data;
        console.log("form submitted success", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("customerID", data.customer_id)
        //I set setAuth here so it can retrieve the user data to the DOM
        setAuth(data);
        push("/customerItemsPage");
      })
      .catch((err) => {
        console.log("This is the Error", err);
        alert.error("Please Sign In or Sign Up as a Customer");
      });
  };

  // onChange function
  const handleChange = (e) => {
    //ternary operator to determine the form value
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  return (
    <LoginWrapper>
      <form onSubmit={formSubmit} className="childrenDiv">
        <h1>CUSTOMER LOG IN</h1>
        <label htmlFor="Email">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formState.email}
            label="Email"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={formState.password}
            label="Password"
          />
        </label>
        <button type="submit" onClick={(e) => e.stopPropagation()}>
          SUBMIT
        </button>
        {/* Logout will only display if the user is logged in */}

        <div className="new-account">
          <p>Not registered yet?</p>
          <Link className="register" to="/customerSignup">Customer Register Here</Link>
        </div>
      </form>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
display: flex;
flex-direction: column;
align-content: center;
justify-content: center;
justify-content: space-evenly;
width: 101.9%;
height: 940px;
font-size: 30px;
box-sizing: border-box;
padding-top: -80px;
background-image: url(${market});
background-size: cover;
background-repeat: no-repeat;
overflow: scroll;
background-position: center;

h1 {
  text-align: center;
  margin: -190px 0 20px 0;
  
  font-size: 2.3rem;
  color: darkgreen;
}

.new-account {
  margin-top: 20px;
  a {
    text-decoration: none;
    color: black;
    font-size: 1.2rem;
  }
}

.error {
  font-size: 0.9rem;
  color: red;
}

.childrenDiv {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -90px;
  margin-left: 35.5%;
  margin-right: 40%;
  width: 400px;
  padding-top:170px;
  height: 580px;
  border: 5px solid black;
  border-radius: 20px;
  background-color: white;
}
button {
  margin: 50px 5px 0 0;
  width: 240px;
  height: 30px;
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
}

.register {
  margin-left: 23px;

  &:hover {
    color: green;
  }
}
`;

export default CustomerLogin;
