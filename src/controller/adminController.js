const asyncHandler = require("express-async-handler");
const librarymodel = require("../model/booksModels");
const authModule = require("../model/authModule");
const role = require("../helper/role");

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

const createBook = asyncHandler(async (req, res, next) => {
  const { title, description, amount } = req.body;
  if (!title || !description) {
    res.status(400).json({ message: "all fields are required" });
  }
  const newBook = await librarymodel.create({
    title,
    description,
    amount,
  });
  res.status(200).json(newBook);
});

const updateBook = asyncHandler(async (req, res, next) => {
  const book = await librarymodel.findById(req.params.id);
  if (!book) {
    res.status(400).json({ message: "con't found the book" });
  }
  const update = await librarymodel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ update });
});

const deleteBook = asyncHandler(async (req, res, next) => {
  const book = await librarymodel.findById(req.params.id);
  console.log(book);
  if (!book) {
    res.status(400).json({ message: "con't found the book" });
  }
  const deleteBooks = await librarymodel.findByIdAndRemove(
    req.params.id,
    req.body
  );
  res.status(200).json({ message: "data has been deleted" });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await authModule.findById(req.params.id);
  if (!user) {
    res.status(400).json({ message: "user not found" });
  }
  if (user.role === role.ADMIN) {
    res
      .status(400)
      .json({ message: "you don't have a access to delete the admin" });
  }
  const removeUser = await authModule.findByIdAndRemove(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "user has been deleted" });
});

module.exports = {
  getAllBooks,
  getByIdBook,
  createBook,
  updateBook,
  deleteBook,
  deleteUser,
};
