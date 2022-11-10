const { body } = require('express-validator');
const { luhn_validate } = require('../../utils/common.utils');


exports.createCardSchema = [
    body('name')
        .exists()
        .withMessage('Your name is required')
        .isLength({ min: 3 })
        .withMessage('Your name must be at least 3 chars long'),
    body('card_no')
        .exists()
        .withMessage('Your card number is required')
        .isNumeric()
        .withMessage('Your card number must be only numeric chars')
        .isLength({ max: 19 })
        .withMessage('Your card number must be at most 19 chars long')
        .custom(luhn_validate)
        .withMessage("Your card number is invalid"),
    body('limit')
        .exists()
        .withMessage('limit is required')
        .isNumeric()
        .withMessage('limit must be only numeric chars'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide all required fields')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name', 'card_no', 'limit'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid fields!')
];