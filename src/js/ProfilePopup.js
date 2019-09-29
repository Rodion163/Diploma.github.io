'use strict'
import {getError, setError} from './utils';
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
function resetError(element) {
    element.parentNode.classList.remove("input-container__invalid");
    element.textContent = "";
}

export { ProfilePopup };