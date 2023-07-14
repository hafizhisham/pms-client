import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useLocalStorage from "../hook/useLocalStorage";
import { HOST } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pluralize from "pluralize";
import Cookies from "js-cookie";

const ListOfProjects = () => {
  const [user] = useLocalStorage("userData", null);
  const [project, setProject] = useLocalStorage("projectData", null);
  const jwt = Cookies.get("token");
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchAllProject = () => {
    //   change loading state to true
    setLoading(true);

    // get jwt from localStorage
    console.log(jwt);
    console.log(project);
    // run get api
    axios
      .get(`${HOST}/api/projects`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        // handle success
        console.info(response.data.data);
        setProjects(response.data.data);
        setProject(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        if (error.response.status === 401) {
          navigate("newproject");
        }
      })
      .finally(function () {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAllProject();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header user={user} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem",
          backgroundImage: "url(./images/bg2.jpg)",
        }}
      >
        <h1>
          {projects.length} {pluralize("Project", projects.length)}
        </h1>
        <div
          style={{
            width: "100%",
            maxWidth: "550px",
            backgroundColor: "#eeeeee",
          }}
        >
          
          {isLoading ? (
            <p
              style={{ width: "100%", textAlign: "center", marginTop: "3rem" }}
            >
              Loading projects data...
            </p>
          ) : (
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const [jwt] = useLocalStorage("token", "");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        borderStyle: "solid",
        borderColor: "#6fa8dc",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginTop: "1rem",
      }}
      onClick={() => {
        navigate(`/myproject/${project.id}`);
      }}
    >
      <div>
        <p style={{ fontSize: "1.2rem" }}>Project ID :</p>
        <p
          style={{
            display: "inline",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#ff4800",
          }}
        >
          {project?.id || "no data"}
        </p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1.2rem" }}>Client Name :</p>
        <p
          style={{
            display: "inline",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#ff4800",
          }}
        >
          {project?.client || "no data"}
        </p>
      </div>
      {/* <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1.2rem" }}>Phone Number :</p>
        <p
          style={{
            display: "inline",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#ff4800",
          }}
        >
          {project?.phone || "no data"}
        </p>
      </div> */}
      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1.2rem" }}>Address :</p>
        <p
          style={{
            display: "inline",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#ff4800",
          }}
        >
          {project?.address || "no data"}
        </p>
      </div>
      {/* <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1.2rem" }}>Staff :</p>
        <p
          style={{
            display: "inline",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#ff4800",
          }}
        >
          {project?.staff || "no data"}
        </p>
      </div> */}
      {/* <div style={{ marginTop: "1rem" }}>
        <p style={{ fontSize: "1.2rem" }}>Status :</p>
        <p
          style={{
            display: "inline",
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "#ff4800",
          }}
        >
          {project?.status || "no data"}
        </p>
      </div> */}
    </div>
  );
};

export default ListOfProjects;
