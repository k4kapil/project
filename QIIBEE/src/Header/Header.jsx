import React, { useState } from "react";
import "./Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import App from "../App";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const [createPage, setCreatePage] = useState(false);
  if (props.loginPage) {
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
  } else if (props.mainPage) {
    return (
      // <div className="header">
      //   <p>WU</p>
      //   <p>Hi,{props.userName}</p>
      //   <div
      //     className="logoutButton"
      //     onClick={() => {
      //       window.location.reload(false);
      //     }}
      //   >
      //     Log Out
      //   </div>
      // </div>
      <div className="topnav">
        <div className="topnavLeft">
          {/* <img alt="WULogo" className="logoimg" src="https://www.westernunion.com/content/dam/wu/logo/logo.wu.big.svg"></img> */}
          <p className="logoimg">Loyalty Points</p>
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
  } else {
    return (
      // <div className="header">
      //   <p>WU</p>
      //   <div
      //     className="createButton"
      //     onClick={() => {
      //       props.enableCreatePage();
      //     }}
      //   >
      //     Create Account
      //   </div>
      // </div>
      <div className="topnav">
      <div className="topnavLeft">
          {/* <img className="logoimg" src="https://www.westernunion.com/content/dam/wu/logo/logo.wu.big.svg"></img> */}
          <p className="logoimg">Loyalty Points</p>
      </div>
      <div className="topnavRight" >
          <ul>
              <li>
                  
              </li>

              <li><Link  to="/createAccount"
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
}

export default Header;
