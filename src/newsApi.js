function pad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}
function formatDateISO(date) {
    return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate())
    );
}
export class NewsApi {
    constructor(url, token) {
        this.url = url;
        this.token = token;
    }
    load(searchText) {
        const page = 1;
        const today = new Date();
        const weekEarlier = new Date(today.valueOf() - 60 * 60 * 24 * 7 * 1000);
        return fetch(`${this.url}/v2/everything?q=${searchText}&language=ru&page=${page}` +
            `&from=${formatDateISO(weekEarlier)}&to=${formatDateISO(today)}&pageSize=100&apiKey=${this.token}`
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
        this.url = url;
        this.token = token;
        this.api = new NewsApi(url, token);
    }
    load(searchText) {
        const cachedResult = localStorage.getItem(searchText);
        if (cachedResult) {
            return Promise.resolve(JSON.parse(cachedResult));
        } else {
            return this.api.load(searchText).then(result => {
                localStorage.setItem(searchText, JSON.stringify(result));
                return result;
            })
        }
    }
}
