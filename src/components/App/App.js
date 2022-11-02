import './App.css';
import { React, useState, useEffect } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
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
import { Preloader } from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { Popup } from '../Popup/Popup';
 
export function App() {
  const cardsDesktop = 12;
  const cardsTablet = 8;
  const cardsMobile = 5;
  const addCardsDesktop = 3;
  const addCardsTablet = 2;
  const addCardsMobile = 2;

  const [moviesNumber, setMoviesNumber] = useState(
    window.screen.width > 1279
    ? cardsDesktop
    : window.screen.width > 767
    ? cardsTablet
    : cardsMobile
    );

  const [savedMoviesNumber, setSavedMoviesNumber] = useState(
    window.screen.width > 1279
    ? cardsDesktop
    : window.screen.width > 767
    ? cardsTablet
    : cardsMobile
    );

  const location = useLocation();
  const history = useHistory();
  const token = localStorage.getItem('token')
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, toggleBurgerMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {filter, setFilter} = useState([]);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

/* ========================================================= */
  // Определение количества фильмов на странице 'Movies'
  function handleAddMovies() {
    setMoviesNumber(moviesNumber + 
      (window.screen.width > 1279
      ? addCardsDesktop
      : window.screen.width > 767
      ? addCardsTablet
      : addCardsMobile)
    )
  }
 
  // Определение количества фильмов на странице 'Movies'
  function handleAddMoviesSaved() {
    setSavedMoviesNumber(savedMoviesNumber + 
      (window.screen.width > 1279
      ? addCardsDesktop
      : window.screen.width > 767
      ? addCardsTablet
      : addCardsMobile)
    )
  }

/* ========================================================= */
  function handleBurgerMenuOpen() {
    toggleBurgerMenu(true);
  }

  function handleBurgerMenuClose() {
    toggleBurgerMenu(false);
  }

  function handleFilter() {
    setFilter(!filter);
  }
/* ========================================================= */
  // Проверка токена
  useEffect(() => {
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
          }
        })
        .catch((err) => {
          console.log(`Токен не передан или передан не в том формате. Ошибка: ${err}`)
        })
    }
  }, [token])

/* ========================================================= */
  // Регистрация
  function handleRegister(data) {
    mainApi.register(data.password, data.email, data.name)
    .then((res) => {
      if (res.statusCode !== 400) {
        handleLogin({ password: data.password, email: data.email });
        history.push('/signin');
      }
    })
    .catch((err) => {
      console.log(err);
        setPopupMessage('При авторизации произошла ошибка');
    })
  }

/* ========================================================= */
  // Авторизация
  function handleLogin(data) {
    mainApi.login(data.password, data.email)
    .then((res) => {
      setPopupMessage('Вы успешно авторизировались');
      localStorage.setItem('token', res.token)
      setLoggedIn(true);
      setCurrentUser(token);
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
        setPopupMessage('При авторизации произошла ошибка');
    })
  }

/* ========================================================= */
  // Получения профиля пользователя
  useEffect(() => {
    if (token) {
      mainApi.getUserInfo(token)
        .then((userInfo) => 
          setCurrentUser(userInfo))
        .catch(err => console.log(`Имя пользователя не получено: ${err}`))
    } 
  }, [token])

  // Изменение профиля пользователя
  function handleUserUpdate(user) {
    const token = localStorage.getItem('token');
    mainApi.updateUserInfo(user, token)
    .then((res) =>{
      setCurrentUser(res.data);
      setSuccessUpdate(true);
      setPopupMessage('Вы успешно отредактировали профиль');
    }) 
    .catch((err) => {
      setPopupMessage('Что-то пошло не так...');
      console.log(err);
    })
  }

/* ========================================================= */
  // Сохранение фильма
  function handleSaveMovie(movie) {
    console.log(movie);
    const likeCard = savedMoviesList
    .some((i) => i.movieId === movie.id
    );
    if (!likeCard) {
      mainApi.saveMovies(movie, token)
      .then((res) => {
        setSavedMoviesList([...savedMoviesList, res.movie]);
      })
      .catch((err) => {
        setPopupMessage('Фильм сохранить не удалось');
        console.log(err);
      })
    } else {
      const deleteCard = savedMoviesList
      .find((i) => i.movieId === movie.id)
      handleDeleteMovie(deleteCard)
    }
  } 
  // console.log(savedMoviesList)

