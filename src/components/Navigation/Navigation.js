import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

export function Navigation() {

  return(
    <nav className='navigation-homepage'>
      <NavLink to='/signup' className='navigation-homepage__link'>Регистрация</NavLink>
      <NavLink to='/signin' className='navigation-homepage__link navigation-homepage__link_button'>Войти</NavLink>
    </nav>
  )
}
