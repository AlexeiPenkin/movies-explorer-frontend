class MoviesApi{
  constructor(options){
    this._url = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok){
      return res.json();
    } else {
      console.log(`${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this.headers
    })
    .then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;