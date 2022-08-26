import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationHiddenMenu } from '../NavigationHiddenMenu/NavigationHiddenMenu';
import './NavigationMovies.css';

export const NavigationMovies = () => {
  const [toggleMenu, setToggleMenu] = useState(true);

  const openMenu = () => {
    setToggleMenu(false);
  };

  const closeMenu = () => {
    setToggleMenu(true);
  };

  return (
    <>
      {toggleMenu ? (
        <div className='movies-navigation__menu_hidden' onClick={openMenu}></div>
      ) : (
        <NavigationHiddenMenu closeMenu={closeMenu} />
      )} 
      <nav className='movies-navigation__menu'>
        <div className='movies-navigation__links'>

          <NavLink
            to='/movies'
            className={({ isActive }) =>
              isActive ? 'movies-navigation__link movies-navigation__link_active' : 'movies-navigation__link'}
          >
            Фильмы
          </NavLink>

          <NavLink
            to='/saved-movies'
            className={({ isActive }) =>
              isActive ? 'movies-navigation__link movies-navigation__link_active' : 'movies-navigation__link'}
          >
            Сохранённые фильмы
          </NavLink>

        </div>

        <NavLink
          to='/profile'
          className='movies-navigation__link movies-navigation__link_profile'
        >
          Аккаунт
        </NavLink>

      </nav>
    </>
  );
};
