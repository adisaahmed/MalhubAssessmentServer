const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  memtype: { type: String },
  token: { type: String },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
