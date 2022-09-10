import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { NavigationAuth } from '../NavigationAuth/NavigationAuth';
import logo from '../../image/logo.svg';
import './Header.css';

export function Header(props) {
  const { path, isOpen, onClose, onOpen, loggedIn } = props;

  const headerClasses = `header
  ${(path === '/') ? 'header__homepage' : ''}
  ${(path === '/signin' || path === '/signup') ? 'header__hidden-menu': ''}`

  return (
    <header className={headerClasses}>
      <div className='header__homepage-menu'>
      <NavLink to='/'>
        <img className="header__logo" src={logo} alt="Логотип пользователя"/>
      </NavLink>
      {loggedIn
        ? <NavigationAuth
            isOpen={isOpen}
            onCLose={onClose}
            onOpen={onOpen}
          />
        : <Navigation
      />}
      </div>
    </header>
  );
}
