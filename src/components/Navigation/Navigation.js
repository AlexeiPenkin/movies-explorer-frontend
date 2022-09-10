import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

export function Navigation() {

  return(
    <nav className='navigation-header'>
      <NavLink to='/signup' className='navigation-header__link'>Регистрация</NavLink>
      <NavLink to='/signin' className='navigation-header__link navigation-header__link_fill'>Войти</NavLink>
    </nav>
  )
}
