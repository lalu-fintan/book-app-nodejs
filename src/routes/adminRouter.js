const express = require("express");
const {
  getAllBooks,
  getByIdBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/adminController");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", createBook);
router.get("/:id", getByIdBook);
router.post("/:id", updateBook);
router.post("/:id", deleteBook);

module.exports = router;
