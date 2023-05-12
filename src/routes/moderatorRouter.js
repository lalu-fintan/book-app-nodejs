const express = require("express");
const {
  getAllBooks,
  getByIdBook,
  createBook,
  updateBook,
} = require("../controller/moderatorController");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getByIdBook);
router.post("/:id", createBook);
router.put("/:id", updateBook);

module.exports = router;
