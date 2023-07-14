import React, { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HOST } from "../api";
import Header from "../components/Header";
import Cookies from "js-cookie";

const MyAccount = () => {
  // const [jwt, setJwt] = useLocalStorage("token", "");
  const [isLoading, setLoading] = useState(false);
  const jwt = Cookies.get("token");
  const [user, setUser] = useLocalStorage("userData", null);
  const [isAdmin, setAdmin] = useLocalStorage("isAdmin", false);
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
  const handleNavigate3 = (path) => {
    navigate("/register");
  };

  const fetchUserAccount = () => {
    // get jwt from localStorage
    console.log(jwt);
    Cookies.get("token");

    // run get api
    axios
      .get(`${HOST}/private`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        // handle success
        console.info(response.data);
        setUser(response.data.user);
        setAdmin(response.data.user.isAdmin);
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        handleNavigateToLogin();
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchUserAccount();
  }, [jwt]);

  const handleDeleteUser = () => {
    const username = user?.username;
    axios
      .delete(`${HOST}/api/users/${user?.username}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        console.info(response.data);
        // navigate to my account page when success
        handleNavigate3();
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
          backgroundImage: "url(./images/bg2.jpg)",
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
            {isAdmin && <AdminControl />}
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
             <div style={{ marginTop: "1rem" }}>
              <p style={{ fontSize: "1.3rem" }}>Name :</p>
              <p
                style={{
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  color: "#ff4800",
                }}
              >
                {user?.name || "no data"}
              </p>
            </div>
            <div style={{ marginTop: "1rem" }}>
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
            <button
              style={{
                backgroundColor: "#d1ccd2",
                color: "black",
                width: "150px",
                marginTop: "1rem",
                borderColor: "#ff4800",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              onClick={() => handleNavigate1("edituser")}
            >
              Edit User Detail
            </button>
            <button
              style={{
                backgroundColor: "#d1ccd2",
                color: "black",
                width: "150px",
                marginTop: "1rem",
                borderColor: "#ff4800",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              onClick={() => handleNavigate2("resetpassword")}
            >
              Reset Password
            </button>
            <button
              style={{
                backgroundColor: "#d1ccd2",
                color: "black",
                width: "150px",
                marginTop: "1rem",
                borderColor: "#ff4800",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              onClick={() => handleDeleteUser()}
            >
              Delete User?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminControl = () => {
  return (
    <div
      style={{
        display: "inline",
        marginLeft: "1rem",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}
    >
      <span
        style={{
          textDecoration: "underline",
          color: "blue",
          cursor: "pointer",
        }}
      >
        <Link to="/users">See All Users</Link>
      </span>
    </div>
  );
};

export default MyAccount;
