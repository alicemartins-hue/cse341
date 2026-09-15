const express = require('express');
const cors = require('cors');
const { initDB, getDatabase } = require('./data/database');

const app = express();

const PORT = 8080;
app.use(cors());

app.get('/professional', async (req, res) => {
    const db = getDatabase().db('w01-api');
    const professional = await db.collection('professional').findOne({});

    res.json(professional);
});

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });

