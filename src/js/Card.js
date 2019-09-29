'use strict'

class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.cardElem = this.create();
        this.like = this.like.bind(this);
    }
    remove() {
        this.cardsCont.removeChild(this.cardElement);
    }
    like() {
        this.likeButton.classList.toggle("place-card__like-icon_liked");
    };
    create() {
        const card = createElement("div", ["place-card"]);
        const cardImg = createElement("div", ["place-card__image"]);
        const cardText = createElement("div", ["place-card__description"]);
        const delBtn = createElement("button", ["place-card__delete-icon"]);
        const text = createElement("h3", ["place-card__name"]);
        const likeBtn = createElement("button", ["place-card__like-icon"]);
        const cardsContainer = document.querySelector(".places-list.root__section");
        cardImg.setAttribute("style", "background-image: url(" + this.link + ")");
        text.innerText = this.name;

        card.appendChild(cardImg);
        card.appendChild(cardText);
        cardImg.appendChild(delBtn);
        cardText.appendChild(text);
        cardText.appendChild(likeBtn);

        delBtn.addEventListener("click", event => {
            event.stopPropagation();
            this.remove();
        });
        cardImg.addEventListener("click", () => {
            imagePopup.open(this.link);
        });

        this.cardImage = cardImg;
        this.likeButton = likeBtn;
        likeBtn.addEventListener("click", this.like);
        this.cardElement = card;
        this.cardsCont = cardsContainer;
        function createElement(type, classList) {
            const elem = document.createElement(type);
            classList.forEach(clazz => {
                elem.classList.add(clazz);
            });
            return elem;
        }
        return card;
    }
}

export { Card };