import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Link to={"/"}>
        <div className="logo-content">
        <img src="https://img.icons8.com/bubbles/100/000000/reddit.png" alt="reddit logo"/>
          <h3>minireddit</h3>
        </div>
      </Link>
      <SearchBar />
    </div>
  );
}

export default Header;