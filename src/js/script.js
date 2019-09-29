
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'
const userNameElement = document.querySelector(".user-info__name");
const aboutElement = document.querySelector(".user-info__job");
const avatarElement = document.querySelector(".user-info__photo");
const { Api } = require('./Api');
const { ProfilePopup } = require('./ProfilePopup');
const { ImagePopup } = require('./ImagePopup');
const { NewCardPopup } = require('./NewCardPopup');
const { CardList } = require('./CardList');

const api = new Api(serverUrl, '4146a013-6856-47c3-9b2e-a37cb7db0b4c');
api.load().then(cards => {
    if (cards && cards.length > 0) {
        new CardList(document.querySelector(".places-list"),
            cards
        )
    }
});

api.loadProfileInfo().then(data => {
    userNameElement.textContent = data.name;
    aboutElement.textContent = data.about;
    avatarElement.setAttribute(
        "style",
        "background-image: url(" + data.avatar + ")"
    );
});





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