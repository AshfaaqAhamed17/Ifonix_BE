const { Router } = require("express");
const Answer = require("../database/schemas/Answer");
const router = Router();

router.get("/", async (request, response) => {
  const answers = await Answer.find();
  response.send(answers);
});

router.get("/:postId", async (request, response) => {
  const { postId } = request.params;
  const answers = await Answer.find({ postId });
  response.send(answers);
});

router.post("/create", async (request, response) => {
  const { questionId, answer, author } = request.body;
  const newAnswer = await Answer.create({ questionId, answer, author });
  response.send(newAnswer);
});

module.exports = router;
