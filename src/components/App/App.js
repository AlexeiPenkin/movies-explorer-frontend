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

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, toggleBurgerMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const location = useLocation();
  const history = useHistory();
  const token = localStorage.getItem('token')
  const [localData, setLocalData] = useState([]);
  const [localDataSaved, setLocalDataSaved] = useState([]);
  // const [localSavedData, setLocalSavedData] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]); 
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {filter, setFilter} = useState([]); 
  // const {currentSavedMovies, setCurrentSavedMovies} = useState([])
  const [successUpdate, setSuccessUpdate] = useState(false);

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
// const addMovies = () => {
//   setListLength(listLength + moviesNumber);
// }

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
      // console.log(token); /* приходит текущий токен */
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
  // проверка полученных изображений
  // function transformMovies(movies) {
  //   movies.forEach(movie => {
  //     if (!movie.image) {
  //       movie.image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
  //       movie.thumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
  //     } else {
  //       movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
  //       movie.image = `https://api.nomoreparties.co${movie.image.url}`
  //     }
  //     if(!movie.country) {
  //       movie.country = 'Russia';
  //     }
  //     if(!movie.nameEN) {
  //       movie.nameEN = movie.nameRU;
  //     }
  //   });
  //   return movies
  // }

/* ========================================================= */
  const localStorageValue = localStorage.getItem('saveSearchValue')
  const [value, setValue] = useState(localStorageValue ?? '');

  useEffect(() => {
    if (localData && value) {
      // console.log(value)
      onSearch(localStorageValue)
    }
  }, [localData]);

/* ========================================================= */
  // Добавление фильмов на страницу 'Movies'
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then(res => {
          localStorage.setItem('localData', JSON.stringify(res));
          const allMovies = JSON.parse(localStorage.getItem('localData'));
          setLocalData(allMovies)
          // console.log(localData)
          localStorage.setItem('initialMovies', JSON.stringify(res));
          const initialMovies = JSON.parse(localStorage.getItem('initialMovies'));
          setInitialMovies(initialMovies)
        })
        .catch((err) => {
          console.log(`Фильмы получить не удалось: ${err}`)
        })
        .finally(() => 
          setIsLoading(false));
    }
  }, [token])
  // Поиск 'Movies'
  function onSearch(value) {
    const shortMovies = JSON.parse(localStorage.getItem('shortMovies'));
    if (shortMovies) {
    const movieSearch = shortMovies.filter((item) => {  
      const values = value.toLowerCase();
      const nameEN = item.nameEN.toLowerCase();
      const nameRU = item.nameRU.toLowerCase();
      return (nameEN && nameEN.toLowerCase().includes(values) && (values !== ''))
      || (nameRU && nameRU.toLowerCase().includes(value) && (values !== ''))
        ? item : null
    });
    localStorage.setItem('initialMovies', JSON.stringify(movieSearch));
    setInitialMovies(movieSearch)
    console.log(shortMovies)
    } else {
      const movieSearch = localData.filter((item) => {
        const values = value.toLowerCase();
        const nameEN = item.nameEN.toLowerCase();
        const nameRU = item.nameRU.toLowerCase();
        return (nameEN && nameEN.toLowerCase().includes(values) && (values !== ''))
        || (nameRU && nameRU.toLowerCase().includes(value) && (values !== ''))
          ? item : null
      });
    localStorage.setItem('initialMovies', JSON.stringify(movieSearch));
    setInitialMovies(movieSearch)
    }
  }
  // Сортировка по длине фильмов 'Movies'
  const durationSwitch = (checked) => {
    const moviesFilter = JSON.parse(localStorage.getItem('initialMovies'));
    if (checked === '1' && moviesFilter) {
      const shortMovies = moviesFilter.filter((item) => item.duration <= 40);
      localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
      setInitialMovies(shortMovies);
    } else {
      setInitialMovies(moviesFilter);
    }
  };

