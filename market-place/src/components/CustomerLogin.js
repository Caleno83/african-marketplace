import React, { useState, useContext } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from 'react-alert'


const CustomerLogin = () => {
  const { setAuth } = useContext(AuthContext);

  const alert = useAlert()

  const defaultState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(defaultState);
  const [errors, setErrors] = useState({ ...defaultState, terms: "" });
  const { push } = useHistory();

  //this is the formState schema

  let formSchema = Yup.object().shape({
    username: Yup.string().required("Please provide email."),
    password: Yup.string().required("Please enter a correct Password"),
  });

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

  const validateChange = (e) => {
    //this allows react to keep the event object to play nice with async op
    e.persist();
    // reach allows us to check a specific value of the schema
    Yup.reach(formSchema, e.target.email)
      .validate(e.target.value)
      .then((res) =>
        setErrors({
          ...errors,
          [e.target.email]: "",
        })
      )
      .catch((error) =>
        setErrors({
          ...errors,
          [e.target.email]: error.errors[0],
        })
      );
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
    validateChange(e);
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
            required
            errors={errors}
          />
          {errors.email.length !== 0 && (
            <p className="error">{errors.email}</p>
          )}
        </label>
        <label htmlFor="password">
          <input
            //create the hide and show password from this link https://github.com/zakangelle/react-password-mask
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={formState.password}
            label="Password"
            required
            errors={errors}
          />
          {errors.password.length !== 0 && (
            <p className="error">{errors.password}</p>
          )}
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
  width: 100%;
  height: 200px;
  font-size: 30px;
  box-sizing: border-box;
  margin-top: 200px;



  h1 {
    text-align: center;
    margin: 120px 0 1px 0;
    font-size: 2.3rem;
    color: darkgreen;
  }

  p {
    font-size: 1.5rem;
  }

  .new-account {
    margin-top: 20px;
    a {
      text-decoration: none;
      color: black;
      padding-left: 41px;
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
  #log {
    margin-top: 10px;
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

  .register {
    margin-left: -45px;

    &:hover {
      color: green;
    }
  }
`;

export default CustomerLogin;
