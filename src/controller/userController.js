const asyncHandler = require("express-async-handler");
const librarymodel = require("../model/booksModels");

const getAllBooks = asyncHandler(async (req, res, next) => {
  const books = await librarymodel.find();
  res.status(200).json({ books });
});

const getByIdBook = asyncHandler(async (req, res, next) => {
  const book = await librarymodel.findById(req.params.id);

  if (!book) {
    res.status(400).json({ message: "book is not avilable" });
  }
  res.status(200).json(book);
});

module.exports = { getAllBooks, getByIdBook };
