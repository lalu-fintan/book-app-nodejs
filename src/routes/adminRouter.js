const express = require("express");
const {
  getAllBooks,
  getByIdBook,
  createBook,
  updateBook,
  deleteBook,
  deleteUser,
} = require("../controller/adminController");
const requireRole = require("../middleware/verifyToken");
const role = require("../helper/role");

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", requireRole(role.ADMIN && role.MODERAOR), createBook);
router.get("/:id", getByIdBook);
router.put("/:id", requireRole(role.ADMIN && role.MODERAOR), updateBook);
router.delete("/:id", requireRole(role.ADMIN), deleteBook);
router.delete("/user/:id", requireRole(role.ADMIN), deleteUser);

module.exports = router;
