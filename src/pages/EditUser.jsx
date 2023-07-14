import React, { useState } from "react";
// import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { HOST } from "../api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BackImage from "/images/bg2.jpg"


const EditUser = () => {
  const [isLoading, setLoading] = useState(false);
  const jwt = Cookies.get("token");
  const [isAdmin, setAdmin] = useLocalStorage("isAdmin", false);
  const [user, setUser] = useLocalStorage("userData", null);
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/my-account");
  };
  const handleNavigate = (path) => {
    navigate("/my-account");
  };

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleChange1 = (event) => {
    setName(event.target.value);
  };
  const handleChange2 = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const formObject = { email };

    axios
        .put(
          `${HOST}/api/users/${user?.username}`,
          {
            email,
          },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        )
        .then(function (response) {
          console.info(response.data);
          // navigate to my account page when success
          handleSucesssNavigation();
          
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          setLoading(false);
        });
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header user={user} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "89%",
          alignItems: "center",
          padding: "3rem",
          backgroundImage: `url(${BackImage})`,
        }}
      >
        <h1 style={{ fontSize: "2.2rem", fontWeight: "bolder" }}>
          Welcome back
        </h1>
        <div style={{ width: "100%", maxWidth: "550px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <h3 style={{ fontSize: "1.8rem" }}>My Account</h3>
          </div>
          <div
            style={{
              borderStyle: "solid",
              borderColor: "#92aec9",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginTop: "1rem",
              backgroundColor: "#eeeeee",
            }}
          >
            <div>
              <p style={{ fontSize: "1.4rem", marginTop: "10px" }}>
                Username :
              </p>
              <p
                style={{
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  color: "#ff4800",
                }}
              >
                {user?.username || "no data"}
              </p>
            </div>
            <form
              style={{ width: "100%", maxWidth: "400px" }}
              onSubmit={handleSubmit}
            >
              <div style={{ marginTop: "1rem" }}>
              <p style={{ fontSize: "1.4rem" }}>Name :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#ff4800",
                  }}
                >
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleChange1}
                    style={{ backgroundColor: "white", width: "400px" }}
                  />
                </p>

                <p style={{ fontSize: "1.4rem", marginTop:"1.2rem" }}>Email :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#ff4800",
                  }}
                >
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleChange2}
                    style={{ backgroundColor: "white", width: "400px" }}
                  />
                </p>
              </div>
              <div style={{ display: "flex", gap: "7px", fontSize: "15px", marginTop: "20px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#d1ccd2",
                    color: "black",
                    width: "100px",
                    marginTop: "1rem",
                    borderColor: "#ff4800",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending request..." : "Update"}
                </button>
                <button
                  style={{
                    backgroundColor: "#d1ccd2",
                    color: "black",
                    width: "100px",
                    marginTop: "1rem",
                    borderColor: "#ff4800",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleNavigate("my-account")}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
