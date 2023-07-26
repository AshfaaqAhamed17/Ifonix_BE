const { Router } = require("express");
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");
const router = Router();

router.get("/", (request, response) => {
  response.send("Hello World AUTH!");
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) return response.send(400);
  const userDB = await User.findOne({ email });
  if (!userDB) return response.send(401);
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    console.log("Authenticated Successfully!");
    // request.session.user = userDB;
    return response.send(200);
  } else {
    console.log("Failed to Authenticate");
    return response.send(401);
  }
});

router.post("/register", async (request, response) => {
  const { userName, email } = request.body;
  console.log("request.body -> ", request.body);
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

module.exports = router;

// "password": "ahamed@",
// "email": "ahamed@gmail.com"
