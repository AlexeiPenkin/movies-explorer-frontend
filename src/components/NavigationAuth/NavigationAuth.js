import React from 'react';
import { NavLink } from 'react-router-dom';

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
      <nav className='navigationAuth'>
        <div className='navigationAuth__movies'>
          <NavLink to='/movies' className='navigationAuth__link'>Фильмы</NavLink>
          <NavLink to='/saved-movies' className='navigationAuth__link navigationAuth__link_saved-movies'>Сохранённые фильмы</NavLink>
        </div>
        <NavLink to='/profile' className='navigationAuth__link navigationAuth__link_profile'>Аккаунт</NavLink>
      </nav>

      <button className='navigationAuth__menu-btn' onClick={onOpen}></button>

      <div
        className={`navigationAuth__overlay ${
          isOpen && 'navigationAuth__overlay_is-open'
        }`}
        onClick={handleClickLayoutMenuClose}
      />
      <div
        className={`navigationAuth__menu-container-mobile ${
          isOpen && "navigationAuth__menu-container-mobile_is-open"
        }`}
      >
        <nav className="navigationAuth__menu-mobile">
          <button className={`navigationAuth__close-btn ${
            isOpen && 'navigationAuth__close-btn_active'
            }`}
            onClick={onClose}
          ></button>
          <NavLink
            exact
            to="/"
            className="navigationAuth__menu-mobile-link"
            activeClassName="navigationAuth__menu-mobile-link_active"
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigationAuth__menu-mobile-link"
            activeClassName="navigationAuth__menu-mobile-link_active"
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigationAuth__menu-mobile-link"
            activeClassName="navigationAuth__menu-mobile-link_active"
            onClick={onClose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>

        <NavLink
          to="/profile"
          className="navigationAuth__menu-mobile-link_profile"
          onClick={onClose}
        >
          Аккаунт
        </NavLink>
      </div>
    </>
  )
}
