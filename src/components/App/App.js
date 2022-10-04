import './App.css';
import { React, useState, useEffect, useReducer } from 'react';
import { Route } from 'react-router-dom';
import { Switch, useLocation, useHistory } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Header } from '../Header/Header';
// import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { PageNotFound } from '../PageNotFound/PageNotFound';
// import { Preloader } from "../Preloader/Preloader";
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
  const movieUrl = 'https://api.nomoreparties.co';
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, toggleBurgerMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');

  const location = useLocation();
  const history = useHistory();
  const token = localStorage.getItem('token')

/* ========================================================= */
  const [localData, setLocalData] = useState([]);
  const [localSavedData, setLocalSavedData] = useState([]);
  const [savedMoviesFilter, setSavedMoviesFilter] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [listLength, setListLength] = useState(0);

/* ========================================================= */
  function handleBurgerMenuOpen() {
    toggleBurgerMenu(true);
  }

  function handleBurgerMenuClose() {
    toggleBurgerMenu(false);
  }

/* ========================================================= */
  const [searchText, setSearchText] = useState(false);

  useEffect(() => {
    if (localData && searchText) {
      // вызвать твою функцию поиска заново
      onSearch();
    }
  }, [localData]);
  

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
    // setIsLoading(true);
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
    // .finally(() => {
    //   setIsLoading(false);
    // });
  }

/* ========================================================= */
  // Авторизация
  function handleLogin(data) {
    // setIsLoading(true);
    mainApi.login(data.password, data.email)
    .then((res) => {
      // console.log(data.password, data.email)
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
    // .finally(() => {
    //   setIsLoading(false);
    // });
  }

/* ========================================================= */
  // Получения профиля пользователя
  useEffect(() => {
    if (token) {
      // console.log(token); /* приходит текущий токен */
      mainApi.getUserInfo(token)
        .then(res => 
          setCurrentUser(res.user))
        .catch(err => console.log(`Имя пользователя не получено: ${err}`))
    } 
  }, [token])
  
  
  // Изменение профиля пользователя
  function handleUserUpdate(user) {
    const token = localStorage.getItem('token');
    // setIsLoading(true);
    mainApi.updateUserInfo(user, token)
    .then((res) =>{
      setPopupMessage('Вы успешно отредактировали профиль');
      setCurrentUser(res);
    }) 
    .catch((err) => {
      setPopupMessage('Что-то пошло не так...');
      console.log(err);
    })
    // .finally(() => {
    //   setIsLoading(false);
    // });
  }

/* ========================================================= */
  // Добавление фильмов на страницу 'Movies'
  useEffect(() => {
    // setIsLoading(true);
    if (token) {
      moviesApi.getMovies()
        .then(res => {
          localStorage.setItem('filtered', JSON.stringify(res));
          const filteredMovies = JSON.parse(localStorage.getItem('filtered'));
          setFilteredMovies(filteredMovies)
        })
        .catch((err) => {
          console.log(`Фильмы получить не удалось: ${err}`)
        })
        // .finally(() => 
        //   setIsLoading(false));
    }
  }, [token])

  // Добавление фильмов на страницу 'Saved-Movies'
  useEffect(() => {
    // setIsLoading(true);
    if (token && currentUser !== null) {
      mainApi.getLikedMovies(token)
        .then(res => {
          const { movies } = res;
          localStorage.setItem('savedMovies', JSON.stringify(movies.filter((i) => i.owner === currentUser._id)))
          const savedMoviesFilter = JSON.parse(localStorage.getItem('savedMovies'));
          setFilteredMovies(savedMoviesFilter)
        })
        .catch((err) => {
          console.log(`Сохраненные фильмы получить не удалось: ${err}`)
        })
        // .finally(() => 
        //   setIsLoading(false));
    }
  }, [token, currentUser])

  // Определение количества фильмов на странице в зависимости от размера экрана
  function handleAddMovies() {
    setMoviesNumber(
      moviesNumber
      (
      window.screen.width > 1279
      ? addCardsDesktop
      : window.screen.width > 767
      ? addCardsTablet
      : addCardsMobile
      )
    )
    // setListLength(listLength + moviesNumber);
  }

/* ========================================================= */
  // Поиск 'Movies'
  function onSearch(value) {
    console.log(value); /* приходит значение из строки поиска */
    // console.log(localData); /* приходит массив фильмов */
    const sortedMovieSearch = filteredMovies.filter((item) => {
      const values = value.toLowerCase();
      const nameEN = item.nameEN.toLowerCase();
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
    const sortedMovieSearch = filteredMovies.filter((card) => {
      const values = value.toLowerCase();
      const nameEN = card.nameEN.toLowerCase();
      const nameRU = card.nameRU.toLowerCase();
      return ((nameEN && nameEN.toLowerCase().includes(values)) 
      || (nameRU && nameRU.toLowerCase().includes(value)))
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
      const shortMovies = filterMovies.filter((item) => item.duration <= 40);
      setFilteredMovies(shortMovies);
    } else {
      setFilteredMovies(filterMovies);
    }
  };
  // Сортировка по длине сохраненных фильмов
  function savedDurationSwitch(checked) {
    const savedFiltered = JSON.parse(localStorage.getItem('savedFilter'));
    if (checked === '1' && savedFiltered) {
      const shortMovies = savedFiltered.filter((item) => item.duration <= 40);
      setSavedMoviesFilter(shortMovies);
    } else {
      setSavedMoviesFilter(savedFiltered);
    }
  }

/* ========================================================= */
  // Сохранение фильма
  function handleSaveMovie(card) {
    const likeCard = localSavedData.some((i) =>
      i.movieId === card.id
    );

    if (!likeCard) {
      mainApi.likeMovie(card, token).then(res => {
        setLocalSavedData([...localSavedData, res])
      })
    } else {
      const deleteCard = localSavedData.find((i) => i.movieId === card.id)
      handleDeleteMovie(deleteCard)
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
    localStorage.removeItem('allMovies')
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
    <CurrentUserContext.Provider value={ currentUser }>
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
            currentUser={currentUser}
            filteredMovies={filteredMovies}
            durationSwitch={durationSwitch}
            onSearch={onSearch}
            addMovies={handleAddMovies}
            onDelete={handleDeleteMovie}
            listLength={listLength}
            onSave={handleSaveMovie}
          />
          <ProtectedRoute path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
            filteredMovies={savedMoviesFilter}
            durationSwitch={savedDurationSwitch}
            onSearch={onSearchSaved}
            addMovies={handleAddMovies}
            onDelete={handleDeleteMovie}
            listLength={listLength}
            savedMovies={localSavedData}
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
