const { Router } = require("express");
const Question = require("../database/schemas/Question");
const User = require("../database/schemas/User");
const router = Router();

router.get("/", async (request, response) => {
  const questions = await Question.find();
  response.send(questions);
});

router.get("/adminApproved", async (request, response) => {
  try {
    // Find questions with IsAdminApproved set to true
    const questions = await Question.find({ IsAdminApproved: true });

    // Extract all author IDs from the questions
    const authorIds = questions.map((question) => question.author);

    // Find all users whose _id is in authorIds
    const authors = await User.find({ _id: { $in: authorIds } });

    // Create a map of author IDs to author objects for easy lookup
    const authorMap = authors.reduce((map, author) => {
      map[author._id.toString()] = author;
      return map;
    }, {});

    // Include the author's name in the questions
    const questionsWithAuthors = questions.map((question) => {
      const author = authorMap[question.author.toString()];
      return {
        ...question._doc,
        authorId: author._id,
        author: author.userName,
      };
    });

    response.send(questionsWithAuthors);
  } catch (error) {
    console.error("Error fetching admin-approved questions:", error);
    response.status(500).json({ error: "An internal server error occurred." });
  }
});

router.get("/adminUnapproved", async (request, response) => {
  try {
    const questions = await Question.find({
      $and: [{ IsAdminApproved: false }, { IsRejected: false }],
    });

    // Extract all author IDs from the questions
    const authorIds = questions.map((question) => question.author);

    // Find all users whose _id is in authorIds
    const authors = await User.find({ _id: { $in: authorIds } });

    // Create a map of author IDs to author objects for easy lookup
    const authorMap = authors.reduce((map, author) => {
      map[author._id.toString()] = author;
      return map;
    }, {});

    // Include the author's name in the questions
    const questionsWithAuthors = questions.map((question) => {
      const author = authorMap[question.author.toString()];
      return {
        ...question._doc,
        authorId: author.userId,
        author: author.userName,
      };
    });

    response.send(questionsWithAuthors);
  } catch (error) {
    console.error("Error fetching admin-approved questions:", error);
    response.status(500).json({ error: "An internal server error occurred." });
  }
});

router.get("/adminRejected", async (request, response) => {
  try {
    const questions = await Question.find({ IsRejected: true });
    // Extract all author IDs from the questions
    const authorIds = questions.map((question) => question.author);

    // Find all users whose _id is in authorIds
    const authors = await User.find({ _id: { $in: authorIds } });

    // Create a map of author IDs to author objects for easy lookup
    const authorMap = authors.reduce((map, author) => {
      map[author._id.toString()] = author;
      return map;
    }, {});

    // Include the author's name in the questions
    const questionsWithAuthors = questions.map((question) => {
      const author = authorMap[question.author.toString()];
      return {
        ...question._doc,
        authorId: author.userId,
        author: author.userName,
      };
    });

    response.send(questionsWithAuthors);
  } catch (error) {
    console.error("Error fetching admin-approved questions:", error);
    response.status(500).json({ error: "An internal server error occurred." });
  }
});

router.post("/create", async (request, response) => {
  const { title, description, author, IsAdminApproved } = request.body;
  const newQuestion = await Question.create({
    title,
    description,
    author,
    IsAdminApproved,
  });
  response.send(newQuestion);
});

// approve the post
router.put("/approve/:id", async (request, response) => {
  const { id } = request.params;
  const question = await Question.findByIdAndUpdate(id, {
    IsAdminApproved: true,
    rejectedfeedback: "",
    IsRejected: false,
  });
  response.send(question);
});

// delete the post
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const question = await Question.findByIdAndDelete(id);
  response.send(question);
});

// reject the post with feedback
router.put("/reject/:id", async (request, response) => {
  const { id } = request.params;
  const { rejectedfeedback, IsRejected } = request.body;
  console.log("rejectedfeedback -> ", rejectedfeedback);

  const question = await Question.findByIdAndUpdate(id, {
    IsAdminApproved: false,
    rejectedfeedback: rejectedfeedback,
    IsRejected: IsRejected,
  });
  response.send(question);
});

// get the rejected feedback by userId
router.get("/rejectedfeedback/:id", async (request, response) => {
  const { id } = request.params;
  const question = await Question.find({
    author: { $in: id },
    $and: [{ IsRejected: true }],
  });

  response.send(question);
});


module.exports = router;
