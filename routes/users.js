const express = require('express');
const router = express.Router();
const app = express();

const usersController = require('../controllers/users');
router.get('/users', usersController.getAll);
router.get('/:id', usersController.getSingle);

module.exports = router;