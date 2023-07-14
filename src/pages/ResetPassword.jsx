import React, { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { HOST } from "../api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import authorizeApi from "../api/authorizeApi";

const ResetPassword = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = event.target[0].value;
    const formObject = { password };

    axios
      .put(
        `${HOST}/api/users/resetpassword/${user?.username}`,
        {
          password,
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
                <p style={{ fontSize: "1.4rem" }}>Email :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#ff4800",
                  }}
                >
                  {user?.email || "no data"}
                </p>
                <p style={{ fontSize: "1.4rem", marginTop: "15px" }}>
                  Password :
                </p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#ff4800",
                  }}
                >
                  <input
                    id="password"
                    type="password"
                    style={{
                      backgroundColor: "white",
                      marginBottom: "15px",
                      width: "300px",
                    }}
                  />
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "7px",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
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

const AdminControl = () => {
  return (
    <div style={{ display: "inline", marginLeft: "1rem" }}>
      <span
        style={{
          textDecoration: "underline",
          color: "blue",
          cursor: "pointer",
        }}
      >
        Edit
      </span>
      <span
        style={{
          textDecoration: "underline",
          marginLeft: "0.5rem",
          color: "red",
          cursor: "pointer",
        }}
      >
        Delete
      </span>
    </div>
  );
};

export default ResetPassword;
