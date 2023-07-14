import React, { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HOST } from "../api";
import Header from "../components/Header";
import Cookies from "js-cookie";

const MyProject = () => {
  const [isLoading, setLoading] = useState(false);
  const jwt = Cookies.get("token");
  const [isAdmin, setAdmin] = useLocalStorage("isAdmin", false);
  const [user] = useLocalStorage("userData", null);
  const [project, setProject] = useLocalStorage("projectData", null);
  const [projects, setProjects] = useState([]);

  const param = useParams();
  const filteredArray = project.filter((item) => String(item.id) === param.id);
  const [filteredProject] = filteredArray;

  const navigate = useNavigate();

  const handleNavigate1 = (path) => {
    navigate("/listofprojects");
  };

  // const fetchProjectDetail = () => {
  //   // get jwt from localStorage
  //   console.log(jwt);
  //   console.log(projects);

  //   // run get api
  //   axios
  //     .get(`${HOST}/api/projects/`, {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     })
  //     .then(function (response) {
  //       // handle success
  //       console.info(response.data.data);
  //       setProjects(response.data.data);
  //       // setAdmin(response.data.user.isAdmin);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.error(error);
  //       handleNavigateToLogin();
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // };

  // useEffect(() => {
  //   fetchProjectDetail();
  // }, [jwt]);

  const handleDeleteProject = () => {
    const id = filteredProject?.id;
    // const jwt = Cookies.get("token");

    axios
      .delete(
        `${HOST}/api/projects/${id}`,
        // {
        //   id,
        // },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then(function (response) {
        console.info(response.data);
        // navigate to my account page when success
        handleNavigate1();
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
                {filteredProject?.client || "no data"}
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
                {filteredProject?.phone || "no data"}
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
                {filteredProject?.address || "no data"}
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
                {filteredProject?.status || "no data"}
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
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "#d1ccd2",
                color: "black",
                width: "180px",
                marginTop: "1rem",
                borderColor: "#ff4800",
                fontSize: "1.1rem",
                fontWeight: "bold",
                alignContent: "center",
              }}
              onClick={() => navigate(`/editproject/${filteredProject?.id}`)}
            >
              Edit Project Detail
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
              onClick={() => handleDeleteProject()}
            >
              Delete Project?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProject;
