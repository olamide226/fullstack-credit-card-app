const CardModel = require('../models/cards.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');


/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class CardController {
    getAllCards = async (req, res, next) => {
        let cardList = CardModel.findAll();

        return res.send(cardList);
    };

    createCard = async (req, res, next) => {
        this.checkValidation(req);


        const result = CardModel.create({...req.body});

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        return res.status(201).send(result);
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(422, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CardController;
