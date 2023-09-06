import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./WebCreateUser.css";
import axios from "axios";
import { nanoid } from "nanoid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import walletCreation from "../../Wallet";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": "a94287d5-c12e-4665-a3c2-320901d8025d",
};
const headersB = {
  "Content-Type": "application/json",
  "x-api-key": "a7925535-f834-4dd4-a4f1-2983cc78860e",
};

function WebCreateUser(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [emailid, setEmailID] = useState();
  const [password, setPassword] = useState();
  const [language, setLanguage] = useState();
  const [country, setCountry] = useState();
  const [purchaseOpen, setpurchaseOpen] = React.useState(false);
  const [values, setValues] = useState(false);
  const [authid, setAuthID] = useState(nanoid(45));
  const [authidb, setAuthIDB] = useState(nanoid(45));
  const [showPassword, setShowPassword] = useState(false);
  const [publicAddress, setPublicAddress] = useState();
  const [mnemonic, setMnemonic] = useState();
  const [privateKey, setPrivateKey] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handlePurchaseOpen = () => {
    setpurchaseOpen(true);
  };

  async function walletCreation() {
    const ethers = require("ethers");
    const wallet = ethers.Wallet.createRandom();
    console.log("address:", wallet.address);
    console.log("mnemonic:", wallet.mnemonic.phrase);
    console.log("privateKey:", wallet.privateKey);
    setPublicAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
    setPrivateKey(wallet.privateKey);
  }

  const handlePurchaseClose = () => {
    setpurchaseOpen(false);
  };
  async function balanceCreate() {
    try {
      await axios.post("http://localhost:5000/cash/createbalance/", {
        authid: authid,
        cashBalance: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function dbSaveUserDetails() {
    console.log(publicAddress);
    if (firstName) {
      try {
        await axios.post("http://localhost:5000/user/create", {
          firstName: firstName,
          lastName: lastName,
          emailid: emailid,
          password: password,
          language: language,
          country: country,
          authid: authid,
          authidb: authidb,
          publicaddress: publicAddress,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function createUser(data) {
    try {
      let response = await axios.post(
        `https://bwaapi-sandbox.qiibee.com/api/admin/users`,
        {
          user: {
            email: emailid,
            auth_id: authid,
            first_name: firstName,
            second_name: lastName,
            language: language,
            country_ISO: country,
            metadata: {
              opts_newsletter: false,
            },
          },
        },
        {
          headers: headers,
        }
      );
      let userData = JSON.stringify(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }
  async function createUserB(data) {
    try {
      let response = await axios.post(
        `https://bwaapi-sandbox.qiibee.com/api/admin/users`,
        {
          user: {
            email: emailid,
            auth_id: authidb,
            first_name: firstName,
            second_name: lastName,
            language: language,
            country_ISO: country,
            metadata: {
              opts_newsletter: false,
            },
          },
        },
        {
          headers: headersB,
        }
      );
      let userData = JSON.stringify(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }
  return (
    <div className="createUser" align="center">
      <Box
        className="size"
        component="form"
        noValidate
        autoComplete="off"
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              First Name
            </InputLabel>
            <OutlinedInput
              id="first-name"
              label="First Name"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Second Name
            </InputLabel>
            <OutlinedInput
              id="last-name"
              label="Second Name"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Email-ID
            </InputLabel>
            <OutlinedInput
              id="emailid"
              label="Email-ID"
              onChange={(event) => {
                setEmailID(event.target.value);
              }}
            />
          </FormControl>
        </div>
        {/* <div>
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
        </div> */}
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              // id="outlined-adornment-password"
              id="email-password"
              type={showPassword ? "text" : "password"}
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
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Language
            </InputLabel>
            <OutlinedInput
              id="language"
              label="Language"
              // variant="filled"
              defaultValue="en"
              onChange={(event) => {
                setLanguage(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Country
            </InputLabel>
            <OutlinedInput
              id="country"
              label="Country"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </FormControl>
        </div>
        <div>
          <Button
            className="size continue"
            variant="contained"
            onClick={() => {
              createUser();
              createUserB();
              balanceCreate();
              walletCreation();
              handlePurchaseOpen();
            }}
          >
            Create
          </Button>
        </div>
      </Box>

      <Dialog
        open={purchaseOpen}
        onClose={handlePurchaseClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"User Register Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your User Regitration Completed
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <b>address :</b> {publicAddress} <br />
            <b>mnemonic :</b> {mnemonic}
            <br />
            <b>privateKey :</b> {privateKey}
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handlePurchaseClose();
              dbSaveUserDetails();
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WebCreateUser;
