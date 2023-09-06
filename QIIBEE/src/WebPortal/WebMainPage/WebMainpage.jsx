import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./WebMainpage.css";
import { Link } from "react-router-dom";

export default function WebMainpage() {
  return (
    <div className='balanceBox'>
       <Link to="/webPoints" style={{ textDecoration: "none" }}>
        <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://media.istockphoto.com/id/610773840/vector/vector-safe-cartoon-blue-metal-safe-deposit-box-flat-illustration.jpg?s=612x612&w=0&k=20&c=qOtoT1BwIXCs7apHZyIVBIrPcNdCnyUpd5xFiwbYLNE="
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ABC Points
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></Link>
    <Link to="/webCashback" style={{ textDecoration: "none" }}>
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://png.pngtree.com/thumb_back/fw800/background/20220428/pngtree-cashback-in-wallet-cash-money-image_1108523.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ABC Cashback
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
    
    </div>
  );
}