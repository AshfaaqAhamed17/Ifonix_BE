const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  role: {
    type: mongoose.SchemaTypes.String,
    default: "user",
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", UserSchema);
