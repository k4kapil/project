import React, { useState } from "react";
import "./Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from "react-router-dom";

function WebHeader2(props) {
    return (
      <div className="topnav">
        <div className="topnavLeft">
          {/* <img alt="WULogo" className="logoimg" src="https://www.westernunion.com/content/dam/wu/logo/logo.wu.big.svg"></img> */}
          <p className="logoimg">ABC Company</p>
        </div>
        <div className="topnavRight" >
          <ul>
            <li><AccountCircleIcon className="icon"></AccountCircleIcon>
             <a href="#news">  {props.userName}</a>
            </li>

            <li><Link  to="/"
        style={{ textDecoration: "none" }}>
               <button className="logoutButton" >Log Out</button>
              </Link>
             </li>
          </ul>

        </div>

      </div>
    );
  } 


export default WebHeader2;
