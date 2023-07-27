const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    questionId: {
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
    },
    
    answer: {
        required: true,
        type: mongoose.SchemaTypes.String,
    },
    author: {
        required: true,
        type: mongoose.SchemaTypes.String,
    }
});

module.exports = mongoose.model("answers", AnswerSchema);
