import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useLocalStorage from "../hook/useLocalStorage";
import { HOST } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pluralize from "pluralize";
import Cookies from "js-cookie";
import BackImage from "/images/bg2.jpg"


const Users = () => {
  const [user] = useLocalStorage("userData", null);
  const jwt = Cookies.get("token");
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchAllUser = () => {
    //   change loading state to true
    setLoading(true);

    // get jwt from localStorage
    console.log(jwt);

    // run get api
    axios
      .get(`${HOST}/api/users`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        // handle success
        console.info(response.data.data);
        setUsers(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        if (error.response.status === 401) {
          navigate("login");
        }
      })
      .finally(function () {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header user={user} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          padding: "3rem",
          backgroundImage: `url(${BackImage})`,
        }}
      >
        <h1>
          {users.length} Registered {pluralize("User", users.length)}
        </h1>
        <div style={{ width: "100%", maxWidth: "550px", backgroundColor: "#eeeeee" }}>
          {isLoading ? (
            <p
              style={{ width: "100%", textAlign: "center", marginTop: "3rem" }}
            >
              Loading users data...
            </p>
          ) : (
            users.map((user, index) => <UserCard key={index} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {

  return (
    <div
      style={{
        position: "relative",
        borderStyle: "solid",
        borderColor: "gray",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <div>
        <p style={{fontSize: "1.2rem"}}>Name :</p>
        <p style={{ display: "inline", fontWeight: "bold", fontSize: "1.1rem", color: "#ff4800" }}>
          {user?.name || "no data"}
        </p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p style={{fontSize: "1.2rem"}}>Username :</p>
        <p style={{ display: "inline", fontWeight: "bold", fontSize: "1.1rem", color: "#ff4800" }}>
          {user?.username || "no data"}
        </p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p style={{fontSize: "1.2rem"}}>Email :</p>
        <p style={{ display: "inline", fontWeight: "bold", fontSize: "1.1rem", color: "#ff4800" }}>
          {user?.email || "no data"}
        </p>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p style={{fontSize: "1.2rem"}}>Date registered :</p>
        <p style={{ display: "inline", fontWeight: "bold", fontSize: "1.1rem", color: "#ff4800" }}>
          {user?.created_at}
        </p>
      </div>
    </div>
  );
};

export default Users;
