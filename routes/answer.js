const { Router } = require("express");
const Answer = require("../database/schemas/Answer");
const User = require("../database/schemas/User");
const router = Router();

// Get all answers
router.get("/", async (request, response) => {
  const answers = await Answer.find();
  response.send(answers);
});

// Get all answers for a question
router.get("/approved/:questionId", async (request, response) => {
  const { questionId } = request.params;

  // Sort based on the createdDate field in descending order
  const answers = await Answer.find({
    questionId,
  })
    .sort({ createdDate: -1 })
    .exec();

    // Get the authorName for each answer and map it to the answer
  const authorIds = answers.map((answer) => answer.author);
  const authors = await User.find({ _id: { $in: authorIds } });

  const authorMap = authors.reduce((map, author) => {
    map[author._id.toString()] = author;
    return map;
  }, {});

  const answersWithAuthors = answers.map((answer) => {
    const author = authorMap[answer.author.toString()];
    return {
      ...answer._doc,
      authorId: author._id,
      author: author.userName,
    };
  });

  response.send(answersWithAuthors);
});

// Post an answer to a question
router.post("/create", async (request, response) => {
  const { questionId, answer, author } = request.body;
  const newAnswer = await Answer.create({ questionId, answer, author });

  // map the author id to the author name
  const user = await User.findById(author);
  const authorName = user.userName;

  response.send({ ...newAnswer._doc, author: authorName });
});

// Delete an answer
router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    response.send(deletedAnswer);
  } catch (error) {
    console.error("Error deleting answer:", error);
    response.status(500).json({ error: "An internal server error occurred." });
  }
});

module.exports = router;
