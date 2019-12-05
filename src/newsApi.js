import {formatDateISO} from './formatDate';
export class NewsApi {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }
    load(searchText, today, weekEarlier) {
        const page = 1;
        return fetch(`${this._url}/v2/everything?q=${searchText}&language=ru&page=${page}` +
            `&from=${formatDateISO(weekEarlier)}&to=${formatDateISO(today)}&pageSize=100&apiKey=${this._token}`
        )
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
export class CachedNewsApi {
    constructor(url, token) {
        this._url = url;
        this._token = token;
        this._api = new NewsApi(url, token);
    }
    _getCacheKey(searchText, today, weekEarlier) {
        return today + ',' + weekEarlier + ',' + searchText
    }
    load(searchText, today, weekEarlier) {
        const cachedResult = localStorage.getItem(this._getCacheKey(today, weekEarlier, searchText));
        if (cachedResult) {
            return Promise.resolve(JSON.parse(cachedResult));
        } else {
            return this._api.load(searchText, today, weekEarlier).then(result => {
                localStorage.setItem(this._getCacheKey(today, weekEarlier, searchText), JSON.stringify(result));
                return result;
            })
        }
    }
}
