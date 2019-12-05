import "./styles/about.css";
import Glide from '@glidejs/glide'
import { createElement } from "./createElement";
import { formatDate } from "./formatDate";


class GithubApi {
    constructor() {
        this.url = 'https://api.github.com/repos/Rodion163/Diploma.github.io/commits';
    }
    getCommits() {
        return fetch(this.url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}
class CommitCard {
    constructor(date, author, email, avatar, description) {
        this._date = date;
        this._author = author;
        this._email = email;
        this._avatar = avatar;
        this._description = description;
        this._create();
    }
    _create() {
        this._commitCard = createElement("div", ["commit-card"]);
        const date = createElement("div", ["commit-card__date"]);
        const author = createElement("div", ["commit-card__author", "author"]);
        const avatar = createElement("img", ["author__avatar"]);
        const authorInfo = createElement("div", ["author__info"]);
        const name = createElement("div", ["author__info-name"]);
        const email = createElement("div", ["author__info-email"]);
        const description = createElement("p", ["commit-card__text"]);

        avatar.setAttribute("src", this._avatar);
        date.innerText = formatDate(new Date(this._date));
        name.innerText = this._author;
        email.innerText = this._email;
        description.innerText = this._description;

        this._commitCard.appendChild(date);
        this._commitCard.appendChild(author);
        author.appendChild(avatar);
        author.appendChild(authorInfo);
        authorInfo.appendChild(name);
        authorInfo.appendChild(email);
        this._commitCard.appendChild(description);
    }
    getElement() {
        return this._commitCard;
    }
}

class Bullet {
    constructor(index) {
        this._index = index;
        this._create();
    }
    _create() {
        this._elem = createElement("div", ["pagination__point"]);
        this._elem.setAttribute('data-glide-dir', `=${this._index}`);
    }
    getElement() {
        return this._elem;
    }
}

const api = new GithubApi();
api.getCommits().then(commits => {
    const sliderContent = document.querySelector('.slider__content');
    const bulletContent = document.querySelector('.slider__pagination');
    commits.forEach((commit, index) => {
        const commitCard = new CommitCard(commit.commit.author.date, commit.commit.author.name, commit.commit.author.email, commit.author.avatar_url, commit.commit.message);
        sliderContent.appendChild(commitCard.getElement());
        const bullet = new Bullet(index);
        bulletContent.appendChild(bullet.getElement());
    })
    new Glide('.slider', {
        perView: 3,
        breakpoints: {
            1280: {
                peek: {
                    before: 40,
                    after: 40
                },
            },
            1024: {
                perView: 2,
                peek: {
                    before: 40,
                    after: 40
                },
            },
            768: {
                perView: 2,
                peek: {
                    before: 16,
                    after: 16
                },
            },
            600: {
                perView: 1,
                peek: {
                    before: 16,
                    after: 16
                },
            }
        },
        peek: {
            before: 88,
            after: 88
        },
        classes: {
            activeNav: 'pagination__point_active',
        }
    }).mount()
}) .catch(err => {
    console.log(err);
})