/* ========================================================= */
  // Добавление фильмов на страницу 'SavedMovies'
  useEffect(() => {
    if (token && currentUser !== null) {
      setIsLoading(true);
      mainApi.getSavedMovies(token)
        .then(res => {
          const { movies } = res;
          localStorage.setItem('savedMovies', JSON.stringify(movies.filter((i) => i.owner === currentUser._id)))
          const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          setSavedMovies(savedMovies)
        })
        .catch((err) => {
          console.log(`Сохраненные фильмы получить не удалось: ${err}`)
        })
        .finally(() => 
          setIsLoading(false));
    }
  }, [token, currentUser])
  // Поиск 'SavedMovies'
  function onSearchSaved(value) {
    const shortMoviesSaved = JSON.parse(localStorage.getItem('shortMoviesSaved'));
    if (shortMoviesSaved) {
    const movieSearchSaved = shortMoviesSaved.filter((card) => {
      const values = value.toLowerCase();
      const nameEN = card.nameEN.toLowerCase();
      const nameRU = card.nameRU.toLowerCase();
      return ((nameEN && nameEN.toLowerCase().includes(values)) 
      || (nameRU && nameRU.toLowerCase().includes(value)))
        ? card : null
    }); 
    setSavedMovies(movieSearchSaved.length !== 0 ? movieSearchSaved : shortMoviesSaved);
    } else {
      const movieSearchSaved = savedMovies.filter((card) => {
        const values = value.toLowerCase();
        const nameEN = card.nameEN.toLowerCase();
        const nameRU = card.nameRU.toLowerCase();
        return ((nameEN && nameEN.toLowerCase().includes(values)) 
        || (nameRU && nameRU.toLowerCase().includes(value)))
          ? card : null
    }); 
    setSavedMovies(movieSearchSaved.length !== 0 ? movieSearchSaved : savedMovies);
    }

    // старый код
    // const savedSortedMovieSearch = savedMovies.filter((card) => {
    //   const values = value.toLowerCase();
    //   const nameEN = card.nameEN.toLowerCase();
    //   const nameRU = card.nameRU.toLowerCase();
    //   return ((nameEN && nameEN.toLowerCase().includes(values)) 
    //   || (nameRU && nameRU.toLowerCase().includes(value)))
    //     ? card : null
    // }); 
    // setSavedMovies(savedSortedMovieSearch.length !== 0 ? savedSortedMovieSearch : savedMovies);
  }
  // Сортировка по длине сохраненных фильмов 'SavedMovies'
  const savedDurationSwitch= (checked) => {
    const moviesFilterSaved = JSON.parse(localStorage.getItem('savedMovies'));
    if (checked === '1' && moviesFilterSaved) {
      const shortMoviesSaved = savedMovies.filter((item) => item.duration <= 40);
      localStorage.setItem('shortMoviesSaved', JSON.stringify(shortMoviesSaved));
      setSavedMovies(shortMoviesSaved);
    } else {
      setSavedMovies(moviesFilterSaved);
     }
  }

/* ========================================================= */
  // Сохранение фильма
  function handleSaveMovie(movie) {
    const likeCard = savedMovies
    .some((i) => i.movieId === movie.id
    );
    if (!likeCard) {
      mainApi.saveMovies(movie, token)
      .then(res => {setSavedMovies([...savedMovies, res.movie])
      .catch((err) => {
        setPopupMessage('Фильм сохранить не удалось');
        console.log(err);
      })
      })
    } else {
      const deleteCard = savedMovies
      .find((i) => i.movieId === movie.id)
      handleDeleteMovie(deleteCard)
    }
  }

/* ========================================================= */
  // Лайкаем фильм
  function isCardLiked(movie) {
    const cardLiked = savedMovies.some((item) => item.movieId === movie.id || item.movieId === movie.movieId);
    return (cardLiked)
  }

/* ========================================================= */
  // Удаление фильма
  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id, token)
      .then(() => {
        setSavedMovies(savedMovies
          .filter((i) => i._id !== movie._id))
      })
  }

/* ========================================================= */
  // Выход из аккаунта
  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser(null)
    setSavedMovies([])
    setInitialMovies([])
    setLocalData([])
    setLocalDataSaved([])
    // setLocalSavedData([])
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
            initialMovies={initialMovies}
            handleFilter={handleFilter}
            filter={filter}
            durationSwitch={durationSwitch}
            onSearch={onSearch}
            moviesNumber={moviesNumber}
            handleAddMovies={handleAddMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            isCardLiked={isCardLiked}
            isLoading={isLoading}
          />
          <ProtectedRoute path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
            initialMovies={savedMovies}
            handleFilter={handleFilter}
            filter={filter}
            durationSwitch={savedDurationSwitch}
            onSearch={onSearchSaved}
            moviesNumber={savedMoviesNumber}
            handleAddMovies={handleAddMoviesSaved}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            isCardLiked={isCardLiked}
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
