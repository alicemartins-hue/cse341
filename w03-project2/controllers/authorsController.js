const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db/database");

const getAllAuthors = async (req, res) => {
    try {
        const db = getDatabase();
        const authors = await db.collection("authors").find().toArray();

        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: "Failed to get authors." });
    }
};

const getAuthorById = async (req, res) => {
    try {
        const db = getDatabase();

        const author = await db.collection("authors").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!author) {
            return res.status(404).json({ error: "Author not found." });
        }

        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: "Failed to get author." });
    }
};

const createAuthor = async (req, res) => {
    try {
        const { name, birthYear, nationality, booksCount } = req.body;

        if (!name || !birthYear || !nationality || booksCount === undefined) {
            return res.status(400).json({
                error: "All author fields are required."
            });
        }

        const author = {
            name,
            birthYear,
            nationality,
            booksCount
        };

        const db = getDatabase();
        const result = await db.collection("authors").insertOne(author);

        res.status(201).json({
            message: "Author created successfully.",
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create author." });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { name, birthYear, nationality, booksCount } = req.body;

        if (!name || !birthYear || !nationality || booksCount === undefined) {
            return res.status(400).json({
                error: "All author fields are required."
            });
        }

        const db = getDatabase();

        const result = await db.collection("authors").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    name,
                    birthYear,
                    nationality,
                    booksCount
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Author not found." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to update author." });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const db = getDatabase();

        const result = await db.collection("authors").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Author not found." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete author." });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};