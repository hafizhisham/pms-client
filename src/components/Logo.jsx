import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => navigate("/");
  return (
    <div style={{ display: "flex", alignItems: "center", }}>
    <img
          style={{ height: "40px", width: "40px", }}
          src="images/logoOh1.png"
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
