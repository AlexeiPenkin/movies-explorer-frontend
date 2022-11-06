import { useState, useContext, useEffect } from 'react';
import { filterMovies } from '../../utils/utils';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedUserContext } from '../../contexts/SavedUserContext';
import { Popup } from '../Popup/Popup';
import './SavedMovies.css';

export function SavedMovies({
  isCardLiked,
  handleAddMovies,
  handleSaveMovie,
  handleDeleteMovie,
  moviesNumber,
  isCardDisliked,
}) {

  const savedMoviesList = useContext(SavedUserContext); 
  const currentUser = useContext(CurrentUserContext);
  const userEmail = currentUser && currentUser.email;

  const [userLoading, setUserloading] = useState(true);
  useEffect(() => {
    if (userEmail) {
      const movies = savedMoviesList;
      const search = ('');
      const short = (false);
      setSearchValue(search);
      setShortValue(short);
      handleSetFilteredMovies(movies, search, short);
      setUserloading(false);
    }
  }, [currentUser, savedMoviesList]);

  const [searchValue, setSearchValue] = useState('');
  const [shortValue, setShortValue] = useState(false);

  const onShortChange = (isChecked) => {
    setShortValue(isChecked);
    handleSetFilteredMovies(savedMoviesList, searchValue, isChecked);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    return () => {
      setSearchValue('');
      setShortValue(false);
      setFilteredMovies([]);
    };
  }, []);

  function onSearch() {
    setIsLoading(true);
    handleSetFilteredMovies(savedMoviesList, searchValue, shortValue);
    setIsLoading(false);
  }

  const handleSetFilteredMovies = (movies, search, short) => {
    const filteredList = filterMovies(movies, search, short);
    if (filteredList.length === 0) {
      setPopupMessage('Ничего не найдено');
      setNothingFound(true);
    } else {
      setNothingFound(false);
    }

    setFilteredMovies(filteredList);
      console.log(filteredList)
  }

  function popupOnSubmit() {
    setPopupMessage('');
  }

  return (
    <>
      {!userLoading && (
        <>
          <section className='movies'>
            <SearchForm
              searchInputOnChangeCB={setSearchValue}
              searchValue={searchValue}
              shortInputOnChangeCB={onShortChange}
              shortValue={shortValue}
              onSubmitCB={onSearch}
            />
            <MoviesCardList
              moviesList={filteredMovies}
              isLoading={isLoading}
              savedMoviesList={savedMoviesList}
              moviesNumber={moviesNumber}
              handleAddMovies={handleAddMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              isCardLiked={isCardLiked}
              isCardDisliked={isCardDisliked}
            />
            <Footer/>
            <Popup
              message={popupMessage}
              onSubmit={popupOnSubmit}
            />
          </section>
        </>
      )}
    </>
  );
}
