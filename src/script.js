import "./styles/index.css";
import { createElement } from "./createElement";
import { formatDate } from "./formatDate";
import { CachedNewsApi } from "./newsApi";
import { NEWS_TOKEN, NEWS_URL } from "./config";
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

const api = new CachedNewsApi(NEWS_URL, NEWS_TOKEN);


class LoadResult {
    constructor(preloader, news, onLoadMoreClick) {
        this.preloader = preloader;
        this.preloaderLoading = preloader.querySelector('.preloader__loading');
        this.preloaderResult = preloader.querySelector('.preloader__result');
        this.cards = [];
        this.news = news;
        this.onLoadMoreClick = onLoadMoreClick;
        this.newsCards = news.querySelector('.news__cards');
        this.button = news.querySelector('#moreButton');
        news.querySelector('#moreButton').addEventListener('click', onLoadMoreClick);

    }
    addCard(urlToImage, description, publishedAt, title, sourceName, url) {
        const newsCard = new NewsCard(urlToImage, description, publishedAt, title, sourceName, url);
        this.cards.push(newsCard);
        this.newsCards.appendChild(newsCard.card);
    }
    addCards(cards) {
        this.preloaderLoading.classList.add('preloader__loading_hidden');
        this.preloaderResult.classList.add('preloader__result_hidden');
        this.news.classList.remove('news_hidden');
        cards.forEach(card => {
            this.addCard(card.urlToImage, card.description, card.publishedAt, card.title, card.source.name, card.url);
        })
    }
    clear() {
        this.cards.forEach(card => {
            this.newsCards.removeChild(card.card);
        });
        this.cards = [];
    }
    showLoading() {
        this.preloaderLoading.classList.remove('preloader__loading_hidden');
        this.preloaderResult.classList.add('preloader__result_hidden');
        this.news.classList.add('news_hidden');
    }
    showEmpty() {
        this.preloaderLoading.classList.add('preloader__loading_hidden');
        this.preloaderResult.classList.remove('preloader__result_hidden');
        this.news.classList.add('news_hidden');
    }
    setMoreVisible(isVisible) {
        this.button.classList.toggle('news__button_hidden', !isVisible);
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
        this.analyticsLink = document.querySelector('#analyticsLink')
    }
    onLoadMoreClick() {
        api.load(this.searchText).then(result => {
            this.loadResult.addCards(result.articles.slice(this.cardRendered, this.cardRendered + 3));
            this.cardRendered += 3;
            this.loadResult.setMoreVisible(result.articles.length > this.cardRendered);
        })
    }
    onSearch(searchText) {
        this.searchText = searchText;
        this.loadResult.showLoading();
        api.load(searchText).then(result => {
            localStorage.setItem(searchText, JSON.stringify(result));
            this.showResult(result);
        })
    }

    showResult(result) {
        this.analyticsLink.setAttribute('href', `./analytics.html?search=${encodeURIComponent(this.searchText)}`)
        if (result.articles.length == 0) {
            this.loadResult.showEmpty();
        } else {
            this.loadResult.clear();
            this.loadResult.addCards(result.articles.slice(0, 3));
            this.cardRendered = 3;
            this.loadResult.setMoreVisible(result.articles.length > this.cardRendered);
        }
    }
}
const search = new Search(news, preloader);


class NewsCard {
    constructor(urlToImage, description, publishedAt, title, sourceName, url) {
        this.urlToImage = urlToImage;
        this.description = description;
        this.publishedAt = publishedAt;
        this.title = title;
        this.sourceName = sourceName;
        this.url = url;
        this.create();
    }
    create() {
        this.card = createElement("div", ["card"]);
        const picture = createElement("picture", []);
        const cardImg = createElement("img", ["card__image"]);
        const cardDate = createElement("div", ["card__date"]);
        const cardTitle = createElement("a", ["card__title"]);
        const cardText = createElement("p", ["card__text"]);
        const cardSource = createElement("div", ["card__source"]);
        cardImg.setAttribute("src", this.urlToImage);
        cardTitle.setAttribute("href", this.url);
        cardDate.innerText = formatDate(new Date(this.publishedAt));
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


