const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      require: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    phonenumber: {
      type: Number,
      require: [true, "phone number is require"],
    },
    password: {
      type: String,
      require: [true, "password is require"],
      minlength: 6,
    },
    role: {
      type: Number,
      default: 2,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
