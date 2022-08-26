import { SHORT_MOVIE_TIME } from '../utils/constants';

export const moviesListFilter = () => {
  const moviesListTotal = JSON.parse(localStorage.getItem('moviesListTotal'));
  const searchText = localStorage.getItem('searchText');
  const shortFilter = localStorage.getItem('shortFilter');

  const filteredMoviesList = moviesListTotal.filter(
    (movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0
  );
  if (shortFilter === 'on') {
    const shortArray = filteredMoviesList.filter(
      (movie) => movie.duration < SHORT_MOVIE_TIME
    );
    return shortArray;
  } else return filteredMoviesList;
};

export const saveMoviesListFilter = (array, searchText, short) => {
  const filteredMoviesList = array.filter(
    (movie) => movie.nameRU.indexOf(searchText) >= 0
  );
  if (short === 'on') {
    const shortArray = filteredMoviesList.filter(
      (movie) => movie.duration < SHORT_MOVIE_TIME
    );
    return shortArray;
  } else return filteredMoviesList;
};
