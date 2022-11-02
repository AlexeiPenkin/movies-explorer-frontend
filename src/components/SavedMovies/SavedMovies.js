import { useState, useContext, useEffect } from 'react';
import { filterMovies, filterShortMovies } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies({ handleAddMovies, handleSaveMovie, handleDeleteMovie, savedMoviesList, isCardLiked, moviesNumber, moviesList, isCardDisliked }) {
  const currentUser = useContext(CurrentUserContext);
  const [shortMovies, setShortMovies] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  
  function onSearch(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNothingFound(true);
      setPopupMessage('Ничего не найдено');
    } else {
      setNothingFound(false);
      setFilteredMovies(savedMoviesList);
      setShowedMovies(moviesList)
      console.log(moviesList)
    }
  }

  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setNothingFound(true) : setNothingFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      setShowedMovies(filteredMovies);
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMoviesList));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);
  
  useEffect(() => {
    setFilteredMovies(savedMoviesList);
    console.log(savedMoviesList)
    savedMoviesList.length !== 0 ? setNothingFound(false) : setNothingFound(true);
  }, [savedMoviesList]);

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearch}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      ></SearchForm>
      <MoviesCardList 
        moviesList={showedMovies}
        savedMoviesList={savedMoviesList}
        moviesNumber={moviesNumber}
        handleAddMovies={handleAddMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        isCardLiked={isCardLiked}
        isCardDisliked={isCardDisliked}
      >
      </MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
