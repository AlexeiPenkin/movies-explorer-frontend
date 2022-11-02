// проверка изображений полученных от сервера
export function transformMovies(movies) {
  movies.forEach(movie => {
    if (!movie.image) {
      movie.image = 'https://incacar.com/img/no_image.jpg';
      movie.thumbnail = 'https://incacar.com/img/no_image.jpg';
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      movie.image = `https://api.nomoreparties.co${movie.image.url}`
    }
    if(!movie.country) {
      movie.country = 'Russia';
    }
    if(!movie.nameEN) {
      movie.nameEN = movie.nameRU;
    }
    if(!movie.trailerLink) {
      movie.trailerLink = 'https://www.youtube.com';
    }
  });
  return movies
}

// фильтрация по длительности
export function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < 40);
}

// фильтрация по запросу
export function filterMovies(movies, userRequest, shortMoviesCheckbox) {
  const userMovieRequest = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userRequest.toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesCheckbox) {
    return filterShortMovies(userMovieRequest);
  } else {
    return userMovieRequest;
  }
}

// преобразование длительности
export function transformDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

// cравнение сохраненных фильмов
export function getSavedMovieCard(arr, movie) {
  // console.log(arr) /* приходит пустой массив */
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  }); 
}
