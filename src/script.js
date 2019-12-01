import "./styles/index.css";
import { runInThisContext } from "vm";

class InputForm {
    constructor(onSubmit, form, input) {
        this.input = input;
        form.addEventListener('submit', event => {
            event.preventDefault()
            if (this.input.value !== '') {
                onSubmit(input.value);
            } else { '' }
        })

    }
}
const form = document.querySelector('#form');
const input = document.querySelector('#input');
/* new InputForm((value) => console.log(value), input, form); */


function pad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function formatDate(date) {
    return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate())
    );
}

class Api {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }
    load(searchText) {
        const page = 1;
        const today = new Date();
        const weekEarlier = new Date(today.valueOf() - 60 * 60 * 24 * 7 * 1000);
        return fetch(`${this.url}/v2/everything?q=${searchText}&page=${page}&from=${formatDate(weekEarlier)}&to=${formatDate(today)}&pageSize=100&apiKey=${this.token}`, {
            method: "GET",

            headers: {
                mode: 'cors',
                site: 'cross-site',
                authorization: this.token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.log(err);
            });
    }
}
const api = new Api('https://newsapi.org', '9e16fa8cb67e41e39aba5e0b42032cf4');
new InputForm(searchText => api.load(searchText, 0).then(result => console.log(result)), form, input);



class NewsCards {
    constructor(urlToImage, description, publishedAt, title, sourceName) {
        this.urlToImage = urlToImage;
        this.description = description;
        this.publishedAt = publishedAt;
        this.title = title;
        this.sourceName = sourceName;
        this.create();
    }
    create() {
        const card = createElement("div", ["card"]);
        const picture = createElement("picture", [""]);
        const cardImg = createElement("img", ["card__image"]);
        const cardDate = createElement("div", ["card__date"]);
        const cardTitle = createElement("h2", ["card__title"]);
        const cardText = createElement("p", ["card__text"]);
        const cardSource = createElement("div", ["card__source"]);
        cardImg.setAttribute("style", "background-image: url(" + this.urlToImage + ")");
        cardDate.innerText = this.publishedAt;
        cardTitle.innerText = this.title;
        cardText.innerText = this.description;
        cardSource.innerText = this.sourceName;

        card.appendChild(picture);
        picture.appendChild(cardImg);
        card.appendChild(cardDate);
        card.appendChild(cardTitle);
        card.appendChild(cardText);
        card.appendChild(cardSource);
    }
}


