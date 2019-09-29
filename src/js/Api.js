'use strict'

class Api {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }
    load() {
        return fetch(`${this.url}/cards`, {
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
    loadProfileInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
    }
    saveProfile(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }
}

export { Api };