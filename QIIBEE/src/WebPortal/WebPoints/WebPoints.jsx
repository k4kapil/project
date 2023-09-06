import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./WebPoints.css";
import axios from "axios";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": "a94287d5-c12e-4665-a3c2-320901d8025d",
};
const headersB = {
  "Content-Type": "application/json",
  "x-api-key": "a7925535-f834-4dd4-a4f1-2983cc78860e",
};
const options = [
  '10',
  '20',
  '30',
  '40',
  '50',
  '100',

];



export default function WebPoints(props) {
  const [userBalance, setUserBalance] = useState(0);
  const [userBalanceB, setUserBalanceB] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

   //Getting User balance
   async function getUserBalance(data) {
    try {
      let response = await axios.get(
        `https://bwaapi-sandbox.qiibee.com/api/admin/users/${props.userAuthID}/balances`,
        {
          headers: headers,
        }
      );
      setUserBalance(response.data.data[0].balance);
      props.setTokenID(response.data.data[0].token.id);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }
  useEffect(() => {
    setUserBalance();
  }, []);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      console.log(newValue);
      setValue(newValue);
      props.setPoints(newValue);
      
    }
  };

  getUserBalance();
  return (
    <div className='balanceBox'>
<Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://media.istockphoto.com/id/1320493913/vector/young-female-character-is-standing-near-feedback-scale.jpg?s=612x612&w=0&k=20&c=9gVwTR_341aywW0T2zC7yR8ETNVnzwbOWCWrrZ5Lb3Y="
        />
        <CardContent>
          <Typography gutterBottom variant="h8" component="div">
            Current Points <b>{userBalance}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea onClick={handleClickListItem}>  
     
        <CardMedia
          component="img"
          height="200"
          image="https://media.istockphoto.com/id/1307251461/vector/vector-illustration-of-points-coin-and-piggy-bank.jpg?s=612x612&w=0&k=20&c=E3wfGN8W2qLu-0rfWQwh_S2pfZlabJtDTCHDeuCMBfM="
        />
        <CardContent >
          <Typography gutterBottom variant="h8" component="div">
            Earn Points
          </Typography>
        </CardContent>
      </CardActionArea>
      <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
    </Card>
    </div>
  );
}

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    console.log("Handle Close")
    onClose();
  };

  const handleOk = () => {
    
    onClose(value);
    <Link to="/loyaltyMainpage" style={{ textDecoration: "none" }}></Link>
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Choose Points to Earn</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option+" Points"}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Link to="/loyaltyMainpage" style={{ textDecoration: "none" }}><Button onClick={handleOk}>Ok</Button></Link>
        
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

