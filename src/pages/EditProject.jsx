import React, { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HOST } from "../api";
import Header from "../components/Header";
import Cookies from "js-cookie";

const EditProject = () => {
  const [isLoading, setLoading] = useState(false);
  const jwt = Cookies.get("token");
  const [isAdmin, setAdmin] = useLocalStorage("isAdmin", false);
  const [user] = useLocalStorage("userData", null);
  const [project, setProject] = useLocalStorage("projectData", null);
  // const [projects, setProjects] = useState([]);

  const param = useParams();
  const filteredArray = project.filter((item) => String(item.id) === param.id);
  const [filteredProject] = filteredArray;

  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/listofprojects");
  };
  const handleNavigate = (path) => {
    navigate("/listofprojects");
  };

  const [client, setClient] = useState(filteredProject?.client);
  const [phone, setPhone] = useState(filteredProject?.phone);
  const [address, setAddress] = useState(filteredProject?.address);
  const [staff, setStaff] = useState(filteredProject?.staff);
  const [status, setStatus] = useState(filteredProject?.status);

  const handleChange1 = (event) => {
    setClient(event.target.value);
  };
  const handleChange2 = (event) => {
    setPhone(event.target.value);
  };
  const handleChange3 = (event) => {
    setAddress(event.target.value);
  };
  const handleChange4 = (event) => {
    setStaff(event.target.value);
  };
  const handleChange5 = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const client = event.target[0].value;
    const phone = event.target[1].value;
    const address = event.target[2].value;
    const staff = event.target[3].value;
    const status = event.target[4].value;
    const formObject = { client, phone, address, staff, status };

    axios
      .put(
        `${HOST}/api/projects/${filteredProject?.id}`,
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
        <h1 style={{ fontSize: "2.2rem", fontWeight: "bolder" }}>Projects</h1>
        <div style={{ width: "100%", maxWidth: "550px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3rem",
            }}
          >
            <h3 style={{ fontSize: "1.8rem" }}>Project Detail</h3>
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
            <div>
              <p style={{ fontSize: "1.2rem" }}>Project ID :</p>
              <p
                style={{
                  display: "inline",
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  color: "#ff4800",
                }}
              >
                {filteredProject?.id || "no data"}
              </p>
            </div>
            <form
              style={{ width: "100%", maxWidth: "400px" }}
              onSubmit={handleSubmit}
            >
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Client Name :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  <input
                    id="client"
                    // placeholder={filteredProject?.client}
                    type="text"
                    value={client}
                    onChange={handleChange1}
                    style={{ backgroundColor: "white", width: "450px" }}
                  />
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Phone Number :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  <input
                    id="phone"
                    placeholder={filteredProject?.phone}
                    type="text"
                    value={phone}
                    onChange={handleChange2}
                    style={{ backgroundColor: "white", width: "450px" }}
                  />
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Address :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  <textarea
                    id="address"
                    placeholder={filteredProject?.address}
                    type="text"
                    rows={4}
                    cols={80}
                    value={address}
                    onChange={handleChange3}
                    style={{ backgroundColor: "white", width: "465px" }}
                  />
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Staff :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  {filteredProject?.staff || "no data"}
                  <select
                    id="staff"
                    type="text"
                    value={staff}
                    onChange={handleChange4}
                    style={{
                      backgroundColor: "white",
                      width: "465px",
                      height: "30px",
                    }}
                  >
                    <option></option>
                    <option value="hisham">Hisham</option>
                    <option value="hafiz">Hafiz</option>
                    <option value="aizuddin">Aizuddin</option>
                    <option value="hidayah">Hidayah</option>
                  </select>
                </p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "1.2rem" }}>Status :</p>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#ff4800",
                  }}
                >
                  <textarea
                    id="status"
                    placeholder={filteredProject?.status}
                    type="text"
                    rows={10}
                    cols={200}
                    value={status}
                    onChange={handleChange5}
                    style={{ backgroundColor: "white", width: "465px" }}
                  />
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  fontSize: "1.1rem",
                  marginTop: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#d1ccd2",
                    color: "black",
                    width: "180px",
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
                    width: "180px",
                    marginTop: "1rem",
                    borderColor: "#ff4800",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleNavigate("myproject")}
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

export default EditProject;
