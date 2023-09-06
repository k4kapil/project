import React from "react";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";

function Home(props) {
  return (
    <div align="center">
      <Link
        className="loginButton"
        to="/webportal"
        style={{ textDecoration: "none" }}
      >
        <p>ABC.com</p>
      </Link>
      <Link
        className="loginButton"
        to="/loyaltyportal"
        style={{ textDecoration: "none" }}
      >
        <p>Loyalty Portal</p>
      </Link>
    </div>
  );
}

export default Home;
