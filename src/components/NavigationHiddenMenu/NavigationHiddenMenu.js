import { Link } from 'react-router-dom';
import './NavigationHiddenMenu.css';

export const NavigationHiddenMenu = ({ closeMenu }) => {
  return (
    <section className='navigation-hidden-menu'>
      <nav className='burger-menu__block'>
        <div className='burger-menu__close-button' onClick={closeMenu}></div>
        
        <div className='burger-menu__links'>

          <Link
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'burger-menu__link link_active' : 'burger-menu__link'
            }
            onClick={closeMenu}>
              Главная
          </Link>

          <Link
            to='/movies'
            className={({ isActive }) =>
              isActive
                ? 'burger-menu__link link_active' : 'burger-menu__link'
            }
            onClick={closeMenu}>
              Фильмы
          </Link>

          <Link
            to='/saved-movies'
            className={({ isActive }) =>
              isActive
                ? 'burger-menu__link link_active' : 'burger-menu__link'
            }
            onClick={closeMenu}>
              Сохранённые фильмы
          </Link>

        </div>

        <Link
          to='/profile'
          className='burger-menu__link burger-menu__link_profile'
          onClick={closeMenu}>
            Аккаунт
        </Link>

      </nav>
    </section>
  );
};
