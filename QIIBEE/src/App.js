import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header/Header";
import Header1 from "./Header/Header1";
import Header2 from "./Header/Header2";
import Header3 from "./Header/Header3";
import WebHeader3 from "./WebPortal/WebHeader/WebHeader3";
import Mainpage from "./MainPage/Mainpage";
import Actionbutton from "./MainPage/Actionbutton";
import LoginButton from "./Login/LoginButton";
import CreateUser from "./CreateUser/CreateUser";
import LoginPage from "./Login/LoginPage";
import Home from "./Home/Home";
import { Route, Routes, NavLink } from "react-router-dom";
import WebHeader1 from "./WebPortal/WebHeader/WebHeader1";
import WebLoginButton from "./WebPortal/WebUserHome/WebLoginButton";
import WebCreateUser from "./WebPortal/WebCreateUser/WebCreateUser";
import WebLoginPage from "./WebPortal/WebLogin/WebLoginPage";
import WebHeader2 from "./WebPortal/WebHeader/WebHeader2";
import WebMainpage from "./WebPortal/WebMainPage/WebMainpage";
import WebPoints from "./WebPortal/WebPoints/WebPoints";
import WebCashback from "./WebPortal/WebCashback/WebCashback";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": "a94287d5-c12e-4665-a3c2-320901d8025d",
};
const headersB = {
  "Content-Type": "application/json",
  "x-api-key": "a7925535-f834-4dd4-a4f1-2983cc78860e",
};

function App() {
  const [userDetails, setUserDetails] = useState();
  const [createPage, setCreatePage] = useState(false);
  const [mainPage, setMainPage] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [userAuthID, setUserAuthID] = useState();
  const [userAuthIDB, setUserAuthIDB] = useState();
  const [userName, setUserName] = useState();
  const [tokenID, setTokenID] = useState();
  const [points, setPoints] = useState(10);

  function enableCreatePage() {
    setCreatePage(true);
    console.log(createPage);
  }

  //GetUserDetails
  async function getUserDetails(data) {
    try {
      let response = await axios.get(
        "https://bwaapi-sandbox.qiibee.com/api/admin" + "/users",
        {
          headers: headers,
        }
      );
      setUserDetails(response.data.data.users.length);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }
  getUserDetails();
  return (
    <div className="app">
      {/* <nav className="appLoyalty">
        <NavLink to="/">
          <Home />
        </NavLink>
      </nav> */}
      <Routes>
        <Route path="/" element={[<Home />]} />
        <Route path="/loyaltyportal" element={[<Header3 />, <LoginButton />]} />
        <Route
          path="/login"
          element={[
            <Header1 loginPage={loginPage} />,
            <LoginPage
              setUserAuthID={setUserAuthID}
              setUserAuthIDB={setUserAuthIDB}
              setUserName={setUserName}
            />,
          ]}
        />
        <Route path="/createAccount" element={[<Header1 />, <CreateUser />]} />
        <Route
          path="/loyaltyMainpage"
          element={[
            <Header2 mainPage={mainPage} userName={userName} />,
            <div className="appComponent">
              <Mainpage
                userAuthID={userAuthID}
                userAuthIDB={userAuthIDB}
                setTokenID={setTokenID}
              />
              <Actionbutton
                userAuthID={userAuthID}
                userAuthIDB={userAuthIDB}
                tokenID={tokenID}
                points={points}
              />
            </div>,
          ]}
        />
        <Route
          path="/webportal"
          element={[<WebHeader3 />, <WebLoginButton />]}
        />
        <Route
          path="/webLogin"
          element={[
            <WebHeader1 loginPage={loginPage} />,
            <WebLoginPage
              setUserAuthID={setUserAuthID}
              setUserAuthIDB={setUserAuthIDB}
              setUserName={setUserName}
            />,
          ]}
        />
        <Route
          path="/webCreateAccount"
          element={[<WebHeader1 />, <WebCreateUser />]}
        />
        <Route
          path="/webMainPage"
          element={[
            <WebHeader2 mainPage={mainPage} userName={userName} />,
            <WebMainpage />,
          ]}
        />
        <Route
          path="/webPoints"
          element={[
            <WebHeader2 mainPage={mainPage} userName={userName} />,
            <WebPoints
              userAuthID={userAuthID}
              userAuthIDB={userAuthIDB}
              setTokenID={setTokenID}
              setPoints={setPoints}
            />,
          ]}
        />
        <Route
          path="/webCashback"
          element={[
            <WebHeader2 mainPage={mainPage} userName={userName} />,
            <WebCashback
              userAuthID={userAuthID}
              userAuthIDB={userAuthIDB}
              setTokenID={setTokenID}
              setPoints={setPoints}
            />,
          ]}
        />
      </Routes>
    </div>
  );
}

export default App;
