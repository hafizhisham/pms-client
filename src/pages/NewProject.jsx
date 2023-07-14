import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../api";
import Header from "../components/Header";
import useLocalStorage from "../hook/useLocalStorage";
import Cookies from "js-cookie";

const NewProject = () => {
  const jwt = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("userData", null);
  const handleSucesssNavigation = () => {
    navigate("/listofproject");
  };
  // const handleNavigateToLogin = () => {
  //   navigate("/login");
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const client = event.target[0].value;
    const phone = event.target[1].value;
    const address = event.target[2].value;
    const staff = event.target[3].value;
    const status = event.target[4].value;
    const formObject = { client, phone, address, staff, status };

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    axios
      .post(
        `${HOST}/api/projects/register`,
        {
          client,
          phone,
          address,
          staff,
          status,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then(function (response) {
        console.info(response.data);
        // navigate to list of projects page when success
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
          paddingTop: "25px",
          backgroundImage: "url(./images/bg2.jpg)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "650px",
            width: "500px",
            paddingTop: "1.5rem",
            alignItems: "center",
            borderStyle: "solid",
            borderColor: "#6fa8dc",
            borderRadius: "0.3rem",
            padding: "0.3rem",
            backgroundColor: "#eeeeee",
          }}
        >
          <h1>New Project</h1>
          <form
            style={{ width: "100%", maxWidth: "400px" }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              <label htmlFor="client">Client Name :</label>
              <input
                id="client"
                type="text"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="phone">Phone Number :</label>
              <input
                id="phone"
                type="text"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="address">Address :</label>
              <textarea
                id="address"
                type="text"
                rows={4}
                cols={80}
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="staff">Staff :</label>
              <select
                id="staff"
                type="text"
                style={{ backgroundColor: "white", height: "30px" }}
              >
                <option></option>
                <option value="hisham">Hisham</option>
                <option value="hafiz">Hafiz</option>
                <option value="aizuddin">Aizuddin</option>
                <option value="hidayah">Hidayah</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <label htmlFor="status">Status :</label>
              <textarea
                id="status"
                type="text"
                rows={10}
                cols={200}
                style={{ backgroundColor: "white" }}
              />
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
              {isLoading ? "Sending request..." : "Submit"}
            </button>
            </div>
            <Link
              to="/listofprojects"
              style={{
                marginTop: "1rem",
                display: "block",
                width: "100%",
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              List of Projects
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
