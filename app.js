// nodemon app.js

const express = require("express");
const { connectToDb, getDb } = require("./db");
const e = require("express");
const port = 3500;

const app = express();

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

  // res.json({ user: `${port} User page` });
});
