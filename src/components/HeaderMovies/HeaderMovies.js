import { Link } from 'react-router-dom';
import logo from '../../image/logo_header.svg';
import './HeaderMovies.css';

export const HeaderMovies = () => {

  return (
    <header className="header-movies">
        < Link to='/' className='header-movies__link'>
          <img className="header-movies__logo" src={logo} alt="Логотип пользователя" />
        </Link>
      <div className="header-movies__menu">
        <Link to='/movies' className='header-movies__link movies__link'>
          Фильмы
        </Link>
        <Link to='/saved-movies' className='header-movies__link saved-movies__link'>
          Сохранённые фильмы
        </Link>
        <Link to='/profile' className='header-movies__link profile__link'>
        </Link>
      </div>
    </header>
  );
} 
