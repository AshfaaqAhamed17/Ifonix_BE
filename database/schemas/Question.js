const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    required: true,
    type: mongoose.SchemaTypes.String,
  },

  description: {
    required: true,
    type: mongoose.SchemaTypes.String,
  },

  author: {
    required: true,
    type: mongoose.SchemaTypes.String,
  },

  IsAdminApproved: {
    default: false,
    type: Boolean,
  },

  Rejectedfeedback: {
    default: "",
    type: mongoose.SchemaTypes.String,
  },

  createdDate: {
    default: new Date(),
    type: mongoose.SchemaTypes.Date,
  },

  updatedDate: {
    default: new Date(),
    type: mongoose.SchemaTypes.Date,
  },
});

module.exports = mongoose.model("questions", QuestionSchema);
