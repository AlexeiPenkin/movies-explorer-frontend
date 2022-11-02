import { useState, useContext, useEffect } from 'react';
import { transformMovies, filterMovies, filterShortMovies } from '../../utils/utils';
import { Footer } from '../Footer/Footer'
import moviesApi from '../../utils/MoviesApi';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Movies.css';

export function Movies({ savedMoviesList, isCardLiked, handleAddMovies, handleSaveMovie, handleDeleteMovie, moviesNumber, isCardDisliked }) {
  const currentUser = useContext(CurrentUserContext);
  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setPopupMessage('Ничего не найдено');
      setNothingFound(true);
    } else {
      setNothingFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(`${currentUser.email} - movies`, JSON.stringify(moviesList)
    );
  }

  function onSearch(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then(movies => {
          setAllMovies(movies);
          handleSetFilteredMovies(
          // transformMovies(movies),
            inputValue,
            shortMovies
          );
        })
        .catch(() =>
          setPopupMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        )
        .finally(() => setIsLoading(false));
    } else {
      handleSetFilteredMovies(allMovies, inputValue, shortMovies);
    }
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      ); 
      setInitialMovies(movies);
      if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  return(
    <section className='movies'>
      <SearchForm 
        onSearch={onSearch}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      ></SearchForm>
      <MoviesCardList 
        moviesList={filteredMovies}
        savedMoviesList={savedMoviesList}
        moviesNumber={moviesNumber}
        handleAddMovies={handleAddMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        isCardLiked={isCardLiked}
        isCardDisliked={isCardDisliked}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
