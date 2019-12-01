import "./styles/about.css";
import Glide from '@glidejs/glide'
import { createElement } from "./createElement";

new Glide('.slider', {
    perView: 3,
    peek: {
        before: 88,
        after: 88
    },
    classes: {
        activeNav: 'pagination__point_active',
    }
}).mount()

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
        this.date = date;
        this.author = author;
        this.email = email;
        this.avatar = avatar;
        this.description = description;
        this.create();
    }
    create() {
        this.commitCard = createElement("div", ["commit-card"]);
        const date = createElement("div", ["commit-card__date"]);
        const author = createElement("div", ["commit-card__author", "author"]);
        const avatar = createElement("img", ["author__avatar"]);
        const authorInfo = createElement("div", ["author__info"]);
        const name = createElement("div", ["author__info-name"]);
        const email = createElement("div", ["author__info-email"]);
        const description = createElement("p", ["commit-card__text"]);

        avatar.setAttribute("src", this.avatar);
        date.innerText = this.date;
        name.innerText = this.author;
        email.innerText = this.email;
        description.innerText = this.description;

        this.commitCard.appendChild(date);
        this.commitCard.appendChild(author);
        author.appendChild(avatar);
        author.appendChild(authorInfo);
        authorInfo.appendChild(name);
        authorInfo.appendChild(email);
        this.commitCard.appendChild(description);
    }
}

class Bullet {
    constructor(index) {
        this.index = index;
        this.create();
    }
    create() {
        this.elem = createElement("div", ["pagination__point"]);
        this.elem.setAttribute('data-glide-dir', `=${this.index}`);
    }
}

const api = new GithubApi();
api.getCommits().then(commits => {
    console.log(commits);
    const sliderContent = document.querySelector('.slider__content');
    const bulletContent = document.querySelector('.slider__pagination');
    commits.forEach((commit, index) => {
        const commitCard = new CommitCard(commit.commit.author.date, commit.commit.author.name, commit.commit.author.email, commit.author.avatar_url, commit.commit.message);
        sliderContent.appendChild(commitCard.commitCard);
        const bullet = new Bullet(index);
        bulletContent.appendChild(bullet.elem);
    })
});