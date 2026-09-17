const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.post('/', contactsController.create);
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.remove);

module.exports = router;