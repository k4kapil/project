import React, { useEffect, useState } from "react";
import "./WebLoginPage.css";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function WebLoginPage(props) {
  const [values, setValues] = useState(false);
  const [userData, setUserData] = useState();
  const [emailID, setEmailID] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  let userCredential = [];
  let i = 0;
  let alertStatus = true;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios.get("http://localhost:5000/all/users").then((response) => {
      setUserData(response.data);
    });
  }, []);

  async function loginVerification() {
    for (let i = 0; i < userCredential.length; i++) {
      if (
        emailID === userCredential[i].key &&
        password === userCredential[i].password
      ) {
        props.setUserAuthID(userCredential[i].authid);
        props.setUserAuthIDB(userCredential[i].authidb);
        props.setUserName(userCredential[i].name);
        alertStatus = false;
      }
    }
    if (alertStatus) {
      alert("Please Enter Valid EmailID and Password");
    }
  }
  if (userData != undefined) {
    userData.map((user) => {
      userCredential[i] = {
        key: user.emailid,
        password: user.password,
        authid: user.authid,
        authidb: user.authidb,
        name: user.firstName,
      };
      i++;
    });
  }
  return (
    <div className="loginPage" align="center">
      {/* <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
            style={{
              backgroundColor: "white",
            }}
            id="emailid"
            label="Email-ID"
            variant="filled"
            onChange={(event) => {
              setEmailID(event.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
            style={{
              backgroundColor: "white",
            }}
            id="email-password"
            label="Password"
            variant="filled"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />
        </div>
      </Box> */}
      {/* <div
        className="loginButton"
        align="center"
        onClick={() => {
          loginVerification();
        }}
      >
        <p>Login</p>
      </div> */}

      <Box
        component="form"
        className="size"
        noValidate
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        {/* {incorrectData?<div className="incorrect">Incorrect credentials</div>:<div></div>} */}
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Email-ID
            </InputLabel>
            <OutlinedInput
              id="emailid"
              startAdornment={
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              }
              label="Email-ID"
              onChange={(event) => {
                setEmailID(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              // id="outlined-adornment-password"
              id="email-password"
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  {" "}
                  <LockIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <Link to="/webMainPage" style={{ textDecoration: "none" }}>
          <div>
            <Button
              className="size continue"
              variant="contained"
              onClick={() => {
                loginVerification();
              }}
            >
              Login
            </Button>
          </div>
        </Link>
      </Box>
    </div>
  );
}

export default WebLoginPage;
