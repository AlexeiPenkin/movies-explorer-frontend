import React from 'react';
import{ NavLink } from 'react-router-dom';

import './NavigationAuth.css'

export function NavigationAuth(props) {
  const { isOpen, onClose, onOpen } = props;
  function handleClickLayoutMenuClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  return(
    <>  
      <nav className='navigation'>
        <div className='navigation__movies'>
          <NavLink to='/movies' className='navigation__link'
          activeClassName='navigation__link_active'>
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className='navigation__link navigation__link_saved-movies'
          activeClassName='navigation__link_saved-movies_active'>
            Сохранённые фильмы
          </NavLink>
        </div>
      </nav>
      <NavLink to='/profile'
        className='navigation__link navigation__link_profile'
        activeClassName='navigation__link_profile_active'>
          Аккаунт
      </NavLink>

      <button className='navigation__burger-menu' onClick={onOpen}></button>

      <div
        className={`navigation__overlay ${
          isOpen && 'navigation__overlay_open'
        }`}
        onClick={handleClickLayoutMenuClose}
      />
      <div
        className={`navigation__menu-container-mobile ${
          isOpen && 'navigation__menu-container-mobile_is-open'
        }`}
      >
        <nav className='navigation__menu-mobile'>
          <button className={`navigation__close-btn ${
            isOpen && 'navigation__close-btn_active'
            }`}
            onClick={onClose}
          ></button>
          <NavLink
            exact
            to='/'
            className='navigation__menu-mobile-link'
            activeClassName='navigation__menu-mobile-link_active'
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            className='navigation__menu-mobile-link'
            activeClassName='navigation__menu-mobile-link_active'
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className='navigation__menu-mobile-link'
            activeClassName='navigation__menu-mobile-link_active'
            onClick={onClose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>

        <NavLink
          to='/profile'
          className='navigation__menu-mobile-link_profile'
          onClick={onClose}
        >
          Аккаунт
        </NavLink>
      </div>
    </>
  )
}
