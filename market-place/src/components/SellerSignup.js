import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-content: space-evenly;
  width: 100%;
  height: 200px;
  font-size: 30px;
  box-sizing: border-box;
  margin-top: 280px;

  h1 {
    text-align: center;
    margin: 120px 0 20px 0;
    
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
    margin-left: 40%;
    margin-right: 40%;
    width: auto;
    height: 400px;
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
    margin-left: -2px;

    &:hover {
      color: green;
    }
  }

`;

const defaultFormState = {
  email: "",
  password: "",
  comfirmpassword: "",
  full_name: "",
};

let reg = {
  username: "",
  password: "",
  full_name: "",
};

const SellerSignup = () => {
  const [formState, setFormState] = useState(defaultFormState);

  const history = useHistory();

  // redo the handle
  const handleChange = (e) => {
    console.log(e.target.name);
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleSumbmit = (e) => {
    e.preventDefault();
    reg = {
      email: formState.email,
      password: formState.password,
      full_name: formState.full_name,
    };
    console.log(reg, formState);
    axiosWithAuth()
      .post("/sellers/register", reg)
      .then((res) => {
        console.log(res);
        history.push("/sellerLogin");
      })
      .catch((err) => console.log(err));
    console.log(formState);
  };
  return (
    <SignUpContainer>
      <form onSubmit={handleSumbmit} className="childrenDiv">
        <h1>Seller <hr></hr> Sign Up Now!</h1>
        <label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            value={formState.email}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={formState.password}
          />
        </label>
        <label>
          <input
            type="password"
            name="comfirmpassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            value={formState.comfirmpassword}
          />
        </label>
        <label>
          <input
            type="full_name"
            name="full_name"
            onChange={handleChange}
            placeholder="Full Name"
            value={formState.full_name}
          />
        </label>
        <button type="submit"> Submit </button>
        <button type="cancel"> Cancel </button>
        <div className="new-account">
          <Link  className = "register" to="/sellerLogin">Have an seller account?</Link>
        </div>
      </form>
    </SignUpContainer>
  );
};

export default SellerSignup;
// axios post request "off/login" end points
