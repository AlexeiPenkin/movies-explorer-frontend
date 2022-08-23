import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationAuth.css';

export const NavigationAuth = () => {
  return (
    <nav className='menu'>
      <NavLink to='/signup' className='menu__link'>
        Регистрация
      </NavLink>
      <NavLink to='/signin' className='menu__link signin-button'>
        Войти
      </NavLink>
    </nav>
  );
};
