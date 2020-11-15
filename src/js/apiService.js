const API_KEY = '19085277-779e4bd4c925c04676eaaf904';
const BASE_URL = `https://pixabay.com/api/`;


export default class ApiServise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
      
    }
    
    fetchArticles() {
        const searchParams = new URLSearchParams({
            q: this.searchQuery,
            page: this.page,
            per_page: 15,
            image_type: 'photo',
            order: 'popular',
        })

        const url = `${BASE_URL}?key=${API_KEY}&${searchParams}`;
        console.log(url);

        return fetch(url).then(response => response.json()).then(response => {
            this.incrementPage()
           return response.hits;
        })
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    } 


}

