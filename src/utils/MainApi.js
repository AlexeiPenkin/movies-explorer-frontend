class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok){
      return res.json();
    } else {
      console.log(`${res.status}`);
    }
  }

  register(password, email, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
        name: name
      }),
    })
      .then(this._checkResponse);
  }

  login(password, email) {
    console.log(password, email)
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._checkResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._checkResponse);
  }

  updateUserInfo(user, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email
      })
    })
    .then(this._checkResponse);
  }

  getSavedMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._checkResponse);
  }

  deleteMovie(movieId, token) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }

  saveMovies(movie, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        nameEN: movie.nameEN ?? movie.nameRU,
        nameRU: movie.nameRU,
        trailerLink: movie.trailerLink
          ? movie.trailerLink
          : `https://www.youtube.com/results?search_query=трейлер+${movie.nameRU}`,
        year: movie.year,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        // thumbnail: movie.thumbnail,
        movieId: movie.id,
      })
    })
    .then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://backend.movie.project.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;