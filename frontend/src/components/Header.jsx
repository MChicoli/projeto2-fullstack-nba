import React from "react";
import nbaLogo from "../assets/nba-logo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src={nbaLogo} alt="NBA Logo" className="logo" />
      <h1>NBA Player Search</h1>
    </header>
  );
}

export default Header;
