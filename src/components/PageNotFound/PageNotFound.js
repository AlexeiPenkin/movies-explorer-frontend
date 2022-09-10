import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageNotFound.css'

export const PageNotFound = () => {
  return (
    <main className='pagenotfound'>
      <h1 className='pagenotfound__title'>
        404
      </h1>
      <p className='pagenotfound__subtitle'>
        Страница не найдена
      </p>
      <NavLink to="/" className='pagenotfound__link'>
        Назад
      </NavLink>
    </main>
  );
}; 