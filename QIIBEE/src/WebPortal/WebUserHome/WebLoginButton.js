import React from "react";
import "./WebLoginButton.css";
import { Link, useLocation } from "react-router-dom";

function WebLoginButton(props) {
  return (
    <div align="center">
      <Link
        className="loginButton"
        to="/webLogin"
        style={{ textDecoration: "none" }}
      >
        <p>Web User Login</p>
      </Link>
    </div>
  );
}

export default WebLoginButton;
