import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import "./Mainpage.css";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": "a94287d5-c12e-4665-a3c2-320901d8025d",
};
const headersB = {
  "Content-Type": "application/json",
  "x-api-key": "a7925535-f834-4dd4-a4f1-2983cc78860e",
};

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

export default function Mainpage(props) {
  const [userBalance, setUserBalance] = useState(0);
  const [userBalanceB, setUserBalanceB] = useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handlefocusOut = () => {
    setExpanded(false);
  };

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
  //Getting User balanceB
  async function getUserBalanceB(data) {
    try {
      let response = await axios.get(
        `https://bwaapi-sandbox.qiibee.com/api/admin/users/${props.userAuthIDB}/balances`,
        {
          headers: headersB,
        }
      );
      setUserBalanceB(response.data.data[0].balance);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("URL having error");
    }
  }
  useEffect(() => {
    setUserBalance();
    setUserBalanceB();
  }, []);

  getUserBalance();
  getUserBalanceB();
  return (
    <div className="balanceBox" align="center">
      <Card className="balanceCard"
        sx={{ maxWidth: 345 ,maxHeight:250}}
        align="center"
        onClick={handleExpandClick}
       >
        <CardHeader className="cardHeader" title="Get User Balance" />
        <CardActions className="expand" disableSpacing>
          <ExpandMore className="expand"
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandCircleDownIcon className="expandButton"/>
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className="collapseCard">
            <Typography paragraph font fontSize={30}>
              Balance
            </Typography>
            <Typography fontWeight={400} fontSize={20}>
              ABC Points: {userBalance}
            </Typography>
            <Typography fontWeight={400} fontSize={20}>
              MAX Points: {userBalanceB}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
