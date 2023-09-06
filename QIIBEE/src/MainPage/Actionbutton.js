import React, { useEffect, useState } from "react";
import "./Actionbutton.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Actionbutton(props) {
  const [purchaseOpen, setpurchaseOpen] = React.useState(false);
  const [redeemOpen, setredeemOpen] = React.useState(false);
  const [redeemConfirmOpen, setRedemmConfirmOpen] = React.useState(false);
  const [exchangeOpen, setExchangeOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [transactionHistory, setTransactionHistory] = React.useState(false);
  const [debitAmount, setDebitAmount] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [exchangeAmount, setExchangeAmount] = useState();
  const [history, setHistory] = useState();
  const [transactionHistoryData, setTransactionHistoryData] = useState();
  const [userBalanceData, setUserBalanceData] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  console.log(props.points);
  let redeemAmount;
  let exchangeValue;
  let rows;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handlefocusOut = () => {
    setExpanded(false);
  };

  const handlePurchaseOpen = () => {
    setpurchaseOpen(true);
  };
  const handleRedeemOpen = () => {
    setredeemOpen(true);
  };
  const handleRedeemConfirmOpen = () => {
    setRedemmConfirmOpen(true);
  };
  const handleExchangeOpen = () => {
    setExchangeOpen(true);
  };
  const handleHistoryOpen = () => {
    setHistoryOpen(true);
  };
  const handleTransactionHistoryOpen = () => {
    setTransactionHistory(true);
  };
  const handlePurchaseClose = () => {
    setpurchaseOpen(false);
  };
  const handleRedeemClose = () => {
    setredeemOpen(false);
  };
  const handleExchangeClose = () => {
    setExchangeOpen(false);
  };
  const handleHistoryClose = () => {
    setHistoryOpen(false);
  };
  const handleTransactionHistoryClose = () => {
    setTransactionHistory(false);
  };
  const handleRedeemConfirmClose = () => {
    setRedemmConfirmOpen(false);
  };

  useEffect(() => {
    getBalance();
  }, []);
  console.log(userBalanceData);
  async function getBalance() {
    axios.get("http://localhost:5000/getBalance").then((response) => {
      setUserBalanceData(response.data);
      console.log(userBalanceData);
    });
  }
  //getBalance();
  async function dbSaveCashBalance() {
    for (let user of userBalanceData) {
      if (props.userAuthID == user.authid) {
        try {
          await axios.post("http://localhost:5000/cash/updatebalance/", {
            authid: props.userAuthID,
            cashBalance: parseFloat(user.cashBalance) + debitAmount / 10,
          });
          getBalance();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "a94287d5-c12e-4665-a3c2-320901d8025d",
  };
  const headersB = {
    "Content-Type": "application/json",
    "x-api-key": "a7925535-f834-4dd4-a4f1-2983cc78860e",
  };
  //Transaction - Credit transaction
  async function creditTransaction(data) {
    try {
      let response = await axios.post(
        `https://bwaapi-sandbox.qiibee.com/api/admin/transactions/`,
        {
          transaction: {
            user_auth_id: props.userAuthID,
            type: "credit_points",
            amount: props.points,
            token_id: props.tokenID,
            send_email: false,
          },
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }

  //Transaction - debit transaction
  async function debitTransaction(data) {
    try {
      let response = await axios.post(
        `https://bwaapi-sandbox.qiibee.com/api/admin/transactions/`,
        {
          transaction: {
            user_auth_id: props.userAuthID,
            type: "debit_points",
            amount: debitAmount,
            token_id: props.tokenID,
            send_email: false,
          },
        },
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }

  //Transaction-Exchange
  async function exchangeTransaction(data) {
    if (exchangeAmount) {
      try {
        let response = await axios.post(
          `https://bwaapi-sandbox.qiibee.com/api/admin/transactions/`,
          {
            transaction: {
              user_auth_id: props.userAuthID,
              type: "exchange",
              amount: exchangeAmount,
              brandA_token_id: props.tokenID,
              brandB_token_id: 618,
              exchange_rate_override: 1,
              brandB_membership_number: props.userAuthIDB,
            },
          },
          {
            headers: headers,
          }
        );
        //console.log("Exchange is done" + exchangeAmount);
        handleHistoryOpen();
        return response.data;
      } catch (e) {
        console.error(e);
        throw new Error("URL having error");
      }
    } else {
      alert("please enter more than 0");
    }
  }

  //Getting Transaction History
  async function getHistory(data) {
    try {
      let response = await axios.get(
        `https://bwaapi-sandbox.qiibee.com/api/admin/transactions?offset=0&limit=20`,
        {
          headers: headers,
        }
      );
      setHistory(response.data.data.transactions[0].points_burned);
      setTransactionHistoryData(response.data.data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }
  let trHistoryMail = [];
  let j = 0;

  if (transactionHistoryData) {
    for (let i = 0; i < transactionHistoryData.transactions.length; i++) {
      if (
        props.userAuthID ==
          transactionHistoryData.transactions[i].user.auth_id &&
        j < 5
      ) {
        trHistoryMail[i] = {
          id: i,
          mail: transactionHistoryData.transactions[i].user.email,
          time: transactionHistoryData.transactions[i].inserted_at,
          txType: transactionHistoryData.transactions[i].loyalty_event_type,
          debitamount: transactionHistoryData.transactions[i].points_burned,
          creditamount: parseInt(
            transactionHistoryData.transactions[i].amount_received
          ),
        };
        j++;
      }
    }
  }

  return (
    <div className="actionbutton">
      <div
        className="ActButton"
        onClick={() => {
          handlePurchaseOpen();
          creditTransaction();
        }}
      >
        Purchase/Credit
      </div>
      <Dialog
        open={purchaseOpen}
        onClose={handlePurchaseClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reward Credit Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You Purchase is done.{props.points} Points credited in your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePurchaseClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div className="ActButton" onClick={handleRedeemOpen}>
        Redeem/Debit
      </div>
      <Dialog open={redeemOpen} onClose={handleRedeemClose}>
        <DialogTitle>Redeem/Debit Points</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Points need to Redeem/Debit from account
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Redeem Amount"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => {
              redeemAmount = event.target.value;
              setDebitAmount(redeemAmount);
            }}
          />
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardHeader
              avatar={
                <Radio
                  checked={selectedValue === "a"}
                  onChange={handleChange}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              }
              action={
                <Typography sx={{ fontWeight: "bold" }}>
                  $ {debitAmount / 10}
                </Typography>
              }
              title="Cash"
              subheader="10 Points = $1"
            />
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (debitAmount != 0 && debitAmount > 0) {
                handleRedeemClose();
                debitTransaction();
                handleRedeemConfirmOpen();
                getBalance();
                dbSaveCashBalance();
              } else {
                alert("Redeem Value should more than 0");
              }
            }}
          >
            Redeem
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={redeemConfirmOpen}
        onClose={handleRedeemConfirmOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Redeem Debit Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {debitAmount} Points Debited from your account <br></br>$
            {debitAmount / 10}Cashback credited in your account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRedeemConfirmClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div className="ActButton" onClick={handleExchangeOpen}>
        Exchange
      </div>
      <Dialog open={exchangeOpen} onClose={handleExchangeClose}>
        <DialogTitle>Exchange</DialogTitle>
        <DialogContent>
          <DialogContentText>Exchange Your Points</DialogContentText>
          <TextField
            sx={{ mt: 4 }}
            id="outlined-number"
            label="Point"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="10px"
            onChange={(event) => {
              exchangeValue = event.target.value;
              setExchangeAmount(exchangeValue);
            }}
          />
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardHeader
              avatar={
                <Radio
                  checked={selectedValue === "a"}
                  onChange={handleChange}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              }
              action={
                <Typography sx={{ fontWeight: "bold" }}>
                  {exchangeAmount}
                </Typography>
              }
              title="Polygon"
              //subheader="Points 10"
            />
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleExchangeClose();
              exchangeTransaction();
              getHistory();
            }}
          >
            Exchange
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={historyOpen}
        onClose={handleHistoryClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="detailPage"
        //className="tableContainer"
      >
        <DialogTitle id="alert-dialog-title" className="tableHeading">
          {"Exchange Complete Confirmation"}
        </DialogTitle>
        <DialogContent className="tableItem">
          <DialogContentText id="alert-dialog-description">
            You Exchange is done.{exchangeAmount} Points exchanged from your
            account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleHistoryClose();
              setExchangeAmount();
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className="ActButton"
        onClick={() => {
          handleTransactionHistoryOpen();
          getHistory();
        }}
      >
        Transaction History
      </div>
      <Dialog
        fullWidth={true}
        // align="center"
        maxWidth={true}
        open={transactionHistory}
        onClose={handleTransactionHistoryClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="detailPage"
        // className="tableContainer"
      >
        <div className="tableContainer">
          <TableContainer component={Paper}>
            <Table
              // sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="tableHeading">Email</TableCell>
                  <TableCell className="tableHeading">Time</TableCell>
                  <TableCell className="tableHeading">Tx.Type</TableCell>
                  <TableCell className="tableHeading">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tableBody">
                {trHistoryMail.map((row) => (
                  <TableRow
                    key={row.id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className="tableItem"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.mail}
                    </TableCell>
                    <TableCell className="tableItem" align="center">
                      {row.time}
                    </TableCell>
                    <TableCell className="tableItem" align="center">
                      {row.txType}
                    </TableCell>
                    <TableCell className="tableItem" align="center">
                      {row.debitamount != null
                        ? row.debitamount
                        : row.creditamount}
                    </TableCell>
                    {/* <TableCell className="tableItem" align="center">{row.protein}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
}

export default Actionbutton;
