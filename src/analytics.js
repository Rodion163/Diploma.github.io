import "./styles/analytics.css";

class Analytics {
    constructor(searchTextPlaceholder, chart, searchText) {
        this.searchTextPlaceholder = searchTextPlaceholder;
        this.chart = chart;
        this.searchText = searchText;
        this.create()
    }
    create() {
        this.searchTextPlaceholder.innerText = this.searchText;
    }
}

const searchTextPlaceholder = document.querySelector('#searchText');
const chart = document.querySelector('.chart');
const currentUrl = new URL(location.href);
const searchText = currentUrl.searchParams.get('search');
new Analytics(searchTextPlaceholder, chart, searchText);