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

export {getError, setError, activateError}