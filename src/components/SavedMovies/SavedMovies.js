import { useState, useContext, useEffect } from "react";
import { filterMovies } from "../../utils/utils";
import {
  setSearchSavedToStorage,
  getSearchSavedFromStorage,
  setShortSavedToStorage,
  getShortSavedFromStorage,
} from "../../utils/localStorage";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedUserContext } from "../../contexts/SavedUserContext";
import "./SavedMovies.css";

export function SavedMovies({
  isCardLiked,
  handleAddMovies,
  handleSaveMovie,
  handleDeleteMovie,
  moviesNumber,
  isCardDisliked,
  setPopupMessage,
}) {

  const savedMoviesList = useContext(SavedUserContext); 

  const currentUser = useContext(CurrentUserContext);
  const userEmail = currentUser && currentUser.email;

  const [userLoading, setUserloading] = useState(true);
  useEffect(() => {
    if (userEmail) {
      const movies = savedMoviesList;
      const search = getSearchSavedFromStorage(userEmail);
      const short = getShortSavedFromStorage(userEmail);
      setSearchValue(search);
      setShortValue(short);
      handleSetFilteredMovies(movies, search, short);
      setUserloading(false);
    }
  }, [currentUser, savedMoviesList]);

  const [searchValue, setSearchValue] = useState(
    getSearchSavedFromStorage(userEmail)
  );
  const [shortValue, setShortValue] = useState(getShortSavedFromStorage(userEmail));

  const onShortChange = (isChecked) => {
    setShortValue(isChecked);
    setShortSavedToStorage(userEmail, isChecked);
    handleSetFilteredMovies(savedMoviesList, searchValue, isChecked, true);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);

  useEffect(() => {
    return () => {
      setSearchValue("");
      setShortValue(false);
      setFilteredMovies([]);
    };
  }, []);

  function onSearch() {
    setSearchSavedToStorage(userEmail, searchValue);
    setShortSavedToStorage(userEmail, shortValue);

    setIsLoading(true);
    handleSetFilteredMovies(savedMoviesList, searchValue, shortValue, true);
    setIsLoading(false);
  }

  const handleSetFilteredMovies = (movies, search, short, isSearch) => {
    const filteredList = filterMovies(movies, search, short);
    if (filteredList.length === 0) {
      if (isSearch) {
        setPopupMessage("Ничего не найдено");
        setNothingFound(true);
      }
    } else {
      if (isSearch) {
        setNothingFound(false);
      }
    }

    setFilteredMovies(filteredList);
  }

  return (
    <>
      {!userLoading && (
        <>
          <section className="movies">
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
              nothingFound={nothingFound}
            />
            <Footer/>
          </section>
        </>
      )}
    </>
  );
}
