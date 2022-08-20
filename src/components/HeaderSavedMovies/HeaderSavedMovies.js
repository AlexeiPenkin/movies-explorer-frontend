import { Link } from 'react-router-dom';
import logo from '../../image/logo_header.svg';
import './HeaderSavedMovies.css';

export const HeaderSavedMovies = () => {

  return (
    <header className="header-savedmovies">
      <Link to='/' className='header-savedmovies__link'>
        <img className="header-savedmovies__logo" src={logo} alt="Логотип пользователя" />
      </Link>
      <div className="header-savedmovies__menu">
        <Link to='/movies' className='header-savedmovies__link movies__link'>
          Фильмы
        </Link>
        <Link to='/saved-movies' className='header-savedmovies__link saved-movies__link'>
          Сохранённые фильмы
        </Link>
        <Link to='/profile' className='header-savedmovies__link profile__link'>
        </Link>
      </div>
    </header>
  );
}
