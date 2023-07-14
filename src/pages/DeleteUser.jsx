import React, { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HOST } from "../api";
import Header from "../components/Header";
import Cookies from "js-cookie";
import BackImage from "/images/bg2.jpg"


const DeleteUser = () => {
  // const [jwt, setJwt] = useLocalStorage("token", "");
  const jwt = Cookies.get("token");
  const [isAdmin, setAdmin] = useLocalStorage("isAdmin", false);
  const [user, setUser] = useLocalStorage("userData", null);
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/login");
  };
  const handleNavigate1 = (path) => {
    navigate("/edituser");
  };
  const handleNavigate2 = (path) => {
    navigate("/resetpassword");
  };

  const fetchUserAccount = () => {
    // get jwt from localStorage
    console.log(jwt);

    // run get api
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

  useEffect(() => {
    fetchUserAccount();
  }, [jwt]);

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
              <p style={{ fontSize: "1.3rem" }}>Username :</p>
              <p
                style={{
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  color: "#ff4800",
                }}
              >
                {user?.username || "no data"}
              </p>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <p style={{ fontSize: "1.3rem" }}>Email :</p>
              <p
                style={{
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  color: "#ff4800",
                }}
              >
                {user?.email || "no data"}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "30px",
              fontSize: "1.1rem",
              marginTop: "20px",
              justifyContent: "center",
            }}
          >
            <button onClick={() => handleNavigate1("edituser")}>
              Edit User Detail
            </button>
            <button onClick={() => handleNavigate2("resetpassword")}>
              Reset Password
            </button>
            <button onClick={() => handleNavigate("deleteuser")}>
              Delete User?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
