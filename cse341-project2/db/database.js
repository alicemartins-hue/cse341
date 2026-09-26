const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let database;

async function initDb() {
    try {
        await client.connect();
        database = client.db("book_library");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

function getDatabase() {
    return database;
}

module.exports = {
    initDb,
    getDatabase
};