const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
        .getDatabase()
        .db('Project1')
        .collection('contacts')
        .find();

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
        .getDatabase()
        .db('Project1')
        .collection('contacts')
        .find({ _id: contactId });

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const create = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({
            message: 'All fields are required.'
        });
    }

    const contact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    };

    const result = await mongodb
        .getDatabase()
        .db('Project1')
        .collection('contacts')
        .insertOne(contact);

    res.status(201).json({
        id: result.insertedId
    });
};

const update = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await mongodb
        .getDatabase()
        .db('Project1')
        .collection('contacts')
        .updateOne(
            { _id: contactId },
            { $set: contact }
        );

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
};

const remove = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
        .getDatabase()
        .db('Project1')
        .collection('contacts')
        .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    remove
};

