import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import FolderImage from "/images/file1.png";
import BackImage from "/images/bg2.jpg";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
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
      </div>
      <div
        style={{
          display: "flex",
          height: "89%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "30px",
          backgroundImage: `url(${BackImage})`,
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "bold",
          }}
        >
          Project Management System
        </h1>
        <img
          style={{ height: "200px", width: "200px" }}
          src={FolderImage}
          alt="React Image"
        />
        <div style={{ display: "flex", gap: "30px", fontSize: "1.5rem" }}>
          <button
            style={{
              backgroundColor: "#d1ccd2",
              width: "150px",
              height: "35px",
              borderColor: "#ff4800",
              fontWeight: "bold",
            }}
            onClick={() => handleNavigate("login")}
          >
            Sign In
          </button>
          <button
            style={{
              backgroundColor: "#d1ccd2",
              width: "150px",
              height: "35px",
              borderColor: "#ff4800",
              fontWeight: "bold",
            }}
            onClick={() => handleNavigate("register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
