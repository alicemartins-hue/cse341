const express = require("express");

const router = express.Router();

const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require("../controllers/authorsController");

const isAuthenticated = require("../middleware/authMiddleware");

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", isAuthenticated, createAuthor);
router.put("/:id", isAuthenticated, updateAuthor);
router.delete("/:id", isAuthenticated, deleteAuthor);

module.exports = router;