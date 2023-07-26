// nodemon app.js

const express = require("express");
const { connectToDb, getDb } = require("./database/db");
const bodyParser = require("body-parser");

const port = 1100;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let db;

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`{GET DB}Server listening on port ${port}`);
    });
    db = getDb();
    console.log("DB -> ", db);
  } else {
    console.log("Error connecting to DB");
  }
});

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", (req, res) => {
  let user = req.body;

  db.collection("User")
    .insertOne(user) // Pass the JavaScript object directly here
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ error: "err" });
    });
});

app.get("/user", (req, res) => {
  let data = [];

  db.collection("User")
    .find()
    .forEach((user) => {
      data.push(user);
    })
    .then(() => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ error: "err" });
    });
});
