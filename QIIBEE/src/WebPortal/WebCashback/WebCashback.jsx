import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./WebCashback.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CollectionCard from "../CollectionCard/CollectionCard";

export default function WebCashback(props) {
  const [userBalanceData, setUserBalanceData] = useState();
  const [cash, setCash] = useState();

  useEffect(() => {
    getBalance();
  }, [userBalanceData]);

  async function getBalance() {
    axios.get("http://localhost:5000/getBalance").then((response) => {
      setUserBalanceData(response.data);
      setBalance();
    });
  }


  async function setBalance(){
    if(userBalanceData!==undefined){
      for (let user of userBalanceData) {
        if (props.userAuthID == user.authid){
          setCash(user.cashBalance);
        }
      }
    }
  }
 
  return (
    <div >
      <div className='balanceBox'>
      <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://img.freepik.com/premium-vector/money-dollar-bill-cartoon-vector-illustration_401949-17.jpg?w=740"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            ABC Cashback <b>${cash}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </div>
    <div className='balanceHeader' ><h2>Use Case back below E-commerce site</h2></div>
    <div  className='balanceBox'>
    <Link to="https://www.amazon.in/" style={{ textDecoration: "none" }}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://m.media-amazon.com/images/I/51J6cQ63OJL.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Amazon
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    
    <Link to="https://www.flipkart.com/" style={{ textDecoration: "none" }}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://yt3.googleusercontent.com/cT40lDWqE99Ch52R3ftuAExjmjF-yZiY5rUSv_0Q3NXhcqzmiax8ReXuS4Qe53Fizcaw4hEX=s900-c-k-c0x00ffffff-no-rj"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Filpkart
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    <Link to="https://www.croma.com/" style={{ textDecoration: "none" }}>
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://m.media-amazon.com/images/S/abs-image-upload-na/8/AmazonStores/A21TJRUUN4KGV/19dae191bb75eda8e3fc9ffc1e335b9f.w400.h400.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Croma
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    </div>
    </div>
)}