/* ========================================================= */
  // Лайкаем фильм
  function isCardLiked(movie) {
    const cardLiked = savedMoviesList.some((item) => 
    (item.movieId === movie.id || item.movieId === movie.movieId));
    return (cardLiked)
  }

  // Удаляем лайк
  function isCardDisliked(movie) {
    const cardDisliked = savedMoviesList
    .filter((i) => i._id !== movie._id);
    return (cardDisliked)
  }

/* ========================================================= */
  // Удаление фильма
  function handleDeleteMovie(movie) {
    let deleteSavedMovie = savedMoviesList.find(item => item.movieId === movie.movieId)
    return mainApi.deleteMovie(deleteSavedMovie)
      .then(() => {
        setSavedMoviesList(savedMoviesList.filter(item => item.movieId !== movie.movieId));
        setPopupMessage("");
      })
      .catch(err => {
        setPopupMessage(err);
        console.log(err);
      })
  }

  function handleDislikeMovie(movie) {
    let deleteSavedMovie = savedMoviesList.find(item => item.movieId === movie.id)
    return mainApi.deleteMovie(deleteSavedMovie)
      .then(() => {
        setSavedMoviesList(savedMoviesList.filter(item => item.movieId !== movie.id));
        setPopupMessage("");
      })
      .catch(err => {
        setPopupMessage(err);
      })
  }

  // function handleDeleteMovie(movie) {
  //   mainApi.deleteMovie(movie._id, token)
  //     .then(() => {
  //       setSavedMoviesList(savedMoviesList
  //         .filter((i) => i._id !== movie._id))
  //     })
  // }

/* ========================================================= */
  // Выход из аккаунта
  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser(null)
    setSavedMoviesList([])
    history.push('/');
  }

/* ========================================================= */
  // Попап с сообщениями
  function popupOnSubmit() {
    setPopupMessage('');
  }

/* ========================================================= */
  // Рендер
  return (
    <CurrentUserContext.Provider value={ currentUser }>
      {isLoading ? (
        <Preloader /> 
        ) : (
          <></>
        )}
      <div className='App'>
        <Header
          loggedIn={loggedIn}
          isOpen={isBurgerMenuOpen}
          onClose={handleBurgerMenuClose}
          onOpen={handleBurgerMenuOpen}
          path={location.pathname}
        />
        <Switch>
          <ProtectedRoute path='/movies'
            loggedIn={loggedIn}
            component={Movies}
            savedMoviesList={savedMoviesList}
            handleFilter={handleFilter}
            filter={filter}
            moviesNumber={moviesNumber}
            handleAddMovies={handleAddMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDislikeMovie}
            isCardLiked={isCardLiked}
            isCardDisliked={isCardDisliked}
            isLoading={isLoading}
          />
          <ProtectedRoute path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
            savedMoviesList={savedMoviesList}
            handleFilter={handleFilter}
            filter={filter}
            moviesNumber={savedMoviesNumber}
            handleAddMovies={handleAddMoviesSaved}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            isCardLiked={isCardLiked}
            isCardDisliked={isCardDisliked}
            isLoading={isLoading}
          />
          <ProtectedRoute path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            handleSignOut={handleSignOut}
            handleUserUpdate={handleUserUpdate}
            successUpdate={successUpdate}
            setSuccessUpdate={setSuccessUpdate} 
          />
          <Route exact path='/'>
            <Main 
              loggedIn={loggedIn} 
            />
          </Route>
          <Route exact path='/signup'>
              {!loggedIn ? (
                <Register handleRegister={handleRegister} />
              ) : (
                <Redirect to='/' />
              )}
            </Route>
          <Route exact path='/signin'>
              {!loggedIn ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Redirect to='/' />
              )}
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
