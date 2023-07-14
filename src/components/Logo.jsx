import React from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from "../images/logoOh1.png"

const Logo = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => navigate("/");
  return (
    <div style={{ display: "flex", alignItems: "center", }}>
    <img
          style={{ height: "40px", width: "40px", }}
          src={LogoImage}
          alt="React Image"
        />
    <h1
      onClick={handleNavigateHome}
      style={{ fontSize: "22px", color: "black", cursor: "pointer", paddingLeft: "10px", }}
    >
      Oh Design
    </h1>
    </div>
  );
};

export default Logo;
