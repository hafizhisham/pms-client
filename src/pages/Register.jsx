import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../api";
import BackImage from "/images/bg2.jpg"


const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const username = event.target[2].value;
    const password = event.target[3].value;
    const formObject = { name, email, username, password };

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    axios
      .post(`${HOST}/api/register`, {
        name,
        email,
        username,
        password,
      })
      .then(function (response) {
        console.info(response.data);
        // navigate to my account page when success
        handleSucesssNavigation();
      })
      .catch(function (error) {
        console.error(error.response.data);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "#3ba9e6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Logo />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "89%",
          alignItems: "center",
          padding: "3rem",
          paddingTop: "80px",
          backgroundImage: `url(${BackImage})`,
        }}
      >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "450px",
          width: "500px",
          paddingTop: "1.5rem",
          alignItems: "center",
          borderStyle: "solid",
          borderColor: "#92aec9",
          borderRadius: "0.3rem",
          padding: "0.3rem",
          backgroundColor: "#eeeeee",
        }}
      >
        <h1>Sign Up</h1>
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "2.5rem",
            }}
          >
            <label htmlFor="username">Name</label>
            <input id="name" type="text" style={{backgroundColor: "white",}}/>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="email">Email</label>
            <input id="email" type="text" style={{backgroundColor: "white",}}/>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="username">Username</label>
            <input id="username" type="text" style={{backgroundColor: "white",}}/>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="password">Password</label>
            <input id="password" type="password" style={{backgroundColor: "white",}}/>
          </div>
          <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
          <button
            type="submit"
            style={{
              backgroundColor: "#d1ccd2",
                color: "black",
                marginTop: "1.1rem",
                width: "250px",
                fontWeight: "bold",
                borderColor: "#ff4800",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Sending request..." : "Register"}
          </button>
          </div>
          <Link
            to="/login"
            style={{
              marginTop: "1rem",
              display: "block",
              width: "100%",
              textAlign: "center",
              fontSize: "1.1rem"
            }}
          >
            Return as existing user
          </Link>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
