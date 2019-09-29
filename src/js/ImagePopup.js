'use strict'

class ImagePopup {
    constructor(picElem, popupElem, closeElem) {
        this.picElem = picElem;
        this.popupElem = popupElem;
        this.closeElem = closeElem;
        this.close = this.close.bind(this);
        this.opne = this.open.bind(this)
        this.create();
    }
    open(link) {
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

export { ImagePopup };