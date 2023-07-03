import React, { useState } from "react";
import instaPly from "./instaPly.svg";
import search from "./search.svg";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({
  onSearch,
  showSearch,
  setInput,
  setSearchPageNo,
  localData,
  input,
}) => {
  return (
    <header className="header">
      <img src={instaPly} style={{ cursor: "pointer" }}></img>
      <div
        className="searchContainer"
        style={{ display: showSearch ? "flex" : "none" }}
      >
        <div className="searchBar">
          <input
            className="search"
            type="text"
            placeholder="search movies"
            value={localData?.input ? localData.input : input}
            readOnly={false}
            onChange={(e) => {
              setInput(e.target.value);
              setSearchPageNo(1);
              onSearch();
            }}
          />
          <div className="searchImage">
            <img src={search}></img>
          </div>
        </div>
        <NavLink to="/" onClick={() => sessionStorage.clear()}>
          Logout
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
