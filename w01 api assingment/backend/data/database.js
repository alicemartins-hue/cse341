const dns = require('dns');

dns.setServers(['8.8.8.8']);

const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDB = async () => {
    if (database) {
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client;
    console.log('Database connected');
};

const getDatabase = () => {
    return database;
};

module.exports = {
    initDB,
    getDatabase
};