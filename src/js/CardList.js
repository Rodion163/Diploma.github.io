'use strict'
const {Card} = require('./Card');
class CardList {
    constructor(cardsContainer, cards) {
        this.cards = cards;
        this.container = cardsContainer;
        this.render();
    }
    render() {
        this.cards.forEach(card => {
            this.addCard(card.name, card.link);
        });
    }
    addCard(name, link) {
        const card = new Card(name, link);
        this.container.appendChild(card.cardElem);
    }
}

export { CardList };