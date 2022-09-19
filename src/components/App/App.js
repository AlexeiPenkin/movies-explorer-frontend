import './App.css';
import { React, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Switch, useLocation, useHistory } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { Preloader } from '../Preloader/Preloader';
import { Popup } from '../Popup/Popup';

export function App() {
  const cardsDesktop = 12;
  const cardsTablet = 8;
  const cardsMobile = 5;
  const addCardsDesktop = 3;
  const addCardsTablet = 2;
  const addCardsMobile = 2;
  const movieUrl = 'https://api.nomoreparties.co';
  const [currentUser, setCurrentUser] = useState({});
  const [isMobileMenuOpen, toggleMobileMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filter, setFilter] = useState(false);
  const [searching, setSearching] = useState(false);
  const [numberOfMovies, setNumberOfMovies] = useState(
    window.screen.width > 1279
    ? cardsDesktop
    : window.screen.width > 767
    ? cardsTablet
    : cardsMobile
    );

  const location = useLocation();
  const history = useHistory();
  
  function handleMobileMenuOpen() {
    toggleMobileMenu(true);
  }

  function handleMobileMenuClose() {
    toggleMobileMenu(false);
  }

  function handleFilter() {
    setFilter(!filter);
  }

  function checkToken(token) {
    if (token) {
      getUser(token);
    }
  }

  function handleMore() {
    setNumberOfMovies(
      numberOfMovies + 
      (
      window.screen.width > 1279
      ? addCardsDesktop
      : window.screen.width > 767
      ? addCardsTablet
      : addCardsMobile
      )
    )
  }

  function handleRegister(data) {
    setIsLoading(true);
    mainApi.register(data.password, data.email, data.name)
      .then(() => {
        setPopupMessage('Вы успешно зарегистрировались');
        history.push('/signin');
      })
      .catch((err) => {
        setPopupMessage('Что-то пошло не так...');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin( data ) {
    setIsLoading(true);
    mainApi.login( data.password, data.email)
      .then((res) => {
        console.log(data.password, data.email)
        setPopupMessage('Вы успешно авторизировались');
        localStorage.setItem('token', res.token);
        getUser(res.token);
        history.push('/movies');
      })
      .catch((err) => {
        setPopupMessage('Неверная почта или пароль');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getUser(token) {
    setIsLoading(true);
    mainApi.getUserInfo(token)
      .then((userInfo) => {
        setLoggedIn(true);
        setCurrentUser(userInfo);
        getMovies(token);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie({
    id,
    saved,
    image,
    created_at,
    updated_at,
    trailerLink,
    trailer,
    ...keys
  }) {
    const token = localStorage.getItem('token');
    const poster = movieUrl + image?.url;
    const data = {
      movieId: id,
      image: poster,
      trailerLink: trailerLink,
      thumbnail: poster,
      ...keys
    };
    mainApi.likeMovie(data, token)
    .then((data) => {
      const savedCards = [savedMovies, data];
      setSavedMovies(savedCards);
      getSaved(movies, savedCards);
    })
    .catch((err) => {
      setPopupMessage('Что-то пошло не так...');
      console.log(err);
    })
  }

  function handleDeleteMovie(movieId) {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    var card;
    if(movieId._id){
      // console.log(movieId._id);
      card = movieId._id;
    } else {
      const id = savedMovies.filter(
        (card) => card.movieId === movieId
      );
      card = id[0]._id;
    }
    // console.log(movieId._id);
    mainApi
    .deleteMovie(card, token)
    .then((res) => {
      setPopupMessage('Фильм удалён из избранных');
      const savedCards = savedMovies.filter(
        (card) => card.movieId !== movieId
      );
      setSavedMovies(savedCards);
      getSaved(movies, savedCards);
    })
    .catch((err) => {
      setPopupMessage('Что-то пошло не так...');
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  
  function handleUpdate(user) {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    mainApi.updateUserInfo(user, token)
    .then((res) =>{
      setPopupMessage('Вы успешно отредактировали профиль');
      setCurrentUser(res);
    })
    .catch((err) => {
      setPopupMessage('Что-то пошло не так...');
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function getSaved(moviesCard) {
    console.log(moviesCard)
    setMovies(
      moviesCard.map((card) => ({
        ...card,
        saved: moviesCard.find((card) => card.movieId === card.id)
          ? true
          : false,
      }))
    );
  }

  function getMovies(token) {
    const localMovies = localStorage.getItem('movies');
    const arrMovies = localMovies ? JSON.parse(localMovies) : [];
    const getMovies = arrMovies.length ? arrMovies : moviesApi.getMovies();
    Promise.all([getMovies, mainApi.getLikedMovies(token)])
      .then(([moviesCard, savedMoviesCard]) => {
        console.log(token);
        setSavedMovies(savedMoviesCard);
        getSaved(moviesCard, savedMoviesCard);
      })
      .catch((err) => {
        setPopupMessage('Что-то пошло не так...');
        console.log(err);
      });
  }

  function filterMovies(movies, keyword) {
    return movies.filter(({ nameRU, nameEN }) => {
      if(!keyword) {
        return true;
      }
      if(typeof nameRU !== 'string' || typeof nameEN !== 'string') {
        return false;
      }
      const ru = nameRU.toLowerCase();
      const en = nameEN.toLowerCase();
      const word = keyword.toLowerCase();
      return ru.indexOf(word) !== -1 || en.indexOf(word) !== -1;
    });
  }

  function filterDuration(movie) {
    return filter ? movie.duration < 41 : true;
  }

  function onSearch(keyword, filter) {
    moviesApi.getMovies().then((cards) => {
      setSearching(true);
      const searchMovies = filterMovies(cards, keyword);
      getSaved(searchMovies, savedMovies);
      localStorage.setItem('movies', JSON.stringify(searchMovies));
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token);
    }
  }, []);

  function hadleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
    localStorage.removeItem('searchText');
    localStorage.removeItem('shortFilter');
    setCurrentUser({});
  }

  function onSearchSaved(keyword) {
    const token = localStorage.getItem('token');
    mainApi.getLikedMovies(token).then((cards) =>{
      const searchCards = filterMovies(cards, keyword);
      setSavedMovies(searchCards);
    })
  }

  function popupOnSubmit() {
    setPopupMessage('');
  }
  
  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
      <div className='App'>
      {isLoading ? (
        <Preloader /> 
        ) : (
          <></>
        )}
        <Header
          loggedIn={loggedIn}
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          onOpen={handleMobileMenuOpen}
          path={location.pathname}
        />
        <Switch>
          <ProtectedRoute 
            path='/movies'
            component={Movies}
            saveMovie={handleSaveMovie}
            searching={searching}
            onSearch={onSearch}
            numberOfMovies={numberOfMovies}
            filter={filter}
            handleFilter={handleFilter}
            movies={movies.filter(filterDuration)}
            deleteMovie={handleDeleteMovie}
            handleMore={handleMore}
          />
          <ProtectedRoute 
            path='/saved-movies'
            component={SavedMovies}
            searching={searching}
            onSearch={onSearchSaved}
            numberOfMovies={numberOfMovies}
            filter={filter}
            handleFilter={handleFilter}
            movies={movies.filter(filterDuration)}
            deleteMovie={handleDeleteMovie}
            handleMore={handleMore}
          />
          <ProtectedRoute 
            path='/profile'
            component={Profile}
            hadleSignOut={hadleSignOut}
            handleUpdate={handleUpdate}
          />
          <Route exact path='/'>
            <Main 
              loggedIn={loggedIn} 
            />
          </Route>
          <Route path='/signup'>
            <Register
              handleRegister={handleRegister}
            />
          </Route>
          <Route path='/signin'>
            <Login
              handleLogin={handleLogin}
            />
          </Route>
          <Route path='*'>
            <PageNotFound/>
          </Route>
        </Switch>
        <Popup
          message={popupMessage}
          onSubmit={popupOnSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
