export function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < 40);
}

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

export function getSavedMovieCard(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  }); 
}
