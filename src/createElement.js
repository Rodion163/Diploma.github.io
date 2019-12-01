export function createElement(type, classList) {
    const elem = document.createElement(type);
    classList.forEach(clazz => {
        elem.classList.add(clazz);
    });
    return elem;
}