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
const WEEK_DAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export function formatDateShort(date) {
  return `${date.getDate()}, ${WEEK_DAYS[date.getDay()]}`;
}
export function formatDate(date) {
    return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
}
function pad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}
export function formatDateISO(date) {
    return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate())
    );
}