'use strict'
import {getError, setError} from './utils';
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

export { NewCardPopup };