import React, { useState } from "react";
import "./Header.css";

function WebHeader1(props) {
  const [createPage, setCreatePage] = useState(false);
    return (
      <div className="topnav">
        <div className="topnavLeft">
          {/* <img className="logoimg" src="https://www.westernunion.com/content/dam/wu/logo/logo.wu.big.svg"></img> */}
          <p className="logoimg">ABC Company</p>
        </div>
        <div className="topnavRight" >
          <ul><li></li><li></li></ul>
        </div>
      </div>
    );
  } 


export default WebHeader1;
