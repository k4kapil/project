import React, { useState } from "react";
import "./Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import App from "../App";
import { Link, useLocation } from "react-router-dom";

function Header1(props) {
  const [createPage, setCreatePage] = useState(false);
    return (
      <div className="topnav">
        <div className="topnavLeft">
          {/* <img className="logoimg" src="https://www.westernunion.com/content/dam/wu/logo/logo.wu.big.svg"></img> */}
          <p className="logoimg">Loyalty Points</p>
        </div>
        <div className="topnavRight" >
          <ul><li></li><li></li></ul>
        </div>
      </div>
    );
  } 


export default Header1;
