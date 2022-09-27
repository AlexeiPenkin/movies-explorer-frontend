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
  const [moviesNumber, setMoviesNumber] = useState(
    window.screen.width > 1279
    ? cardsDesktop
    : window.screen.width > 767
    ? cardsTablet
    : cardsMobile
    );
  const [currentUser, setCurrentUser] = useState({});
  const [isMobileMenuOpen, toggleBurgerMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const location = useLocation();
  const history = useHistory();
  const token = localStorage.getItem('token')

/* ========================================================= */
  const [localData, setLocalData] = useState([]);
  const [localSavedData, setLocalSavedData] = useState([]);
  // const [popup, setPopupImage] = useState('')
  const [popupText, setPopupText] = useState('')
  const [savedMoviesFilter, setSavedMoviesFilter] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [listLength, setListLength] = useState(0);
  const [movies, setMovies] = useState([]);

/* ========================================================= */
  function handleBurgerMenuOpen() {
    toggleBurgerMenu(true);
  }

  function handleBurgerMenuClose() {
    toggleBurgerMenu(false);
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
    setIsLoading(true);
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
    .finally(() => {
      setIsLoading(false);
    });
  }

/* ========================================================= */
  // Авторизация
  function handleLogin(data) {
    setIsLoading(true);
    mainApi.login(data.password, data.email)
    .then((res) => {
      localStorage.setItem('token', res.token)
      setLoggedIn(true);
      setCurrentUser(token);
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
        setPopupMessage('При авторизации произошла ошибка');
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

/* ========================================================= */
  // Получения профиля пользователя
  useEffect(() => {
    if (token) {
      mainApi.getUserInfo(token)
        .then(res => setCurrentUser(res.user))
        .catch(err => console.log(`Имя пользователя не получено: ${err}`))
    }
  }, [token])
  // Изменение профиля
  const handleUserUpdate = (user) => {
    mainApi.updateUserInfo(token, user)
      .then(res => setCurrentUser(res))
      .then(() => {

        setPopupText('Данные успешно изменены!')
      })
      .catch((err) => {
        setPopupText('При обновлении профиля произошла ошибка.')
        console.log(`При обновлении профиля произошла ошибка: ${err}`)
      })
      .finally(setPopupMessage);
  }

/* ========================================================= */
  // Добавление фильмов на страницу 'Movies'
  useEffect(() => {
    setIsLoading(true);
    if (token) {
      console.log(token); /* приходит текущий токен */
      moviesApi.getMovies()
        .then(res => {
          console.log(res); /* приходит массив всех фильмов */
          localStorage.setItem('movies', JSON.stringify(res));
          const allMovies = JSON.parse(localStorage.getItem('movies'));
          setLocalData(allMovies);
          console.log(allMovies) /* приходит массив всех фильмов */
        })
        .catch((err) => {
          console.log(`Фильмы не удалось получить: ${err}`)
        })
        .finally(() => setIsLoading(false));
    }
  }, [token])

  // Добавление фильмов на страницу 'Saved-Movies'
  useEffect(() => {
    setIsLoading(true);
    if (token && currentUser !== null) {
      mainApi.getLikedMovies(token)
        .then(res => {
          const { movies } = res;
          console.log(movies); /* приходит пустой массив */
          localStorage.setItem('savedMovies', JSON.stringify(res.filter((i) => i.owner === currentUser._id)))
          const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
          setLocalSavedData(userMovies);
          // console.log(userMovies)
        })
        .catch((err) => {
          console.log(`Сохраненные фильмы не удалось получить: ${err}`)
        })
        .finally(() => setIsLoading(false));
    }
  }, [token, currentUser])

  // Определение количества фильмов на странице в зависимости от размера экрана
  function handleAddMovies() {
    setMoviesNumber(
      moviesNumber + 
      (
      window.screen.width > 1279
      ? addCardsDesktop
      : window.screen.width > 767
      ? addCardsTablet
      : addCardsMobile
      )
    )
    setListLength(listLength + moviesNumber);
  }

  // Кнопка 'Ещё'
  // function addMovies() {
  //   setListLength(listLength + moviesNumber);
  // };

/* ========================================================= */
  // Поиск 'Movies'
  function onSearch(value) {
    const sortedMovieSearch = localData.filter((item) => {
      const values = value.toLowerCase();
      const nameEN = item.nameEN;
      const nameRU = item.nameRU.toLowerCase();
      return (nameEN && nameEN.toLowerCase().includes(values) && (values !== ''))
      || (nameRU && nameRU.toLowerCase().includes(value) && (values !== ''))
        ? item : null
    });
    localStorage.setItem('filtered', JSON.stringify(sortedMovieSearch));
    setFilteredMovies(sortedMovieSearch)
  }
  // Поиск 'SavedMovies'
  function onSearchSaved(value) {
    const sortedMovieSearch = localSavedData.filter((card) => {
      const values = value.toLowerCase();
      const nameEN = card.nameEN.toLowerCase();
      const nameRU = card.nameRU.toLowerCase();
      return ((nameEN && nameEN.toLowerCase().includes(values)) || (nameRU && nameRU.toLowerCase().includes(value)))
        ? card : null
    });
    localStorage.setItem('savedFilter', JSON.stringify(sortedMovieSearch));
    setSavedMoviesFilter(sortedMovieSearch.length !== 0 ? sortedMovieSearch : localSavedData);
  }

/* ========================================================= */
  // Сортировка по длине фильмов 
  function durationSwitch(checked) {
    const filterMovies = JSON.parse(localStorage.getItem('filtered'));
    if (checked === '1' && filterMovies) {
      const shorts = filterMovies.filter((item) => item.duration <= 40);
      setFilteredMovies(shorts);
    } else {
      setFilteredMovies(filterMovies);
    }
  };
  // Сортировка по длине сохраненных фильмов
  function savedDurationSwitch(checked) {
    const savedFiltered = JSON.parse(localStorage.getItem('savedFilter'));
    if (checked === '1' && savedFiltered) {
      const shorts = savedFiltered.filter((item) => item.duration <= 40);
      setSavedMoviesFilter(shorts);
    } else {
      setSavedMoviesFilter(savedFiltered);
    }
  }

/* ========================================================= */
  // Сохранение фильма
  function handleSaveMovie(card) {
    const like = localSavedData.some((i) =>
      i.movieId === card.id
    );

    if (!like) {
      mainApi.saveMovies(card, token).then(res => {
        setLocalSavedData([...localSavedData, res])
      })
    } else {
      const dislikeMovies = localSavedData.find((i) => i.movieId === card.id)
      handleDeleteMovie(dislikeMovies)
    }
  }

/* ========================================================= */
  // Удаление фильма
  function handleDeleteMovie(card) {
    mainApi.deleteMovie(card, token)
      .then(() => {
        setSavedMoviesFilter(savedMoviesFilter.filter((i) => i._id !== card._id))
        setLocalSavedData(localSavedData.filter(i => i._id !== card._id))
      })
  }

/* ========================================================= */
  // Выход из аккаунта
  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser(null)
    setSavedMoviesFilter([])
    setFilteredMovies([])
    setLocalSavedData([])
    history.push('/');
  }

/* ========================================================= */
  // Попап с сообщениями
  function popupOnSubmit() {
    setPopupMessage('');
  }

/* ========================================================= */
  // Попап с сообщениями
//   function handlePopupMessage() {
//   setPopupText(true)
// }

/* ========================================================= */
  // Рендер
  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
      <div className='App'>
      {/* {isLoading ? (
        <Preloader /> 
        ) : (
          <></>
        )} */}
        <Header
          loggedIn={loggedIn}
          isOpen={isMobileMenuOpen}
          onClose={handleBurgerMenuClose}
          onOpen={handleBurgerMenuOpen}
          path={location.pathname}
        />
        <Switch>  
          <ProtectedRoute path='/movies'
            component={Movies}
            currentUser={currentUser}
            movieCards={filteredMovies}
            durationSwitch={durationSwitch}
            onSearch={onSearch}
            addMovies={handleAddMovies}
            onDelete={handleDeleteMovie}
            listLength={listLength}
            savedMovies={localSavedData}
            onSave={handleSaveMovie}
          />
          <ProtectedRoute path='/saved-movies'
            component={SavedMovies}
            movieCards={savedMoviesFilter}
            durationSwitch={savedDurationSwitch}
            onSearch={onSearchSaved}
            addMovies={handleAddMovies}
            onDelete={handleDeleteMovie}
            listLength={listLength}
            savedMovies={savedMoviesFilter}
          />
          <ProtectedRoute path='/profile'
            component={Profile}
            handleSignOut={handleSignOut}
            handleUserUpdate={handleUserUpdate}
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
