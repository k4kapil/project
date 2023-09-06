import React from "react";
import "./LoginButton.css";
import { Link, useLocation } from "react-router-dom";

function LoginButton(props) {
  return (
    <div align="center">
      <Link
        className="loginButton"
        to="/login"
        style={{ textDecoration: "none" }}
      >
        <p>User Login</p>
      </Link>
    </div>
  );
}

export default LoginButton;
