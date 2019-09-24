class Api {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }
    load() {
        /**
         * Отлично
         * 
         * Из запроса возвращается promise и корректно обрабатываются ошибки
         */
        return fetch(`${this.url}/cohort2/cards`, {
            method: "GET",
            headers: {
                authorization: this.token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.log(err);
            });
    }
    loadProfileInfo() {
        return fetch(`${this.url}/cohort2/users/me`, {
            headers: {
                authorization: this.token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
    }
    saveProfile(name, about) {
        return fetch(`${this.url}/cohort2/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
        /**
         * Надо исправить 
         * 
         * Параметры url и token 
         * следует записывать в поля класса 
         * this.url
         * this.token
         * 
         * во всех методах используется
         * формат из переменной полей класса
         * fetch(`${this.url}/cards`) а в authorization: this.token
         */
    }
}
const userNameElement = document.querySelector(".user-info__name");
const aboutElement = document.querySelector(".user-info__job");
const avatarElement = document.querySelector(".user-info__photo");
const api = new Api('http://95.216.175.5', '4146a013-6856-47c3-9b2e-a37cb7db0b4c');
api.load().then(cards => {
    if (cards && cards.length > 0) {
        new CardList(document.querySelector(".places-list"),
            cards
        )
    } // переменная результата запроса
    // может называться любым именем

    // cardList.addCard();  Надо исправить - лишняя логика
    // render корректно выполняется без этого вызова

    // запускать отрисовку можно только после проверки наличия данных
    // then(cards => {
    //    if (cards && cards.length > 0) { new cardList }
    // })
});

api.loadProfileInfo().then(data => {
    userNameElement.textContent = data.name;
    aboutElement.textContent = data.about;
    avatarElement.setAttribute(
        "style",
        "background-image: url(" + data.avatar + ")"
    );
});

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

class ImagePopup {
    constructor(picElem, popupElem, closeElem) {
        this.picElem = picElem;
        this.popupElem = popupElem;
        this.closeElem = closeElem;
        this.close = this.close.bind(this);
        this.create();
    }
    open = link => {
        this.popupElem.classList.add("popup3_is-opened");
        this.picElem.setAttribute("src", link);
    };
    close() {
        this.popupElem.classList.remove("popup3_is-opened");
    }
    create() {
        this.closeElem.addEventListener("click", this.close);
    }
}

class ProfilePopup {
    constructor(
        elem,
        about,
        userSettingsButton,
        profileCloseBtn,
        profileEditBtn,
        profileForm,
        submit,
        usernameInput
    ) {
        this.elem = elem;
        this.about = about;
        this.userSettingsButton = userSettingsButton;
        this.profileCloseBtn = profileCloseBtn;
        this.profileEditBtn = profileEditBtn;
        this.profileForm = profileForm;
        this.submit = submit;
        this.usernameInput = usernameInput;
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.performValidate = this.performValidate.bind(this);
        this.sendProfile = this.sendProfile.bind(this);
        this.create();
    }
    open() {
        this.usernameInput.value = document.querySelector(
            ".user-info__name"
        ).innerHTML;
        this.about.value = document.querySelector(".user-info__job").innerHTML;
        this.elem.classList.add("popup2_is-opened");
    }
    close() {
        this.elem.classList.remove("popup2_is-opened");
    }
    performValidate(event) {
        resetError(event.target);
        const error = getError(event.target);
        const disabled =
            getError(this.usernameInput) === null && getError(this.about) === null;
        if (error !== null) {
            setError(event.target, error);
        }
        this.userSettingsButton.classList.toggle(
            "popup2__button_disabled",
            !disabled
        );
    }
    sendProfile(event) {
        event.preventDefault();

        const inputs = Array.from(this.profileForm.elements);
        let isValidForm = true;

        inputs.forEach(elem => {
            if (elem.id !== submit.id && getError(elem)) {
                isValidForm = false;
            }
        });
        if (isValidForm) {
            const name = this.usernameInput.value.trim();
            const about = this.about.value.trim();
            api.saveProfile(name, about)
            document.querySelector(
                ".user-info__name"
            ).textContent = name;
            document.querySelector(
                ".user-info__job"
            ).textContent = about;
            this.close();
        }
    }
    create() {
        this.profileCloseBtn.addEventListener("click", this.close);
        this.profileEditBtn.addEventListener("click", this.open);
        this.submit.addEventListener("click", this.sendProfile);
        this.usernameInput.addEventListener("input", this.performValidate);
        this.about.addEventListener("input", this.performValidate);
    }
}

class NewCardPopup {
    constructor(popup, openButton, closeButton, cardName, cardLink, addBtn) {
        this.popup = popup;
        this.openButton = openButton;
        this.closeButton = closeButton;
        this.cardName = cardName;
        this.cardLink = cardLink;
        this.addBtn = addBtn;
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.create();
    }
    open() {
        this.popup.classList.add("popup_is-opened");
        this.cardName.value = "";
        this.cardLink.value = "";
    }
    close() {
        this.popup.classList.remove("popup_is-opened");
    }
    create() {
        this.openButton.addEventListener("click", this.open);
        this.closeButton.addEventListener("click", this.close);
        this.cardName.value = "";
        this.cardLink.value = "";
        this.cardForm = document.forms.new;
        this.cardForm.addEventListener("submit", event => {
            event.preventDefault();
            if (
                getErrorLink(this.cardLink) === null &&
                getError(this.cardName) === null
            ) {
                cardList.addCard(this.cardName.value, this.cardLink.value);
                this.close();
                this.cardName.value = "";
                this.cardLink.value = "";
            } else {
                if (getErrorLink(this.cardLink) !== null) {
                    setError(this.cardLink, getErrorLink(this.cardLink));
                }
                if (getError(this.cardName) !== null) {
                    setError(this.cardName, getError(this.cardName));
                }
            }
        });
        function getErrorLink(element) {
            const len = element.value.trim().length;
            if (len === 0) {
                return "Это обязательное поле";
            }
            return null;
        }
    }
}

class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.cardElem = this.create();
    }
    remove() {
        this.cardsCont.removeChild(this.cardElement);
    }
    like = () => {
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
function getError(element) {
    const len = element.value.trim().length;
    if (len === 0) {
        return "Это обязательное поле";
    } else if (len === 1 || len > 30) {
        return "Должно быть от 2 до 30 символов";
    }
    return null;
}
function setError(element, error) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    errorElement.textContent = error;
    activateError(element);
}
function activateError(element) {
    element.parentNode.classList.add("input-container__invalid");
}
function resetError(element) {
    element.parentNode.classList.remove("input-container__invalid");
    element.textContent = "";
}

const picElem = document.querySelector(".popup3__image");
const popupElem = document.querySelector(".popup3");
const closeElem = document.querySelector(".popup3__close");
const userSettingsButton = document.querySelector(".popup2__button");
const profileCloseBtn = document.querySelector(".popup2__close");
const profileEditBtn = document.querySelector("edit");
const about = document.querySelector(".popup2__input_type_about");
const profileForm = document.querySelector("#form");
const submit = document.querySelector("#submit");
const usernameInput = document.querySelector("#username");
const popup = document.querySelector(".popup");
const openButton = document.querySelector("button");
const closeButton = document.querySelector(".popup__close");
const cardName = document.querySelector(".popup__input_type_name");
const cardLink = document.querySelector(".popup__input_type_link-url");
const addBtn = document.querySelector("#addBtn");
const imagePopup = new ImagePopup(picElem, popupElem, closeElem);
const elem = new ProfilePopup(
    document.querySelector(".popup2"),
    about,
    userSettingsButton,
    profileCloseBtn,
    profileEditBtn,
    profileForm,
    submit,
    usernameInput
);
const newCardPopup = new NewCardPopup(
    popup,
    openButton,
    closeButton,
    cardName,
    cardLink,
    addBtn
);
