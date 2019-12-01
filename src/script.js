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










class LoadResult {
    constructor(preloader, news, onLoadMoreClick) {
        this.preloader = preloader;
        this.news = news;
        this.onLoadMoreClick = onLoadMoreClick;
        this.newsCards = news.querySelector('.news__cards');
    }
    addCard(urlToImage, description, publishedAt, title, sourceName) {
        const newsCard = new NewsCard(urlToImage, description, publishedAt, title, sourceName);
        this.newsCards.appendChild(newsCard.card);
    }
    addCards(cards) {
        cards.forEach(card => {
            console.log(card);
            this.addCard(card.urlToImage, card.description, card.publishedAt, card.title, card.source.name);
        })
    }
}
const news = document.querySelector('#news');
const preloader = document.querySelector('#preloader');



class Search {
    constructor(news, preloader) {
        this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.news = news;
        this.preloader = preloader;
        this.cardRendered = 0;
        this.InputForm = new InputForm(this.onSearch, form, input);
        this.loadResult = new LoadResult(preloader, news, this.onLoadMoreClick);
    }
    onLoadMoreClick() {

    }
    onSearch(searchText) {
        const cachedNews = sessionStorage.getItem(searchText);
        if (cachedNews) {
            const parsedNews = JSON.parse(cachedNews);
            this.loadResult.addCards(parsedNews.articles.slice(0, 2));
            this.cardRendered = 3;
        } else {
            api.load(searchText).then(result => {
                sessionStorage.setItem(searchText, JSON.stringify(result));
                this.loadResult.addCards(result.articles.slice(0, 2));
                this.cardRendered = 3;
            })
        }
    }
}


function createElement(type, classList) {
    const elem = document.createElement(type);
    classList.forEach(clazz => {
        elem.classList.add(clazz);
    });
    return elem;
}
class NewsCard {
    constructor(urlToImage, description, publishedAt, title, sourceName) {
        this.urlToImage = urlToImage;
        this.description = description;
        this.publishedAt = publishedAt;
        this.title = title;
        this.sourceName = sourceName;
        this.create();
    }
    create() {
        this.card = createElement("div", ["card"]);
        const picture = createElement("picture", []);
        const cardImg = createElement("img", ["card__image"]);
        const cardDate = createElement("div", ["card__date"]);
        const cardTitle = createElement("h2", ["card__title"]);
        const cardText = createElement("p", ["card__text"]);
        const cardSource = createElement("div", ["card__source"]);
        cardImg.setAttribute("src", this.urlToImage);
        cardDate.innerText = this.publishedAt;
        cardTitle.innerText = this.title;
        cardText.innerText = this.description;
        cardSource.innerText = this.sourceName;

        this.card.appendChild(picture);
        picture.appendChild(cardImg);
        this.card.appendChild(cardDate);
        this.card.appendChild(cardTitle);
        this.card.appendChild(cardText);
        this.card.appendChild(cardSource);
    }
}


