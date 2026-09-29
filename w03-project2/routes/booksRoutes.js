const express = require("express");

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require("../controllers/booksController");

const isAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", isAuthenticated, createBook);
router.put("/:id", isAuthenticated, updateBook);
router.delete("/:id", isAuthenticated, deleteBook);

module.exports = router;