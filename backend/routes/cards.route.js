const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cards.controller');
const awaitHandlerFactory = require('../middleware/route_handler.middleware');

const { createCardSchema } = require('../middleware/validators/cardsValidator.middleware');


router.post('/', createCardSchema, awaitHandlerFactory(cardController.createCard)); //api/v1/cards
router.get('/', awaitHandlerFactory(cardController.getAllCards)); //api/v1/cards

module.exports = router;
