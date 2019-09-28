class CardList {
    constructor(cardsContainer, initialCards) {
        this.cards = initialCards
        this.container = cardsContainer
        this.render()
        /**
         * upd
         * Надо исправить
         * Первым параметром следует передавать элемент в который
         * будут отрисованы карточки, а вторым массив данных
         * const cardList = new CardList(document.querySelector('.places-list'), initialCards)
         * поле CardListElement следует заменить на вызов render
         * без параметров, а в поля класса записать полученные значения
         * как this.cards и this.container
         */
    }
    render() {

        /**
         * upd
         * Надо исправить
         * 
         * В методах класса массив лучше использовать как this.cards
         * а в цикле вызывать метод addCard, чтобы он был доступен
         * можно заменить функцию на стрелочную т.к у нее нет собственного this
         * цикл будет работать с this.addCard или можно передать this
         * в обычную функцию вторым параметром после callback функции
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Syntax
         * 
         * Метод render должен получать карточку на основе передаваемых данных
         * и добавлять в this.container (получать places-list из параметров класса)
         */
        this.cards.forEach((card) => {
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
        this.picElem = picElem
        this.popupElem = popupElem
        this.closeElem = closeElem
        this.close = this.close.bind(this)
        this.create()
        /**
         * upd
         * Надо исправить
         * Запись в поля лучше делать более явной
         * внутри конструктора для лучшей читаемости логики 
         * передавать параметрами в инициализацию
         * имена полей не должны совпадать с названием класса.
         * Поля принято называть с маленькой буквы
         * 
         * constructor(picElem, popupElem, closeElem) {
         *  this.picElem = picElem
         *  this.popupElem = popupElem
         *  this.closeElem = closeElem
         * }
         * 
         * инициализация вне класса:
         * const picElem = document.querySelector('.popup3__image');
         * const popupElem = document.querySelector('.popup3');
         * const closeElem = document.querySelector('.popup3__close');
         * 
         * new ImagePopup(picElem, popupElem, closeElem);
         */
    }
    open = (link) => { // Обычные метода класса open(link) {}
        // имеют полноценный доступ к this
        this.popupElem.classList.add('popup3_is-opened');
        this.picElem.setAttribute('src', link);
    }
    close() {
        this.popupElem.classList.remove('popup3_is-opened');
    }
    create() {
        this.closeElem.addEventListener('click', this.close);
        // upd
        // Запись следует сократить
        // this.closeElem.addEventListener('click', this.close)
        // все селекторы лучше хранить вне классов и передавать параметрами
        // при инициализации

    }
}

class ProfilePopup {
    constructor(elem, about, userSettingsButton, profileCloseBtn, profileEditBtn, profileForm, submit, usernameInput) {
        this.elem = elem
        this.about = about
        this.userSettingsButton = userSettingsButton
        this.profileCloseBtn = profileCloseBtn
        this.profileEditBtn = profileEditBtn
        this.profileForm = profileForm
        this.submit = submit
        this.usernameInput = usernameInput
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.performValidate = this.performValidate.bind(this)
        this.sendProfile = this.sendProfile.bind(this)
        this.create();
        /**
         * upd
         * Надо исправить
         * 
         * Стоит передавать параметры явно в конструктор из внешних переменных
         * иначе классы сильно связаны внешними зависимостями с кодом,
         * что понижает надежность приложения.
         * this.elem = elem и другие поля
         * далее this.create()
         */
    }
    open() {
        this.elem.classList.add('popup2_is-opened');
    }
    close() {
        this.elem.classList.remove('popup2_is-opened');
    }
    performValidate(event) {
        resetError(event.target);
        const error = getError(event.target)
        const disabled = getError(this.usernameInput) === null && getError(this.about) === null
        if (error !== null) {
            setError(event.target, error);
        }
        this.userSettingsButton.classList.toggle('popup2__button_disabled', !disabled);
    }
    sendProfile(event) {
        event.preventDefault();

        const inputs = Array.from(this.profileForm.elements);
        let isValidForm = true;

        inputs.forEach((elem) => {

            if (elem.id !== submit.id && getError(elem)) {
                isValidForm = false;
            }
        });
        if (isValidForm) {
            document.querySelector('.user-info__name').textContent = this.usernameInput.value.trim();
            document.querySelector('.user-info__job').textContent = this.about.value.trim();
            this.close();
        }
    }
    create() {
        this.profileCloseBtn.addEventListener('click', this.close); // аналогично строке 76
        this.profileEditBtn.addEventListener('click', this.open); // аналогично строке 76
        this.usernameInput.value = document.querySelector('.user-info__name').innerHTML;
        this.about.value = document.querySelector('.user-info__job').innerHTML;
        /**
         * upd
         * Метод перегружен правильнее использовать параметры класса
         * вместо переменных и вынести функции валидации и прочие
         * части в отдельные методы класса (функции)
         */
        this.submit.addEventListener('click', this.sendProfileForm);
        this.usernameInput.addEventListener('input', this.performValidate);
        this.about.addEventListener('input', this.performValidate);
    }
}

class NewCardPopup {
    constructor(popup, openButton, closeButton, cardName, cardLink, addBtn) {
        this.popup = popup
        this.openButton = openButton
        this.closeButton = closeButton
        this.cardName = cardName
        this.cardLink = cardLink
        this.addBtn = addBtn
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.create();
    }
    open() {
        this.popup.classList.add('popup_is-opened');
        this.cardName.value = '';
        this.cardLink.value = '';
    }
    close() {
        this.popup.classList.remove('popup_is-opened');
    }
    create() {
        this.openButton.addEventListener('click', this.open)
        this.closeButton.addEventListener('click', this.close)
        /**
         * upd
         * Надо исправить как в комментариях к классам выше
         */
        this.cardName.value = '';
        this.cardLink.value = '';
        this.cardForm = document.forms.new;
        this.cardForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (getErrorLink(this.cardLink) === null && getError(this.cardName) === null) {
                cardList.addCard(this.cardName.value, this.cardLink.value);
                this.close();
                this.cardName.value = '';
                this.cardLink.value = '';
            } else {
                if (getErrorLink(this.cardLink) !== null) {
                    setError(this.cardLink, getErrorLink(this.cardLink))
                }
                if (getError(this.cardName) !== null) {
                    setError(this.cardName, getError(this.cardName))
                }
            }
        });
        function getErrorLink(element) {
            const len = element.value.trim().length;
            if (len === 0) {
                return 'Это обязательное поле';
            }
            return null;
            // Абстрактные функции удобней хранить отдельно
            // для использования в разных классах
        }
    }
}

