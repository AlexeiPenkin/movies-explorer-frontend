import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';
import './Header.css';

export const Header = () => {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип пользователя" />
      <div className="header__menu">
        <Link to='/signup' className='header__link'>
          Регистрация
        </Link>
        <Link to='/signin' className='header__link header__link-button'>
          Войти
        </Link>
      </div>
    </header>
  );
}
 