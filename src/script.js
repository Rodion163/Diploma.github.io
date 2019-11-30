import "./styles/index.css";
import { runInThisContext } from "vm";

class InputForm {
    constructor(searchButton, input) {
        this.searchButton = searchButton;
        this.input = input;
        this.searchButton.addEventListener('submit', this.validate);
    }
    validate() {
        if (this.input.value !== '') {
            console.log('запрос');
        } else {
            console.log('Нужно ввести ключевое слово');
        }
    }
}
const searchButton = document.querySelector('.search__button');
const input = document.querySelector('#input');
const inputForm = new InputForm(searchButton, input);

class Api {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }
    load() {
        return fetch(`${this.url}`, {
            method: "GET",
            headers: {
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
const api = new Api('https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=2019-11-29&' +
    'sortBy=popularity&' +
    'apiKey=9e16fa8cb67e41e39aba5e0b42032cf4', '9e16fa8cb67e41e39aba5e0b42032cf4');


class SearchForm {
    constructor(input, form, onSearch) {

    }
}
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