class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.cardElem = this.create()
        // запись в поле должна быть явной
        // this.cardElem = this.create()
    }
    remove() { // remove() {} 
        this.cardsCont.removeChild(this.cardElement);
        // передача контейнера первым параметром улучшит читаемость кода
    }
    like = () => {
        this.likeButton.classList.toggle('place-card__like-icon_liked');
    }
    create() {
        const card = createElement('div', ['place-card']);
        const cardImg = createElement('div', ['place-card__image']);
        const cardText = createElement('div', ['place-card__description']);
        const delBtn = createElement('button', ['place-card__delete-icon']);
        const text = createElement('h3', ['place-card__name']);
        const likeBtn = createElement('button', ['place-card__like-icon']);
        const cardsContainer = document.querySelector('.places-list.root__section');
        cardImg.setAttribute('style', 'background-image: url(' + this.link + ')');
        text.innerText = this.name;
        /**
         * Каждая функция должна выполнять одну задачу
         * Например возвращать карточку с разметкой и данными
         * return card вместо cardsContainer.appendChild(card);
         * 
         * Отрисовкой карточек в container должен заниматься метод render класса
         * cardList
         */
        card.appendChild(cardImg);
        card.appendChild(cardText);
        cardImg.appendChild(delBtn);
        cardText.appendChild(text);
        cardText.appendChild(likeBtn);

        delBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            this.remove();
        });
        cardImg.addEventListener('click', () => {
            imagePopup.open(this.link)
        });

        this.cardImage = cardImg;
        this.likeButton = likeBtn
        likeBtn.addEventListener('click', this.like);
        this.cardElement = card;
        this.cardsCont = cardsContainer;
        function createElement(type, classList) {
            // Функции хелперы можно разместить в файле utils.js
            const elem = document.createElement(type);
            // classList является близким к системному свойству именем
            // лучше указывать тип передаваемых данных
            // например classesArr
            classList.forEach(clazz => {
                elem.classList.add(clazz);
            });
            // записать можно с помощью spread оператора
            // elem.classList = [...classesArr]
            // http://jsraccoon.ru/es6-spread-rest
            return elem;
        }
        return card;
    }
}
function getError(element) {
    const len = element.value.trim().length;
    if (len === 0) {
        return 'Это обязательное поле';
    } else if (len === 1 || len > 30) {
        return 'Должно быть от 2 до 30 символов';
    }
    return null;
}
function setError(element, error) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    errorElement.textContent = error;
    activateError(element);
}
function activateError(element) {
    element.parentNode.classList.add('input-container__invalid');
}
function resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
}
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];


const picElem = document.querySelector('.popup3__image');
const popupElem = document.querySelector('.popup3');
const closeElem = document.querySelector('.popup3__close');
const userSettingsButton = document.querySelector('.popup2__button');
const profileCloseBtn = document.querySelector('.popup2__close');
const profileEditBtn = document.querySelector('edit')
const about = document.querySelector('.popup2__input_type_about');
const profileForm = document.querySelector('#form');
const submit = document.querySelector('#submit');
const usernameInput = document.querySelector('#username');
const popup = document.querySelector('.popup');
const openButton = document.querySelector('button')
const closeButton = document.querySelector('.popup__close')
const cardName = document.querySelector('.popup__input_type_name');
const cardLink = document.querySelector('.popup__input_type_link-url');
const addBtn = document.querySelector('#addBtn');

const cardList = new CardList(document.querySelector('.places-list'), initialCards);
const imagePopup = new ImagePopup(picElem, popupElem, closeElem);
const elem = new ProfilePopup(document.querySelector('.popup2'), about, userSettingsButton, profileCloseBtn, profileEditBtn, profileForm, submit, usernameInput);
const newCardPopup = new NewCardPopup(popup, openButton, closeButton, cardName, cardLink, addBtn);


/**
 * Хорошее разбиение кода.
 * Классы содержат логику относящуюся к конкретным частям проекта.
 *
 * Обратите внимание на комментарии "Надо исправить"
 * Основной момент это читаемость кода и передача параметров вместо объявления переменных
 * внутри классов. Это ограничивает использование, любой класс принято делать максимально
 * абстрактным без внешних зависимостей.
 *
 */