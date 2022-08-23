import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';
import { Navigation } from '../Navigation/Navigation';
import './HeaderPages.css';

export const HeaderPages = () => {

  return (
    <header className="header-pages">
      <Link to='/' className='header-pages__link'>
        <img className="header-pages__logo" src={logo} alt="Логотип пользователя" />
      </Link>
      <Navigation />
    </header>
  );
}
 