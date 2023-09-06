import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

function WebHeader3(props) {
 
    return (
      <div className="topnav">
      <div className="topnavLeft">
          {/* <img className="logoimg" src="https://www.westernunion.com/content/dam/wu/logo/logo.wu.big.svg"></img> */}
          <p className="logoimg">ABC Company</p>
      </div>
      <div className="topnavRight" >
          <ul>
              <li>
                  
              </li>

              <li><Link  to="/webCreateAccount"
        style={{ textDecoration: "none" }}>
              <button className="logoutButton" onClick={() => {
            //props.enableCreatePage();
          }}>Create Account</button>
              </Link></li>
          </ul>

      </div>

  </div>
    );
  }

export default WebHeader3;
