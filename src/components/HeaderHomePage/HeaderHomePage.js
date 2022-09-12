import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';
import './HeaderHomePage.css';

export const HeaderHomePage = () => {

  return (
    <header className="header-home">
      <img className="header-home__logo" src={logo} alt="Логотип пользователя" />
      <div className="header-home__menu">
        <Link to='/signup' className='header-home__link'>
          Регистрация
        </Link> 
        <Link to='/signin' className='header-home__link header-home__link-button'>
          Войти
        </Link>
      </div>
    </header>
  );
}
