import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../api";
import Cookies from "js-cookie";
import BackImage from "/images/bg2.jpg"


const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/my-account");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const identifier = event.target[0].value;
    const password = event.target[1].value;

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    axios
      .post(`${HOST}/api/login`, {
        identifier,
        password,
      })
      .then(function (response) {
        console.info(response.data.jwt);
        // navigate to my account page when success
        Cookies.set("token", response.data.jwt);
        handleSucesssNavigation();
      })
      .catch(function (error) {
        console.error(error);
        alert("You have entered the wrong Username or Password");
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
          paddingTop: "150px",
          backgroundImage: `url(${BackImage})`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "310px",
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
          <h1>Sign In</h1>
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
              <label style={{fontSize: "1.2rem"}} htmlFor="identifier">Username</label>
              <input id="identifier" type="text" style={{backgroundColor: "white",}}/>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label style={{fontSize: "1.2rem"}} htmlFor="password">Password</label>
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
              {isLoading ? "Sending request..." : "Login"}
            </button>
            </div>
            <Link
              to="/register"
              style={{
                marginTop: "1rem",
                display: "block",
                width: "100%",
                textAlign: "center",
                fontSize: "1.1rem"
              }}
            >
              Register as new user
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
