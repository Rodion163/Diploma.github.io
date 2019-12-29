import "./styles/index.css";
import { createElement } from "./createElement";
import { formatDate } from "./formatDate";
import { CachedNewsApi } from "./newsApi";
import { NEWS_TOKEN, NEWS_URL } from "./config";
class InputForm {
    constructor(onSubmit, form, input) {
        this._input = input;
        form.addEventListener('submit', event => {
            event.preventDefault()
            if (this._input.value !== '') {
                onSubmit(input.value);
            } else { '' }
        })

    }
    setSearchText(searchText) {
        this._input.value = searchText;
    }
}
const form = document.querySelector('#form');
const input = document.querySelector('#input');

const api = new CachedNewsApi(NEWS_URL, NEWS_TOKEN);


class LoadResult {
    constructor(preloader, news, onLoadMoreClick) {
        this._preloader = preloader;
        this._preloaderLoading = preloader.querySelector('.preloader__loading');
        this._preloaderResult = preloader.querySelector('.preloader__result');
        this._cards = [];
        this._news = news;
        this._onLoadMoreClick = onLoadMoreClick;
        this._newsCards = news.querySelector('.news__cards');
        this._button = news.querySelector('#moreButton');
        news.querySelector('#moreButton').addEventListener('click', onLoadMoreClick);

    }
    _addCard(urlToImage, description, publishedAt, title, sourceName, url) {
        const newsCard = new NewsCard(urlToImage, description, publishedAt, title, sourceName, url);
        this._cards.push(newsCard);
        this._newsCards.appendChild(newsCard.card);
    }
    addCards(cards) {
        this._preloaderLoading.classList.add('preloader__loading_hidden');
        this._preloaderResult.classList.add('preloader__result_hidden');
        this._news.classList.remove('news_hidden');
        cards.forEach(card => {
            this._addCard(card.urlToImage, card.description, card.publishedAt, card.title, card.source.name, card.url);
        })
    }
    clear() {
        this._cards.forEach(card => {
            this._newsCards.removeChild(card.card);
        });
        this._cards = [];
    }
    showLoading() {
        this._preloaderLoading.classList.remove('preloader__loading_hidden');
        this._preloaderResult.classList.add('preloader__result_hidden');
        this._news.classList.add('news_hidden');
    }
    showEmpty() {
        this._preloaderLoading.classList.add('preloader__loading_hidden');
        this._preloaderResult.classList.remove('preloader__result_hidden');
        this._news.classList.add('news_hidden');
    }
    setMoreVisible(isVisible) {
        this._button.classList.toggle('news__button_hidden', !isVisible);
    }
}
const news = document.querySelector('#news');
const preloader = document.querySelector('#preloader');



class Search {
    constructor(news, preloader, initialSearchText) {
        this._onLoadMoreClick = this._onLoadMoreClick.bind(this);
        this._onSearch = this._onSearch.bind(this);
        this._news = news;
        this._preloader = preloader;
        this._cardRendered = 0;
        this._inputForm = new InputForm(this._onSearch, form, input);
        this._loadResult = new LoadResult(preloader, news, this._onLoadMoreClick);
        this._analyticsLink = document.querySelector('#analyticsLink');
        this._today = new Date();
        this._weekEarlier = new Date(this._today.valueOf() - 60 * 60 * 24 * 7 * 1000);
        if (initialSearchText) {
            this._onSearch(initialSearchText);
            this._inputForm.setSearchText(initialSearchText);
        }
    }
    _onLoadMoreClick() {
        api.load(this._searchText, this._today, this._weekEarlier).then(result => {
            this._loadResult.addCards(result.articles.slice(this._cardRendered, this._cardRendered + 3));
            this._cardRendered += 3;
            this._loadResult.setMoreVisible(result.articles.length > this._cardRendered);
        })
    }
    _onSearch(searchText) {
        this._searchText = searchText;
        this._loadResult.showLoading();

        api.load(searchText, this._today, this._weekEarlier).then(result => {
            this._showResult(result);
        })
    }

    _showResult(result) {
        this._analyticsLink.setAttribute('href', `./analytics.html?search=${encodeURIComponent(this._searchText)}`)
        history.pushState({}, document.tite, `./index.html?search=${encodeURIComponent(this._searchText)}`)
        if (result.articles.length == 0) {
            this._loadResult.showEmpty();
        } else {
            this._loadResult.clear();
            this._loadResult.addCards(result.articles.slice(0, 3));
            this._cardRendered = 3;
            this._loadResult.setMoreVisible(result.articles.length > this._cardRendered);
        }
    }
}
const currentUrl = new URL(location.href);
const searchText = currentUrl.searchParams.get('search');
const search = new Search(news, preloader, searchText);


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
        cardTitle.setAttribute("target", "_blank");
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


