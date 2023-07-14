import React, { useEffect } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ user }) => {
  const navigate1 = useNavigate();
  const navigate2 = useNavigate();

  const handleLogoutOut = () => {
    Cookies.remove("token");
    navigate1("/login");
    location.reload();
  };
  const handleNavigate1 = (path) => {
    navigate2("/newproject");
  };
  const handleNavigate2 = (path) => {
    navigate2("/listofprojects");
  };
  const handleNavigate3 = (path) => {
    navigate2("/my-account");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80px",
        backgroundColor: "#3ba9e6",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Logo />
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <h4 style={{ display: "flex", color: "black", fontSize: "1.4rem", marginRight: "5px" }}>
          Hi, <p style={{marginLeft: "7px", marginRight: "7px"}}>{user?.username.toUpperCase() || "no data"}</p>
        </h4>
        <button
          style={{
            backgroundColor: "#d1ccd2",
            color: "black",
            width: "130px",
            borderColor: "#ff4800",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => handleNavigate1("newproject")}
        >
          New Project?
        </button>
        <button
          style={{
            backgroundColor: "#d1ccd2",
            color: "black",
            width: "150px",
            borderColor: "#ff4800",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => handleNavigate2("listofprojects")}
        >
          List of Projects
        </button>
        <button
          style={{
            backgroundColor: "#d1ccd2",
            color: "black",
            width: "100px",
            borderColor: "#ff4800",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => handleNavigate3("my-account")}
        >
          My Account
        </button>
        <button
          style={{
            backgroundColor: "#d1ccd2",
            color: "black",
            width: "100px",
            borderColor: "#ff4800",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={handleLogoutOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
