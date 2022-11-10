class CardModel {
    CARDS = [];

    findAll = () => this.CARDS;

    create = ({ name, card_no, limit, balance = 0 }) => {
        this.CARDS.push({
            name,
            card_no,
            limit,
            balance
        })

        return {
            name,
            card_no,
            limit,
            balance
        };
    }
}

module.exports = new CardModel;