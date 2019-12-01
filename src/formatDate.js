const MONTHS = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];

export function formatDate(date) {
    return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
}