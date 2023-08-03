const { Router } = require("express");
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");
const router = Router();

router.get("/", (request, response) => {
  response.send("Hello World AUTH!");
});

// Login user to the applicatiom
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) return response.send(400);
  const userDB = await User.findOne({ email });
  const userDetails = {
    userName: userDB.userName,
    email: userDB.email,
    role: userDB.role,
    userId: userDB._id,
  };
  if (!userDB) return response.send(401);
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    return response.send(200, userDetails, "Authenticated Successfully!");
  } else {
    return response.status(401).send({ msg: "Failed to Authenticate" });
  }
});

// Register a new user
router.post("/register", async (request, response) => {
  const { userName, email } = request.body;
  const userDB = await User.findOne({ $or: [{ userName }, { email }] });
  if (userDB) {
    console.log("User already exists!", userDB);
    response.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(request.body.password);
    console.log("password -> ", password);
    const newUser = await User.create({ userName, password, email });
    response.send(201);
  }
});

// Get all users
router.get("/all", async (request, response) => {
  const users = await User.find().sort({ createdAt: -1 }).exec();
  response.send(users);
});

module.exports = router;

// ADMIN
// "password": "ahamed@",
// "email": "ahamed@gmail.com"

// NORMAL USER
// "password": "yasitha123",
// "email": "yasitha@gmail.com"
