// nodemon app.js

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const authRoute = require("./routes/auth");
const questionRoute = require("./routes/question");
const answerRoute = require("./routes/answer");

require("./database");

const app = express();

// Add a middleware to set the CORS headers
app.use((req, res, next) => {
  // Allow requests from all origins (replace '*' with your frontend domain if you want to restrict it)
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow specific HTTP methods (e.g., GET, POST, OPTIONS, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  // Allow specific HTTP headers (e.g., Content-Type, Authorization, etc.)
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Allow credentials (if needed)
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const PORT = 1100;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser());
// app.use(
//   session({
//     secret: 'APODAJDSDASMCZXMZADASDASDPASDOASDSAK',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use('/api/v1/answer', answerRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
