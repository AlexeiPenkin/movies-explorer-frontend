import { Link } from 'react-router-dom';
import logo from '../../image/logo_header.svg';
import './HeaderProfile.css';

export const HeaderProfile = () => {

  return (
    <header className="header-profile">
      <Link to='/' className='header-profile__link'>
        <img className="header-profile__logo" src={logo} alt="Логотип пользователя" />
      </Link>
      <div className="header-profile__menu">
        <Link to='/movies' className='header-profile__link movies__link'>
          Фильмы
        </Link>
        <Link to='/saved-movies' className='header-profile__link saved-movies__link'>
          Сохранённые фильмы
        </Link>
        <Link to='/profile' className='header-profile__link profile__link'>
        </Link>
      </div>
    </header>
  );
}
