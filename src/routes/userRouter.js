const express = require("express");
const { getAllBooks, getByIdBook } = require("../controller/userController");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getByIdBook);

module.exports = router;
