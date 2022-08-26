import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';
import { Navigation } from '../Navigation/Navigation';
import './Header.css';

export const Header = ({ login }) => {

  return (
    <header className="header-home">
      <Link to='/signup' className='header-home__link'>
        <img
          className="header-home__logo"
          src={logo}
          alt="Логотип пользователя" 
        />
      </Link> 
      <Navigation login={login} />
    </header>
  );
}
