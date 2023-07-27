const { Router } = require("express");
const Question = require("../database/schemas/Question");
const router = Router();

router.get("/", async (request, response) => {
  const questions = await Question.find();
  response.send(questions);
});

router.get("/adminApproved", async (request, response) => {
  const questions = await Question.find({ IsAdminApproved: true });
  response.send(questions);
});

router.get("/adminUnapproved", async (request, response) => {
  const questions = await Question.find({ IsAdminApproved: false });
  response.send(questions);
});

router.post("/create", async (request, response) => {
  const { title, description, author } = request.body;
  const newQuestion = await Question.create({ title, description, author });
  response.send(newQuestion);
});

module.exports = router;
