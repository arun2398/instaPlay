import React, { useState } from "react";
import instaPly from "./instaPly.svg";
import search from "./search.svg";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Header = ({
  onSearch,
  showSearch,
  setInput,
  setSearchPageNo,
  localData,
  input,
  setLoader,
  setTitle,
}) => {
  const logOut = () =>
    toast.success(" Logout Successfull", {
      toastId: "xyz",
      position: "top-center",
      autoClose: 500,
      // hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "dark",
    });
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo ">
        <img
          src={instaPly}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/movies")}
        />
      </div>
      <div
        className="searchContainer"
        style={{ display: showSearch ? "flex" : "none" }}
      >
        <div className="searchBar">
          <input
            className="search"
            type="text"
            placeholder="search movies"
            value={input}
            readOnly={false}
            onChange={(e) => {
              setLoader(true);
              setTitle("");
              setInput(e.target.value);
              setSearchPageNo(1);
            }}
          />
          <div className="searchImage">
            <img src={search}></img>
          </div>
        </div>
        <NavLink
          to="/"
          onClick={() => {
            logOut();
            sessionStorage.clear();
            localStorage.clear();
          }}
        >
          Logout
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
