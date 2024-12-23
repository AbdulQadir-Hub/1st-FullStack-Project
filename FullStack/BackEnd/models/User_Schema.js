const mongoose = require("mongoose");

const User_Schema = new mongoose.Schema({
  UserName: {
    type: String,
  },
  Salary: {
    type: String,
  },
});
User = mongoose.model("UserSchema", User_Schema);
module.exports = User;
