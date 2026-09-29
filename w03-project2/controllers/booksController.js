const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/database");

const getAllBooks = async (req, res) => {
    try {
        const db = getDatabase();
        const books = await db.collection("books").find().toArray();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to get books." });
    }
};

const getBookById = async (req, res) => {
    try {
        const db = getDatabase();
        const book = await db.collection("books").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!book) {
            return res.status(404).json({ error: "Book not found." });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: "Failed to get book." });
    }
};

const createBook = async (req, res) => {
    try {
        const { title, author, genre, year, pages, rating, status } = req.body;

        if (!title || !author || !genre || !year || !pages || rating === undefined || !status) {
            return res.status(400).json({
                error: "All book fields are required."
            });
        }

        const book = {
            title,
            author,
            genre,
            year,
            pages,
            rating,
            status
        };

        const db = getDatabase();
        const result = await db.collection("books").insertOne(book);

        res.status(201).json({
            message: "Book created successfully.",
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create book." });
    }
};

const updateBook = async (req, res) => {
    try {
        const { title, author, genre, year, pages, rating, status } = req.body;

        if (!title || !author || !genre || !year || !pages || rating === undefined || !status) {
            return res.status(400).json({
                error: "All book fields are required."
            });
        }

        const db = getDatabase();

        const result = await db.collection("books").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    title,
                    author,
                    genre,
                    year,
                    pages,
                    rating,
                    status
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Book not found." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to update book." });
    }
};

const deleteBook = async (req, res) => {
    try {
        const db = getDatabase();

        const result = await db.collection("books").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Book not found." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book." });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};