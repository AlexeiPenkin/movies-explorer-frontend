import { useState, useContext, useEffect } from "react";
import { filterMovies } from "../../utils/utils";
import {
  setSearchToStorage,
  getSearchFromStorage,
  setShortToStorage,
  getAllMoviesFromStorage,
  getShortFromStorage,
  setAllMoviesToStorage,
} from "../../utils/localStorage";
import { Footer } from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import { SearchForm } from "../SearchForm/SearchForm";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedUserContext } from "../../contexts/SavedUserContext";
import "./Movies.css";

export function Movies({
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
      const movies = getAllMoviesFromStorage(userEmail);
      const search = getSearchFromStorage(userEmail);
      const short = getShortFromStorage(userEmail);
      setAllMovies(movies);
      setSearchValue(search);
      setShortValue(short);
      handleSetFilteredMovies(movies, search, short);
      setUserloading(false);
    }
  }, [currentUser]);

  const [searchValue, setSearchValue] = useState(
    getSearchFromStorage(userEmail)
  );
  const [shortValue, setShortValue] = useState(getShortFromStorage(userEmail));

  const onShortChange = (isChecked) => {
    setShortValue(isChecked);
    setShortToStorage(userEmail, isChecked);
    handleSetFilteredMovies(allMovies, searchValue, isChecked, true);
  };

  const [allMovies, setAllMovies] = useState(getAllMoviesFromStorage(userEmail));
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);

  useEffect(() => {
    return () => {
      setSearchValue("");
      setShortValue(false);
      setAllMovies([]);
      setFilteredMovies([]);
    };
  }, []);

  function onSearch() {
    setSearchToStorage(userEmail, searchValue);
    setShortToStorage(userEmail, shortValue);

    setIsLoading(true);

    if (allMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          setAllMoviesToStorage(userEmail, movies);
          setAllMovies(movies);
          handleSetFilteredMovies(movies, searchValue, shortValue, true);
        })
        .catch(() =>
          setPopupMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          )
        )
        .finally(() => setIsLoading(false));
    } else {
      handleSetFilteredMovies(allMovies, searchValue, shortValue, true);
      setIsLoading(false);
    }
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
