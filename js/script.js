
const userNameElement = document.querySelector(".user-info__name");
const aboutElement = document.querySelector(".user-info__job");
const avatarElement = document.querySelector(".user-info__photo");
const api = new Api('http://95.216.175.5', '4146a013-6856-47c3-9b2e-a37cb7db0b4c');
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