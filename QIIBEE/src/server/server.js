const express = require("express");
const mongoose = require("mongoose");
const users = require("./dbRoom");
const cashes = require("./cashBalanceDB");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dbUrl =
  "mongodb+srv://gokusell:gokusell@streamapps.8vbarbk.mongodb.net/westernunion?retryWrites=true&w=majority";

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.get("/all/users", (req, res) => {
  users.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});

app.post("/user/create/", (req, res) => {
  const userDetails = req.body;
  users.create(userDetails, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});

app.get("/getBalance", (req, res) => {
  cashes.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});
app.post("/cash/createbalance/", (req, res) => {
  const userDetails = req.body;
  cashes.create(userDetails, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});
app.post("/cash/updatebalance/", (req, res) => {
  const cashDetails = req.body;
  console.log(cashDetails);
  cashes.updateOne(
    { authid: cashDetails.authid },
    {
      $set: {
        authid: cashDetails.authid,
        cashBalance: cashDetails.cashBalance,
      },
    },
    { upsert: true },
    (err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(201).send(data);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("server is up and running");
});
