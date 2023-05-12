const mongoose = require("mongoose");

const librarymodel = mongoose.Schema({
  title: {
    type: String,
    require: [true, "title is required"],
    unique: true,
  },
  description: {
    type: String,
    require: [true, "description is required"],
  },
  amount: {
    type: Number,
  },
  thumbnail: {
    type: String,
    data: Buffer,
  },
});

module.exports = mongoose.model("library", librarymodel);
